/**
 * One table for every AI feature: how often a student can use it and what it costs.
 * Enforced on the server (src/app/api/ai/route.ts); the client reads it to explain limits.
 * Daily limits reset at midnight India time.
 */
export type AIPurpose = "coach" | "briefing" | "grammar";

export interface AIPolicy {
  /** Plural noun used in limit messages, e.g. "coach messages" */
  label: string;
  perDay: number;
  perMinute: number;
  maxTokens: number;
  stream: boolean;
  /** Credits charged per request. 0 = free within the limits above */
  cost: number;
}

export const AI_POLICY: Record<AIPurpose, AIPolicy> = {
  coach: { label: "coach messages", perDay: 40, perMinute: 6, maxTokens: 1200, stream: true, cost: 0 },
  briefing: { label: "daily briefings", perDay: 3, perMinute: 2, maxTokens: 600, stream: false, cost: 0 },
  grammar: { label: "grammar questions", perDay: 100, perMinute: 12, maxTokens: 700, stream: false, cost: 0 },
};

export const AI_LIMITS = {
  /** A system prompt plus 40 turns of history */
  maxMessages: 41,
  maxCharsPerMessage: 12_000,
  maxTotalChars: 60_000,
};

export function isAIPurpose(value: unknown): value is AIPurpose {
  return typeof value === "string" && value in AI_POLICY;
}
