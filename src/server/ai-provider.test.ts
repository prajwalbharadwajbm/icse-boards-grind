import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { callAIProvider } from "./ai-provider";
import type { AIChatMessage } from "./ai-request";

const system: AIChatMessage = { role: "system", content: "You are an AI Study Coach." };
const history: AIChatMessage[] = [
  system,
  { role: "user", content: "Plan my Physics week" },
  { role: "assistant", content: "Here is a plan for Light and Sound." },
  { role: "user", content: "Now explain refraction" },
];

const tooLarge = () =>
  new Response(JSON.stringify({ error: { message: "Request too large for model on tokens per minute (TPM): Limit 8000, Requested 8099" } }), { status: 413 });
const ok = () => new Response(JSON.stringify({ choices: [{ message: { content: "Refraction is..." } }] }), { status: 200 });

describe("callAIProvider", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("AI_API_KEYS", "gsk_test");
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    fetchMock.mockReset();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  /** Keys are shuffled before use; pin the order to the order listed */
  const keysInOrder = (keys: string) => {
    vi.stubEnv("AI_API_KEYS", keys);
    let n = 0;
    vi.spyOn(Math, "random").mockImplementation(() => n++);
  };
  const sentMessages = (call: number) => JSON.parse(fetchMock.mock.calls[call][1].body as string).messages;

  it("retries a request Groq calls too large with only the system prompt and the newest message", async () => {
    fetchMock.mockResolvedValueOnce(tooLarge()).mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const retried = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(retried.messages).toEqual([system, history[history.length - 1]]);
  });

  it("does not retry other request errors", async () => {
    fetchMock.mockResolvedValueOnce(new Response("bad request", { status: 400 }));

    await expect(callAIProvider({ messages: history, maxTokens: 1200, stream: false })).rejects.toMatchObject({ status: 503 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sends the next key, an xAI key, the whole chat after a Groq 413 and a busy retry", async () => {
    keysInOrder("gsk_test,xai-test");
    fetchMock
      .mockResolvedValueOnce(tooLarge())
      .mockResolvedValueOnce(new Response("rate limited", { status: 429 }))
      .mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect(fetchMock.mock.calls[2][0]).toBe("https://api.x.ai/v1/chat/completions");
    expect(sentMessages(2)).toEqual(history);
  });

  it("does not shorten an xAI chat when xAI says it is too large", async () => {
    keysInOrder("xai-test");
    fetchMock.mockResolvedValueOnce(tooLarge());

    await expect(callAIProvider({ messages: history, maxTokens: 1200, stream: false })).rejects.toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
  const urlOf = (call: number) => fetchMock.mock.calls[call][0];

  it("tries the fallback keys only after every main key has failed", async () => {
    keysInOrder("gsk_a,gsk_b");
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    fetchMock
      .mockResolvedValueOnce(new Response("down", { status: 503 }))
      .mockResolvedValueOnce(new Response("down", { status: 503 }))
      .mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect([urlOf(0), urlOf(1)]).toEqual([
      "https://api.groq.com/openai/v1/chat/completions",
      "https://api.groq.com/openai/v1/chat/completions",
    ]);
    expect(urlOf(2)).toBe(GEMINI_URL);
  });

  it("goes straight to the fallback when Groq refuses the request itself, as when its model was retired", async () => {
    keysInOrder("gsk_a,gsk_b");
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    fetchMock
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: { code: "model_not_found" } }), { status: 404 }))
      .mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(urlOf(1)).toBe(GEMINI_URL);
  });

  it("sends a chat too long for Groq to the fallback whole, before telling the student it is too long", async () => {
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    const huge: AIChatMessage[] = [system, { role: "user", content: "ಬೆಳಕಿನ ವಕ್ರೀಭವನ ".repeat(700) }];
    fetchMock.mockResolvedValueOnce(tooLarge()).mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: huge, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect(urlOf(1)).toBe(GEMINI_URL);
    expect(sentMessages(1)).toEqual(huge);
  });

  it("moves past a revoked key to the next main key before ever using the fallback", async () => {
    keysInOrder("gsk_revoked,gsk_good");
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    fetchMock.mockResolvedValueOnce(new Response("invalid api key", { status: 401 })).mockResolvedValueOnce(ok());

    const res = await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(res.status).toBe(200);
    expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe("Bearer gsk_good");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("without fallback keys, still stops at a request Groq refuses instead of trying another main provider", async () => {
    keysInOrder("gsk_test,xai-test");
    fetchMock.mockResolvedValueOnce(new Response("bad request", { status: 400 }));

    await expect(callAIProvider({ messages: history, maxTokens: 1200, stream: false })).rejects.toMatchObject({ status: 503 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("tells the student the coach is busy when Groq was rate limited, even if the fallback then fails", async () => {
    const busy = { status: 503, message: "The AI coach is busy right now. Try again in a minute" };
    fetchMock.mockResolvedValueOnce(new Response("rate limited", { status: 429 }));
    await expect(callAIProvider({ messages: history, maxTokens: 1200, stream: false })).rejects.toMatchObject(busy);

    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    fetchMock
      .mockResolvedValueOnce(new Response("rate limited", { status: 429 }))
      .mockResolvedValueOnce(new Response("down", { status: 503 }));
    await expect(callAIProvider({ messages: history, maxTokens: 1200, stream: false })).rejects.toMatchObject(busy);
  });

  it("moves on from a key that hasn't started answering in 20 seconds, leaving the fallback time to reply", async () => {
    vi.useFakeTimers();
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    const hangs = (_url: string, init: RequestInit) =>
      new Promise<Response>((_, reject) => init.signal?.addEventListener("abort", () => reject(init.signal?.reason)));
    fetchMock.mockImplementationOnce(hangs).mockResolvedValueOnce(ok());

    const pending = callAIProvider({ messages: history, maxTokens: 1200, stream: false });
    await vi.advanceTimersByTimeAsync(20_000);

    expect((await pending).status).toBe(200);
    expect(urlOf(1)).toBe(GEMINI_URL);
  });

  it("does not touch the fallback when Groq answers", async () => {
    vi.stubEnv("AI_FALLBACK_API_KEYS", "AIzaFallback");
    fetchMock.mockResolvedValueOnce(ok());

    await callAIProvider({ messages: history, maxTokens: 1200, stream: false });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(urlOf(0)).toBe("https://api.groq.com/openai/v1/chat/completions");
  });

  it("tells the student their message is too long when even the shortest request is too large", async () => {
    const huge: AIChatMessage[] = [system, { role: "user", content: "ಬೆಳಕಿನ ವಕ್ರೀಭವನ ".repeat(700) }];
    fetchMock.mockResolvedValue(tooLarge());

    await expect(callAIProvider({ messages: huge, maxTokens: 1200, stream: false })).rejects.toMatchObject({
      status: 400,
      code: "message_too_long",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
