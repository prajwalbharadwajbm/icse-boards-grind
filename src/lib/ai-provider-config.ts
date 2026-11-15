/**
 * Which provider and model an API key belongs to: Groq keys start with gsk_, others go to xAI.
 *
 * Groq shut down llama-3.3-70b-versatile on 16 August 2026 (https://console.groq.com/docs/deprecations)
 * and recommends openai/gpt-oss-120b. That is a reasoning model, so it is asked to think briefly,
 * its reasoning is left out of the reply, and the token limit gets headroom for the thinking.
 */
export function getAIConfig(apiKey: string) {
  if (apiKey.startsWith("gsk_")) {
    return {
      url: "https://api.groq.com/openai/v1/chat/completions",
      model: "openai/gpt-oss-120b",
      reasoningTokens: 400,
    };
  }
  return { url: "https://api.x.ai/v1/chat/completions", model: "grok-3-mini", reasoningTokens: 0 };
}

/** The chat completion request for a key. Shared by the server and students' own keys so both stay in step */
export function chatCompletionRequest(
  apiKey: string,
  opts: { messages: unknown[]; stream: boolean; maxTokens: number }
): { url: string; body: string } {
  const config = getAIConfig(apiKey);
  const isGroq = apiKey.startsWith("gsk_");
  const body: Record<string, unknown> = {
    model: config.model,
    messages: opts.messages,
    stream: opts.stream,
    temperature: 0.7,
  };
  if (isGroq) {
    body.max_completion_tokens = opts.maxTokens + config.reasoningTokens;
    body.reasoning_effort = "low";
    body.include_reasoning = false;
  } else {
    body.max_tokens = opts.maxTokens;
  }
  return { url: config.url, body: JSON.stringify(body) };
}
