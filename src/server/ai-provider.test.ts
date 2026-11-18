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
