import type { SchoolHours } from "@/store/use-store";

/** What new students start with: Mon–Fri, 8:00 to 2:30 */
export const DEFAULT_SCHOOL_HOURS: SchoolHours = { start: "08:00", end: "14:30", days: [1, 2, 3, 4, 5] };

export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const minutes = (hhmm: string) => {
  const [h, m] = (hhmm || "").split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : NaN;
};

/** School hours the planner can use: at least one day, and home-by after the start */
export function usableSchoolHours(school: SchoolHours | null | undefined): { start: number; end: number; days: number[] } | null {
  if (!school || school.days.length === 0) return null;
  const start = minutes(school.start);
  const end = minutes(school.end);
  return end > start ? { start, end, days: school.days } : null;
}
