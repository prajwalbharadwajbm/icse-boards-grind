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
      // Groq's free tier allows 8,000 tokens a minute (prompt + max_completion_tokens) for this model,
      // and refuses any single request over that with a 413. Stay well under it.
      tokenBudget: 6000 as number | null,
    };
  }
  return { url: "https://api.x.ai/v1/chat/completions", model: "grok-3-mini", reasoningTokens: 0, tokenBudget: null as number | null };
}

export interface ChatTurn {
  role: string;
  content: string;
}

/** A token count on the high side: about 3.5 characters per token for English, one per character for other scripts */
function estimateTokens(text: string): number {
  let ascii = 0;
  let other = 0;
  for (const ch of text) {
    if (ch.charCodeAt(0) < 128) ascii++;
    else other++;
  }
  return Math.ceil(ascii / 3.5) + other + 4;
}

const sumTokens = (messages: ChatTurn[]) => messages.reduce((n, m) => n + estimateTokens(m.content), 0);

/**
 * Drop the oldest turns until the prompt fits the budget. The system prompt and the newest message
 * always stay, and the kept history starts on a student turn.
 */
function fitToTokenBudget(messages: ChatTurn[], promptBudget: number): ChatTurn[] {
  if (sumTokens(messages) <= promptBudget || messages.length <= 2) return messages;

  const head = messages[0].role === "system" ? [messages[0]] : [];
  const rest = messages.slice(head.length);
  const kept = [rest[rest.length - 1]];
  let used = sumTokens([...head, ...kept]);
  for (let i = rest.length - 2; i >= 0; i--) {
    const cost = estimateTokens(rest[i].content);
    if (used + cost > promptBudget) break;
    used += cost;
    kept.unshift(rest[i]);
  }
  while (kept.length > 1 && kept[0].role === "assistant") kept.shift();
  return [...head, ...kept];
}

/** Only the system prompt and the newest message */
function shortestChat(messages: ChatTurn[]): ChatTurn[] {
  const head = messages[0]?.role === "system" ? [messages[0]] : [];
  return messages.length <= head.length + 1 ? messages : [...head, messages[messages.length - 1]];
}

/**
 * The chat completion request for a key. Shared by the server and students' own keys so both stay in step.
 * Providers with a token budget (Groq) get the oldest turns trimmed to fit; `shortest` sends only the
 * system prompt and the newest message, for a retry after the provider said the request was too large.
 */
export function chatCompletionRequest(
  apiKey: string,
  opts: { messages: ChatTurn[]; stream: boolean; maxTokens: number; shortest?: boolean }
): { url: string; body: string } {
  const config = getAIConfig(apiKey);
  const isGroq = apiKey.startsWith("gsk_");
  const completionTokens = opts.maxTokens + config.reasoningTokens;
  const messages =
    config.tokenBudget === null
      ? opts.messages
      : opts.shortest
        ? shortestChat(opts.messages)
        : fitToTokenBudget(opts.messages, config.tokenBudget - completionTokens);
  const body: Record<string, unknown> = {
    model: config.model,
    messages,
    stream: opts.stream,
    temperature: 0.7,
  };
  if (isGroq) {
    body.max_completion_tokens = completionTokens;
    body.reasoning_effort = "low";
    body.include_reasoning = false;
  } else {
    body.max_tokens = opts.maxTokens;
  }
  return { url: config.url, body: JSON.stringify(body) };
}
