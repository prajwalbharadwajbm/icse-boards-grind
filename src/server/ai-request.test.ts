import { describe, expect, it } from "vitest";
import { validateAIRequest } from "./ai-request";
import { ApiError } from "./errors";
import { AI_LIMITS } from "@/lib/ai-policy";

/** The ApiError code a call throws, or null if it doesn't throw */
function errorCode(fn: () => unknown): string | null {
  try {
    fn();
    return null;
  } catch (err) {
    expect(err).toBeInstanceOf(ApiError);
    return (err as ApiError).code;
  }
}

const user = (content = "Explain refraction") => ({ role: "user", content });

describe("validateAIRequest", () => {
  it("accepts a coach chat and keeps only role and content", () => {
    const result = validateAIRequest({
      purpose: "coach",
      messages: [
        { role: "system", content: "You are a study coach", extra: 1 },
        { role: "assistant", content: "Hi" },
        user(),
      ],
    });
    expect(result.purpose).toBe("coach");
    expect(result.messages).toEqual([
      { role: "system", content: "You are a study coach" },
      { role: "assistant", content: "Hi" },
      { role: "user", content: "Explain refraction" },
    ]);
  });

  it("rejects a missing or non-object body", () => {
    expect(errorCode(() => validateAIRequest(null))).toBe("bad_request");
    expect(errorCode(() => validateAIRequest("hello"))).toBe("bad_request");
  });

  it("rejects an unknown purpose", () => {
    expect(errorCode(() => validateAIRequest({ purpose: "essay", messages: [user()] }))).toBe("bad_purpose");
    expect(errorCode(() => validateAIRequest({ messages: [user()] }))).toBe("bad_purpose");
  });

  it("needs at least one message and no more than the limit", () => {
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: [] }))).toBe("bad_messages");
    const tooMany = Array.from({ length: AI_LIMITS.maxMessages + 1 }, () => user("hi"));
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: tooMany }))).toBe("too_many_messages");
  });

  it("allows a system prompt only as the first message", () => {
    expect(
      errorCode(() => validateAIRequest({ purpose: "coach", messages: [user(), { role: "system", content: "x" }, user()] }))
    ).toBe("bad_messages");
  });

  it("rejects bad roles and empty content", () => {
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: [{ role: "tool", content: "x" }] }))).toBe("bad_messages");
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: [{ role: "user", content: "   " }] }))).toBe("bad_messages");
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: [{ role: "user", content: 42 }] }))).toBe("bad_messages");
  });

  it("caps one message and the whole conversation", () => {
    const long = "a".repeat(AI_LIMITS.maxCharsPerMessage + 1);
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: [user(long)] }))).toBe("message_too_long");

    const chunk = "a".repeat(AI_LIMITS.maxCharsPerMessage);
    const count = Math.ceil(AI_LIMITS.maxTotalChars / AI_LIMITS.maxCharsPerMessage) + 1;
    const big = Array.from({ length: count }, () => user(chunk));
    expect(errorCode(() => validateAIRequest({ purpose: "coach", messages: big }))).toBe("too_long");
  });

  it("requires the last message to be the student's", () => {
    expect(
      errorCode(() => validateAIRequest({ purpose: "briefing", messages: [user(), { role: "assistant", content: "ok" }] }))
    ).toBe("bad_messages");
  });

  it("returns 400 for every validation failure", () => {
    try {
      validateAIRequest({ purpose: "coach", messages: [] });
    } catch (err) {
      expect((err as ApiError).status).toBe(400);
    }
  });
});
