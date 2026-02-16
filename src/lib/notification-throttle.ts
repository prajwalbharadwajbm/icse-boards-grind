// Notification throttle utility using localStorage.
// Prevents spamming users with too many notifications.

export type ThrottleType =
  | "streak_milestone"
  | "chapter_complete"
  | "daily_goal"
  | "morning_kickoff"
  | "evening_nudge"
  | "streak_risk"
  | "exam_countdown";

// Cooldown durations in milliseconds
const COOLDOWNS: Record<ThrottleType, number> = {
  streak_milestone: 24 * 60 * 60 * 1000,
  chapter_complete: 30 * 60 * 1000,
  daily_goal: 24 * 60 * 60 * 1000,
  morning_kickoff: 24 * 60 * 60 * 1000,
  evening_nudge: 24 * 60 * 60 * 1000,
  streak_risk: 24 * 60 * 60 * 1000,
  exam_countdown: 12 * 60 * 60 * 1000,
};

const STORAGE_KEY = "notif-throttle";
const DAILY_COUNT_KEY = "notif-daily-count";
const GLOBAL_DAILY_CAP = 8;

interface ThrottleData {
  [type: string]: number; // timestamp of last sent
}

interface DailyCount {
  date: string;
  count: number;
}

function getThrottleData(): ThrottleData {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setThrottleData(data: ThrottleData): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDailyCount(): DailyCount {
  if (typeof localStorage === "undefined") return { date: "", count: 0 };
  try {
    const raw = localStorage.getItem(DAILY_COUNT_KEY);
    if (!raw) return { date: "", count: 0 };
    return JSON.parse(raw);
  } catch {
    return { date: "", count: 0 };
  }
}

function setDailyCount(dc: DailyCount): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(DAILY_COUNT_KEY, JSON.stringify(dc));
}

/**
 * Check if a notification of the given type can be sent.
 * Returns true if allowed (not throttled and under daily cap).
 */
export function canSendNotification(type: ThrottleType): boolean {
  const now = Date.now();
  const data = getThrottleData();
  const lastSent = data[type];

  // Check per-type cooldown
  if (lastSent) {
    const cooldown = COOLDOWNS[type];
    if (now - lastSent < cooldown) return false;
  }

  // Check global daily cap
  const today = new Date().toISOString().split("T")[0];
  const dc = getDailyCount();
  if (dc.date === today && dc.count >= GLOBAL_DAILY_CAP) return false;

  return true;
}

/**
 * Record that a notification of the given type was sent.
 * Call this AFTER actually sending the notification.
 */
export function recordNotificationSent(type: ThrottleType): void {
  const now = Date.now();

  // Update per-type timestamp
  const data = getThrottleData();
  data[type] = now;
  setThrottleData(data);

  // Update daily count
  const today = new Date().toISOString().split("T")[0];
  const dc = getDailyCount();
  if (dc.date === today) {
    dc.count += 1;
  } else {
    dc.date = today;
    dc.count = 1;
  }
  setDailyCount(dc);
}

/**
 * Convenience: check + record in one call. Returns true if notification was allowed.
 */
export function throttle(type: ThrottleType): boolean {
  if (!canSendNotification(type)) return false;
  recordNotificationSent(type);
  return true;
}
