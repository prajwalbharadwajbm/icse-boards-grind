import { describe, expect, it } from "vitest";
import { isNewStudent, pickFirstSession } from "./first-session";
import type { Block, Chapter, Exam } from "./constants";

const ch = (name: string, status: Chapter["status"] = "not_started"): Chapter => ({ name, status, difficulty: 2 });
const subjects: Record<string, Chapter[]> = {
  physics: [ch("Force", "completed"), ch("Light")],
  math: [ch("Algebra")],
  english_lang: [ch("Composition")],
};
const exams: Exam[] = [
  { date: "2027-02-15", subject: "English Language", key: "english_lang", duration: "2h" },
  { date: "2027-02-20", subject: "Physics", key: "physics", duration: "2h" },
  { date: "2027-03-01", subject: "Mathematics", key: "math", duration: "2.5h" },
];
const plan: Block[] = [
  { start: "07:00", end: "07:30", label: "Breakfast", type: "meal" },
  { start: "16:00", end: "17:00", label: "Physics", type: "study", subjectKey: "physics" },
  { start: "18:00", end: "19:00", label: "Maths", type: "study", subjectKey: "math" },
];
const base = { plan, subjects, exams, td: "2026-11-17" };

describe("pickFirstSession", () => {
  it("picks the study block happening now, with its first unfinished chapter", () => {
    expect(pickFirstSession({ ...base, nowMin: 16 * 60 + 10 })).toEqual({ subjectKey: "physics", chapter: "Light", reason: "plan_now" });
  });

  it("picks the next study block later today", () => {
    expect(pickFirstSession({ ...base, nowMin: 17 * 60 + 10 })).toEqual({ subjectKey: "math", chapter: "Algebra", reason: "plan_next", at: "18:00" });
  });

  it("falls back to the weakest subject with the earliest paper once today's plan is over", () => {
    const pick = pickFirstSession({ ...base, nowMin: 21 * 60, subjectRatings: { math: "weak", physics: "weak" } });
    expect(pick).toEqual({ subjectKey: "physics", chapter: "Light", reason: "weak" });
  });

  it("falls back to the first paper when nothing is planned or rated weak", () => {
    expect(pickFirstSession({ ...base, plan: [], nowMin: 600 })).toEqual({ subjectKey: "english_lang", chapter: "Composition", reason: "next_paper" });
  });

  it("returns null when every paper is done", () => {
    expect(pickFirstSession({ ...base, plan: [], nowMin: 600, td: "2027-04-01" })).toBeNull();
  });
});

describe("isNewStudent", () => {
  it("is true before any study time or finished chapter", () => {
    expect(isNewStudent({ studyLog: {}, timerSessions: [], subjects: { math: [ch("Algebra")] } })).toBe(true);
  });

  it("is false once a session is logged or a chapter is marked done", () => {
    expect(isNewStudent({ studyLog: { "2026-11-17": { hours: 0.4, sessions: 1 } }, subjects: {} })).toBe(false);
    expect(isNewStudent({ timerSessions: [{}], subjects: {} })).toBe(false);
    expect(isNewStudent({ subjects: { physics: [ch("Force", "completed")] } })).toBe(false);
  });
});
