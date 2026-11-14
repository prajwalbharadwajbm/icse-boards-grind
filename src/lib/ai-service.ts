import { getAIConfig } from "./ai-provider-config";
import { apiFetch } from "./api-client";
import type { AIPurpose } from "./ai-policy";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * AI calls go through our server (/api/ai), which holds the API keys, applies daily limits
 * and charges credits. A student who added their own API key in Settings calls the
 * provider directly with that key instead, with no limits.
 * `apiKey` is that personal key, or "" to use the server.
 */

/** Streaming chat completion via server-sent events */
export async function sendChatCompletion(
  apiKey: string,
  messages: ChatMessage[],
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (error: string) => void,
  purpose: AIPurpose = "coach"
): Promise<void> {
  try {
    const response = apiKey
      ? await providerRequest(apiKey, messages, { stream: true, maxTokens: 2048 })
      : await apiFetch("/api/ai", { method: "POST", body: JSON.stringify({ purpose, messages }) });
    await readEventStream(response, onToken);
    onDone();
  } catch (err) {
    onError((err as Error).message);
  }
}

/** Non-streaming chat completion (daily briefing, grammar questions) */
export async function sendChatCompletionSync(
  apiKey: string,
  messages: ChatMessage[],
  purpose: AIPurpose = "briefing"
): Promise<string> {
  if (!apiKey) {
    const res = await apiFetch("/api/ai", { method: "POST", body: JSON.stringify({ purpose, messages }) });
    const data = (await res.json()) as { text?: string };
    return data.text || "";
  }
  const response = await providerRequest(apiKey, messages, { stream: false, maxTokens: 1024 });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

/** Direct call with the student's own key */
async function providerRequest(apiKey: string, messages: ChatMessage[], opts: { stream: boolean; maxTokens: number }): Promise<Response> {
  const config = getAIConfig(apiKey);
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: config.model, messages, stream: opts.stream, max_tokens: opts.maxTokens, temperature: 0.7 }),
  });
  if (!response.ok) {
    if (response.status === 401) throw new Error("Your API key was rejected. Check it in Settings");
    if (response.status === 429) throw new Error("Your API key hit its rate limit. Try again in a minute");
    throw new Error(`The AI provider returned an error (${response.status}). Try again`);
  }
  return response;
}

/** Read an OpenAI-style SSE stream and pass each content token on */
async function readEventStream(response: Response, onToken: (token: string) => void): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("The AI coach sent an empty reply. Try again");

  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      const data = trimmed.slice(6);
      if (data === "[DONE]") return;
      try {
        const content = JSON.parse(data).choices?.[0]?.delta?.content;
        if (content) onToken(content);
      } catch {
        // skip partial or non-JSON keep-alive lines
      }
    }
  }
}
