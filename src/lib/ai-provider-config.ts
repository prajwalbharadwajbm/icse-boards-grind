/** Which provider and model an API key belongs to: Groq keys start with gsk_, others go to xAI */
export function getAIConfig(apiKey: string) {
  if (apiKey.startsWith("gsk_")) {
    return { url: "https://api.groq.com/openai/v1/chat/completions", model: "llama-3.3-70b-versatile" };
  }
  return { url: "https://api.x.ai/v1/chat/completions", model: "grok-3-mini" };
}
