import { AI_LIMITS, isAIPurpose, type AIPurpose } from "@/lib/ai-policy";
import { ApiError } from "./errors";

export interface AIChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** Validate the body of POST /api/ai. Pure, so it is unit-tested */
export function validateAIRequest(body: unknown): { purpose: AIPurpose; messages: AIChatMessage[] } {
  if (!body || typeof body !== "object") throw new ApiError(400, "bad_request", "Missing request body");
  const { purpose, messages } = body as { purpose?: unknown; messages?: unknown };

  if (!isAIPurpose(purpose)) throw new ApiError(400, "bad_purpose", "Unknown AI feature");
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new ApiError(400, "bad_messages", "Send at least one message");
  }
  if (messages.length > AI_LIMITS.maxMessages) {
    throw new ApiError(400, "too_many_messages", "This conversation is too long. Start a new one");
  }

  let total = 0;
  const clean: AIChatMessage[] = messages.map((m, i) => {
    const { role, content } = (m || {}) as { role?: unknown; content?: unknown };
    if (role !== "system" && role !== "user" && role !== "assistant") {
      throw new ApiError(400, "bad_messages", "Each message needs a valid role");
    }
    if (role === "system" && i !== 0) {
      throw new ApiError(400, "bad_messages", "Only the first message can be a system prompt");
    }
    if (typeof content !== "string" || content.trim().length === 0) {
      throw new ApiError(400, "bad_messages", "Messages can't be empty");
    }
    if (content.length > AI_LIMITS.maxCharsPerMessage) {
      throw new ApiError(400, "message_too_long", "That message is too long. Shorten it and try again");
    }
    total += content.length;
    return { role, content };
  });

  if (total > AI_LIMITS.maxTotalChars) {
    throw new ApiError(400, "too_long", "This conversation is too long. Start a new one");
  }
  if (clean[clean.length - 1].role !== "user") {
    throw new ApiError(400, "bad_messages", "The last message must be from the student");
  }
  return { purpose, messages: clean };
}
