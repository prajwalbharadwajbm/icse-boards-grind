import { chatCompletionRequest, getAIConfig } from "@/lib/ai-provider-config";
import { ApiError } from "./errors";
import type { AIChatMessage } from "./ai-request";

const keyList = (value: string | undefined) => (value || "").split(",").map((k) => k.trim()).filter(Boolean);

/**
 * Server-held AI keys (never NEXT_PUBLIC_*), comma-separated, in two lists:
 * - AI_API_KEYS, the main keys, shuffled so load spreads across them.
 * - AI_FALLBACK_API_KEYS, tried in order only after the main keys gave up (Gemini).
 * The provider comes from the key's prefix (see providerOf).
 */
function serverKeys(): { main: string[]; fallback: string[] } {
  const main = keyList(process.env.AI_API_KEYS);
  const fallback = keyList(process.env.AI_FALLBACK_API_KEYS);
  if (main.length + fallback.length === 0) {
    console.error("[ai] AI_API_KEYS is not set");
    throw new ApiError(503, "ai_not_configured", "The AI coach isn't available right now. Try again later");
  }
  const shuffled = main.map((k) => [Math.random(), k] as const).sort((a, b) => a[0] - b[0]).map(([, k]) => k);
  return { main: shuffled, fallback };
}

type CallOptions = { messages: AIChatMessage[]; maxTokens: number; stream: boolean; signal?: AbortSignal };

/** A key that hasn't started answering by then is given up on, so a hung Groq leaves the fallback time */
const FIRST_BYTE_MS = 20_000;
/** Everything, streaming included, must finish inside the function's 60-second limit (route.ts maxDuration) */
const TOTAL_MS = 55_000;

/** POST to a provider. The first-byte timer stops once the reply starts, so a long stream isn't cut */
async function post(url: string, key: string, body: string, deadline: number, signal?: AbortSignal): Promise<Response> {
  const firstByte = new AbortController();
  const timer = setTimeout(() => firstByte.abort(new Error(`no response within ${FIRST_BYTE_MS / 1000}s`)), FIRST_BYTE_MS);
  const signals = [firstByte.signal, AbortSignal.timeout(Math.max(1, deadline - Date.now()))];
  if (signal) signals.push(signal);
  try {
    return await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body,
      signal: AbortSignal.any(signals),
    });
  } finally {
    clearTimeout(timer);
  }
}

/** What the keys tried so far ran into, for the error the student sees if nothing answers */
interface Outcome {
  tooLong: boolean;
  /** A provider said it was rate limited (429): the student is told to wait a minute */
  busy: boolean;
}

/**
 * Try one list of keys. On a rate limit, an outage, a network error or a key the provider rejects
 * (401/403) it moves to the next key. A request the provider refuses (other 4xx) or can't fit even
 * shortened ends the list, as another key of the same list won't help; the fallback list may still.
 */
async function tryKeys(keys: string[], opts: CallOptions, deadline: number, outcome: Outcome): Promise<Response | null> {
  for (const key of keys) {
    // Groq trims chats to fit its budget. If it still says 413 the size estimate was too low:
    // resend once with only the system prompt and the newest message (unless that was already the request)
    const full = chatCompletionRequest(key, opts);
    const shortest = getAIConfig(key).tokenBudget === null ? null : chatCompletionRequest(key, { ...opts, shortest: true });
    const attempts = shortest && shortest.body !== full.body ? [full, shortest] : [full];

    for (let a = 0; a < attempts.length; a++) {
      const { url, body: requestBody } = attempts[a];
      let res: Response;
      try {
        res = await post(url, key, requestBody, deadline, opts.signal);
      } catch (err) {
        if (opts.signal?.aborted) throw new ApiError(499, "cancelled", "Request cancelled");
        console.error("[ai] provider request failed", err);
        break; // next key
      }
      if (res.ok) return res;

      const body = await res.text().catch(() => "");
      const detail = `[ai] provider ${new URL(url).host} returned ${res.status}: ${body.slice(0, 300)}`;
      if (res.status === 413 && a < attempts.length - 1) {
        // A warning, not an error: the shorter retry usually succeeds
        console.warn(`${detail} (retrying with a shorter chat)`);
        continue;
      }
      console.error(detail);
      if (res.status === 413 && shortest) {
        outcome.tooLong = true; // even the system prompt and the newest message don't fit
        return null;
      }
      if (res.status === 429) outcome.busy = true;
      const keyProblem = res.status === 401 || res.status === 403;
      if (!keyProblem && res.status !== 429 && res.status < 500) return null; // a request problem
      break; // next key
    }
  }
  return null;
}

/**
 * Call the AI provider with the server's keys: the main list first, then the fallback list. A chat
 * too long for Groq goes whole to the fallback, whose context is far bigger.
 */
export async function callAIProvider(opts: CallOptions): Promise<Response> {
  const { main, fallback } = serverKeys();
  const outcome: Outcome = { tooLong: false, busy: false };
  const deadline = Date.now() + TOTAL_MS;
  for (const keys of [main, fallback]) {
    const res = await tryKeys(keys, opts, deadline, outcome);
    if (res) return res;
  }
  if (outcome.tooLong) {
    throw new ApiError(400, "message_too_long", "That message is too long for the AI coach. Shorten it and try again");
  }
  throw new ApiError(
    503,
    "ai_unavailable",
    outcome.busy ? "The AI coach is busy right now. Try again in a minute" : "The AI coach couldn't answer just now. Try again"
  );
}
