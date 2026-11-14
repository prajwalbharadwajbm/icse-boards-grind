import { FieldValue } from "firebase-admin/firestore";
import { AI_POLICY, type AIPurpose } from "@/lib/ai-policy";
import { adminDb } from "./firebase-admin";
import { ApiError } from "./errors";
import { nextUsage, type UsageCounter } from "./usage-window";

const usageDoc = (uid: string) => adminDb().collection("aiUsage").doc(uid);

/** Count one AI request against the student's limits, or refuse it with a clear message */
export async function consumeAIQuota(uid: string, purpose: AIPurpose, now = new Date()): Promise<{ remainingToday: number }> {
  const policy = AI_POLICY[purpose];
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(usageDoc(uid));
    const prev = snap.get(purpose) as UsageCounter | undefined;
    const decision = nextUsage(prev, now, policy);
    if (!decision.ok) {
      const message =
        decision.reason === "day"
          ? `You've used today's ${policy.perDay} ${policy.label}. They reset at midnight`
          : "That's a lot of requests in a minute. Wait a moment and try again";
      throw new ApiError(429, decision.reason === "day" ? "daily_limit" : "rate_limited", message, {
        retryAfterSeconds: decision.retryAfterSeconds,
      });
    }
    tx.set(usageDoc(uid), { [purpose]: decision.next, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return { remainingToday: decision.remainingToday };
  });
}

/** Give a request back when the AI provider failed, so failures don't use up the day */
export async function releaseAIQuota(uid: string, purpose: AIPurpose): Promise<void> {
  try {
    await usageDoc(uid).update({
      [`${purpose}.dayCount`]: FieldValue.increment(-1),
      [`${purpose}.minuteCount`]: FieldValue.increment(-1),
    });
  } catch (err) {
    console.error("[quota] release failed", err);
  }
}
