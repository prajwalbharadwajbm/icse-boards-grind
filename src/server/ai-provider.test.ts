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
    process.env.AI_API_KEYS = "gsk_test";
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

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
});
