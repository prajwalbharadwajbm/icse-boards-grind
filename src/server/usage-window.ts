import type { AIPolicy } from "@/lib/ai-policy";

/** Per-feature usage counter stored in Firestore (aiUsage/{uid}.{purpose}) */
export interface UsageCounter {
  day: string;
  dayCount: number;
  minute: number;
  minuteCount: number;
}

/** Calendar day in India (Asia/Kolkata), e.g. "2026-11-14"; daily limits reset at IST midnight */
export function istDay(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export type UsageDecision =
  | { ok: true; next: UsageCounter; remainingToday: number }
  | { ok: false; reason: "day" | "minute"; retryAfterSeconds: number };

/** Decide whether one more request fits the policy. Pure, so it is unit-tested */
export function nextUsage(prev: UsageCounter | undefined, now: Date, policy: Pick<AIPolicy, "perDay" | "perMinute">): UsageDecision {
  const day = istDay(now);
  const minute = Math.floor(now.getTime() / 60_000);
  const dayCount = prev && prev.day === day ? prev.dayCount : 0;
  const minuteCount = prev && prev.minute === minute ? prev.minuteCount : 0;

  if (dayCount >= policy.perDay) {
    return { ok: false, reason: "day", retryAfterSeconds: secondsToIstMidnight(now) };
  }
  if (minuteCount >= policy.perMinute) {
    return { ok: false, reason: "minute", retryAfterSeconds: 60 - now.getUTCSeconds() };
  }
  return {
    ok: true,
    next: { day, dayCount: dayCount + 1, minute, minuteCount: minuteCount + 1 },
    remainingToday: policy.perDay - dayCount - 1,
  };
}

function secondsToIstMidnight(now: Date): number {
  const istOffsetMs = 330 * 60_000;
  const istNow = now.getTime() + istOffsetMs;
  const nextMidnight = Math.ceil(istNow / 86_400_000) * 86_400_000;
  return Math.max(1, Math.round((nextMidnight - istNow) / 1000));
}
