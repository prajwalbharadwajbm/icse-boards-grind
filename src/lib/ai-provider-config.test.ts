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
