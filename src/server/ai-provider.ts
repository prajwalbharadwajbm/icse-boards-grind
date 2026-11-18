import { chatCompletionRequest, getAIConfig } from "@/lib/ai-provider-config";
import { ApiError } from "./errors";
import type { AIChatMessage } from "./ai-request";

/**
 * Server-held AI keys, comma-separated in AI_API_KEYS (never NEXT_PUBLIC_*).
 * Keys starting with gsk_ go to Groq, others to xAI. callAIProvider tries the next key on rate limits
 * and outages, and resends a Groq request it was told is too large (413) once, shortened.
 */
function serverKeys(): string[] {
  const keys = (process.env.AI_API_KEYS || "").split(",").map((k) => k.trim()).filter(Boolean);
  if (keys.length === 0) {
    console.error("[ai] AI_API_KEYS is not set");
    throw new ApiError(503, "ai_not_configured", "The AI coach isn't available right now. Try again later");
  }
  // Shuffle so load spreads across keys
  return keys.map((k) => [Math.random(), k] as const).sort((a, b) => a[0] - b[0]).map(([, k]) => k);
}

export async function callAIProvider(opts: {
  messages: AIChatMessage[];
  maxTokens: number;
  stream: boolean;
  signal?: AbortSignal;
}): Promise<Response> {
  let lastStatus = 0;
  let tooLong = false;
  keys: for (const key of serverKeys()) {
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
          tooLong = true; // even the system prompt and the newest message don't fit
          break keys;
        }
        if (res.status !== 429 && res.status < 500) break keys; // a request problem, another key won't help
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
