import { chatCompletionRequest, getAIConfig, providerOf, type AIProvider } from "@/lib/ai-provider-config";
import { ApiError } from "./errors";
import type { AIChatMessage } from "./ai-request";

const keyList = (value: string | undefined) => (value || "").split(",").map((k) => k.trim()).filter(Boolean);

/**
 * Server-held AI keys (never NEXT_PUBLIC_*), comma-separated:
 * - AI_API_KEYS, the main keys, shuffled so load spreads across them.
 * - AI_FALLBACK_API_KEYS, tried in order only after every main key failed (a Gemini key).
 * The provider comes from the key's prefix (see providerOf). callAIProvider tries the next key on rate
 * limits and outages, and resends a Groq request it was told is too large (413) once, shortened.
 */
function serverKeys(): string[] {
  const main = keyList(process.env.AI_API_KEYS);
  const fallback = keyList(process.env.AI_FALLBACK_API_KEYS);
  if (main.length + fallback.length === 0) {
    console.error("[ai] AI_API_KEYS is not set");
    throw new ApiError(503, "ai_not_configured", "The AI coach isn't available right now. Try again later");
  }
  const shuffled = main.map((k) => [Math.random(), k] as const).sort((a, b) => a[0] - b[0]).map(([, k]) => k);
  return [...shuffled, ...fallback];
}

export async function callAIProvider(opts: {
  messages: AIChatMessage[];
  maxTokens: number;
  stream: boolean;
  signal?: AbortSignal;
}): Promise<Response> {
  let lastStatus = 0;
  let tooLong = false;
  // Providers that refused the request itself: their other keys would too, but another provider may not
  const refused = new Set<AIProvider>();
  keys: for (const key of serverKeys()) {
    const provider = providerOf(key);
    if (refused.has(provider)) continue;
    // Groq trims chats to fit its budget. If it still says 413 the size estimate was too low:
    // resend once with only the system prompt and the newest message (unless that was already the request)
    const full = chatCompletionRequest(key, opts);
    const shortest = getAIConfig(key).tokenBudget === null ? null : chatCompletionRequest(key, { ...opts, shortest: true });
    const attempts = shortest && shortest.body !== full.body ? [full, shortest] : [full];

    for (let a = 0; a < attempts.length; a++) {
      const { url, body: requestBody } = attempts[a];
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: requestBody,
          signal: opts.signal ? AbortSignal.any([opts.signal, AbortSignal.timeout(55_000)]) : AbortSignal.timeout(55_000),
        });
        if (res.ok) return res;
        lastStatus = res.status;
        const body = await res.text().catch(() => "");
        const detail = `[ai] provider ${new URL(url).host} returned ${res.status}: ${body.slice(0, 300)}`;
        if (res.status === 413 && a < attempts.length - 1) {
          // A warning, not an error: the shorter retry usually succeeds
          console.warn(`${detail} (retrying with a shorter chat)`);
          continue;
        }
        console.error(detail);
        if (res.status === 413 && shortest) {
          // Even the system prompt and the newest message don't fit this provider. A provider with a
          // bigger context (the Gemini fallback) may still answer; if none does, the student is told
          tooLong = true;
          refused.add(provider);
          continue keys;
        }
        if (res.status !== 429 && res.status < 500) refused.add(provider); // a request problem, not a busy key
        continue keys;
      } catch (err) {
        if (opts.signal?.aborted) throw new ApiError(499, "cancelled", "Request cancelled");
        console.error("[ai] provider request failed", err);
        continue keys;
      }
    }
  }
  if (tooLong) {
    throw new ApiError(400, "message_too_long", "That message is too long for the AI coach. Shorten it and try again");
  }
  throw new ApiError(
    503,
    "ai_unavailable",
    lastStatus === 429 ? "The AI coach is busy right now. Try again in a minute" : "The AI coach couldn't answer just now. Try again"
  );
}
