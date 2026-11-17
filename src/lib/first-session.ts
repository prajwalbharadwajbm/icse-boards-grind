import type { Block, Chapter, Exam } from "./constants";

// Local copy: ./utils pulls in analytics and posthog-js, which this pure module doesn't need
const timeToMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export type FirstSessionReason = "plan_now" | "plan_next" | "weak" | "next_paper";

export interface FirstSession {
  subjectKey: string;
  chapter: string | null;
  reason: FirstSessionReason;
  /** Start time of the plan block, for plan_next */
  at?: string;
}

/**
 * A student who has never studied in the app and hasn't marked a chapter done.
 * They get the "Start here" card and a dashboard that leads with what to do.
 */
export function isNewStudent(data: {
  studyLog?: Record<string, { hours: number; sessions: number }>;
  timerSessions?: unknown[];
  subjects?: Record<string, Chapter[]>;
}): boolean {
  const studied = Object.values(data.studyLog || {}).some((l) => (l?.hours || 0) > 0 || (l?.sessions || 0) > 0);
  if (studied || (data.timerSessions || []).length > 0) return false;
  return !Object.values(data.subjects || {}).some((chapters) => chapters.some((c) => c.status === "completed"));
}

/**
 * What a new student should study first: the study block on today's plan now or next,
 * else the subject they rated weakest with the earliest paper, else their first paper.
 */
export function pickFirstSession(opts: {
  plan: Block[];
  nowMin: number;
  subjects: Record<string, Chapter[]>;
  subjectRatings?: Record<string, string>;
  exams: Exam[];
  td: string;
}): FirstSession | null {
  const { plan, nowMin, subjects, subjectRatings = {}, exams, td } = opts;
  const firstOpenChapter = (key: string) => (subjects[key] || []).find((c) => c.status !== "completed")?.name ?? null;
  const known = (key?: string): key is string => !!key && (key in subjects || exams.some((e) => e.key === key));

  const studyBlocks = plan.filter((b) => b.type === "study" && known(b.subjectKey));
  const current = studyBlocks.find((b) => nowMin >= timeToMin(b.start) && nowMin < timeToMin(b.end));
  if (current?.subjectKey) {
    return { subjectKey: current.subjectKey, chapter: firstOpenChapter(current.subjectKey), reason: "plan_now" };
  }
  const next = studyBlocks.find((b) => timeToMin(b.start) > nowMin);
  if (next?.subjectKey) {
    return { subjectKey: next.subjectKey, chapter: firstOpenChapter(next.subjectKey), reason: "plan_next", at: next.start };
  }

  const upcoming = [...exams].filter((e) => e.date >= td).sort((a, b) => a.date.localeCompare(b.date));
  const weak = upcoming.find((e) => subjectRatings[e.key] === "weak");
  if (weak) return { subjectKey: weak.key, chapter: firstOpenChapter(weak.key), reason: "weak" };

  const first = upcoming[0];
  if (first) return { subjectKey: first.key, chapter: firstOpenChapter(first.key), reason: "next_paper" };
  return null;
}
