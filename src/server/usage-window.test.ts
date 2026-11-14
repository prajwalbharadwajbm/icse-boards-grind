import { describe, expect, it } from "vitest";
import { istDay, nextUsage, type UsageCounter } from "./usage-window";

const policy = { perDay: 3, perMinute: 2 };
const at = (iso: string) => new Date(iso);

describe("istDay", () => {
  it("uses the calendar day in India, which starts at 18:30 UTC", () => {
    expect(istDay(at("2026-11-14T18:29:59Z"))).toBe("2026-11-14"); // 23:59:59 IST
    expect(istDay(at("2026-11-14T18:30:00Z"))).toBe("2026-11-15"); // 00:00:00 IST
    expect(istDay(at("2026-11-14T00:00:00Z"))).toBe("2026-11-14"); // 05:30 IST
  });
});

describe("nextUsage", () => {
  it("allows the first request of the day", () => {
    const now = at("2026-11-14T06:00:10Z");
    const decision = nextUsage(undefined, now, policy);
    expect(decision).toEqual({
      ok: true,
      next: { day: "2026-11-14", dayCount: 1, minute: Math.floor(now.getTime() / 60_000), minuteCount: 1 },
      remainingToday: 2,
    });
  });

  it("blocks once the per-minute limit is reached, until the next minute", () => {
    const now = at("2026-11-14T06:00:15Z");
    const minute = Math.floor(now.getTime() / 60_000);
    const prev: UsageCounter = { day: "2026-11-14", dayCount: 2, minute, minuteCount: 2 };

    const blocked = nextUsage(prev, now, { perDay: 10, perMinute: 2 });
    expect(blocked).toEqual({ ok: false, reason: "minute", retryAfterSeconds: 45 });

    const nextMinute = nextUsage(prev, at("2026-11-14T06:01:00Z"), { perDay: 10, perMinute: 2 });
    expect(nextMinute.ok).toBe(true);
    if (nextMinute.ok) expect(nextMinute.next.minuteCount).toBe(1);
  });

  it("blocks once the daily limit is reached and says how long until midnight in India", () => {
    const now = at("2026-11-14T18:00:00Z"); // 23:30 IST
    const prev: UsageCounter = { day: "2026-11-14", dayCount: 3, minute: 0, minuteCount: 0 };
    expect(nextUsage(prev, now, policy)).toEqual({ ok: false, reason: "day", retryAfterSeconds: 30 * 60 });
  });

  it("checks the daily limit before the per-minute one", () => {
    const now = at("2026-11-14T10:00:00Z");
    const minute = Math.floor(now.getTime() / 60_000);
    const prev: UsageCounter = { day: "2026-11-14", dayCount: 3, minute, minuteCount: 2 };
    const decision = nextUsage(prev, now, policy);
    expect(decision.ok).toBe(false);
    if (!decision.ok) expect(decision.reason).toBe("day");
  });

  it("resets the daily count at midnight India time, not UTC midnight", () => {
    const prev: UsageCounter = { day: "2026-11-14", dayCount: 3, minute: 0, minuteCount: 0 };

    // 23:59 IST on the 14th: still the same day, still blocked
    expect(nextUsage(prev, at("2026-11-14T18:29:00Z"), policy).ok).toBe(false);

    // 00:00 IST on the 15th: a new day
    const fresh = nextUsage(prev, at("2026-11-14T18:30:00Z"), policy);
    expect(fresh.ok).toBe(true);
    if (fresh.ok) {
      expect(fresh.next.day).toBe("2026-11-15");
      expect(fresh.next.dayCount).toBe(1);
      expect(fresh.remainingToday).toBe(2);
    }
  });

  it("counts the last allowed request and reports zero left", () => {
    const now = at("2026-11-14T10:00:00Z");
    const prev: UsageCounter = { day: "2026-11-14", dayCount: 2, minute: 0, minuteCount: 0 };
    const decision = nextUsage(prev, now, policy);
    expect(decision.ok).toBe(true);
    if (decision.ok) {
      expect(decision.next.dayCount).toBe(3);
      expect(decision.remainingToday).toBe(0);
    }
  });
});
