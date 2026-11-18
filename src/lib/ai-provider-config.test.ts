import { describe, expect, it } from "vitest";
import { chatCompletionRequest, getAIConfig } from "./ai-provider-config";

const messages = [{ role: "user", content: "Explain refraction" }];

describe("getAIConfig", () => {
  it("sends Groq keys to a live Groq model, not the retired Llama 3.3 70B", () => {
    const config = getAIConfig("gsk_test");
    expect(config.url).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(config.model).toBe("openai/gpt-oss-120b");
    expect(config.model).not.toBe("llama-3.3-70b-versatile");
  });

  it("sends other keys to xAI", () => {
    expect(getAIConfig("xai-test").url).toBe("https://api.x.ai/v1/chat/completions");
  });
});

describe("chatCompletionRequest", () => {
  it("asks Groq's reasoning model to think briefly, hides the reasoning and leaves room for it", () => {
    const { url, body } = chatCompletionRequest("gsk_test", { messages, stream: true, maxTokens: 600 });
    const parsed = JSON.parse(body);
    expect(url).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(parsed).toMatchObject({
      model: "openai/gpt-oss-120b",
      messages,
      stream: true,
      reasoning_effort: "low",
      include_reasoning: false,
    });
    expect(parsed.max_completion_tokens).toBeGreaterThan(600);
    expect(parsed).not.toHaveProperty("max_tokens");
  });

  it("keeps the plain token limit for xAI", () => {
    const parsed = JSON.parse(chatCompletionRequest("xai-test", { messages, stream: false, maxTokens: 600 }).body);
    expect(parsed).toMatchObject({ model: "grok-3-mini", max_tokens: 600, stream: false });
    expect(parsed).not.toHaveProperty("reasoning_effort");
  });
});

/** Groq's free (on_demand) tier allows 8,000 tokens per minute for gpt-oss-120b: prompt + max_completion_tokens */
const GROQ_FREE_TIER_TOKENS = 8000;

type Msg = { role: string; content: string };
const chat = (turns: number, text: (i: number) => string): Msg[] => [
  { role: "system", content: "You are an AI Study Coach. ".repeat(40) },
  ...Array.from({ length: turns }, (_, i) => ({ role: i % 2 === 0 ? "user" : "assistant", content: text(i) })),
];
const groqBody = (msgs: Msg[], maxTokens = 1200) =>
  JSON.parse(chatCompletionRequest("gsk_test", { messages: msgs, stream: true, maxTokens }).body) as {
    messages: Msg[];
    max_completion_tokens: number;
  };

describe("chatCompletionRequest on a long coach chat", () => {
  // 41 messages of ~2,000 characters each: far over Groq's free-tier cap if sent whole
  const long = chat(41, (i) => `Turn ${i}: ` + "Explain the laws of refraction with an example. ".repeat(40));

  it("keeps a Groq request under the free-tier cap even at a pessimistic 3 characters per token", () => {
    const body = groqBody(long);
    const chars = body.messages.reduce((n, m) => n + m.content.length, 0);
    expect(chars / 3 + body.max_completion_tokens).toBeLessThan(GROQ_FREE_TIER_TOKENS);
  });

  it("keeps the system prompt and the newest turns, dropping the oldest first", () => {
    const sent = groqBody(long).messages;
    expect(sent[0]).toEqual(long[0]);
    expect(sent.length).toBeLessThan(long.length);
    expect(sent.slice(1)).toEqual(long.slice(long.length - (sent.length - 1)));
    expect(sent[sent.length - 1]).toEqual(long[long.length - 1]);
  });

  it("counts Kannada or Hindi script as about a token per character", () => {
    const kannada = chat(21, () => "ಬೆಳಕಿನ ವಕ್ರೀಭವನದ ನಿಯಮಗಳನ್ನು ಉದಾಹರಣೆಯೊಂದಿಗೆ ವಿವರಿಸಿ. ".repeat(20));
    const body = groqBody(kannada);
    const nonAscii = body.messages.reduce((n, m) => n + [...m.content].filter((c) => c.charCodeAt(0) > 127).length, 0);
    expect(nonAscii + body.max_completion_tokens).toBeLessThan(GROQ_FREE_TIER_TOKENS);
    expect(body.messages[body.messages.length - 1]).toEqual(kannada[kannada.length - 1]);
  });

  it("keeps a chat full of dates, marks and formulas under the cap, at a token per 1.5 symbols and per 3 letters", () => {
    const timetable = chat(41, (i) => `Turn ${i}: ` + "15-02-2027 09:45 Eng 80/80; 18-02 Lit 76%; v=u+at, s=ut+½at², 3×10⁸ m/s. ".repeat(25));
    const body = groqBody(timetable);
    const pessimistic = body.messages.reduce((n, m) => {
      const letters = (m.content.match(/[A-Za-z\s]/g) || []).length;
      return n + letters / 3 + (m.content.length - letters) / 1.5;
    }, 0);
    expect(pessimistic + body.max_completion_tokens).toBeLessThan(GROQ_FREE_TIER_TOKENS);
  });

  it("sends a short chat unchanged", () => {
    const short = chat(5, (i) => `Question ${i} about Light`);
    expect(groqBody(short).messages).toEqual(short);
  });

  it("leaves xAI requests untrimmed", () => {
    const parsed = JSON.parse(chatCompletionRequest("xai-test", { messages: long, stream: true, maxTokens: 1200 }).body);
    expect(parsed.messages).toEqual(long);
  });
});
