import { describe, expect, it } from "vitest";
import { generateDayPlan } from "./algorithms";
import { useStore, type StoreState } from "@/store/use-store";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const routine = { wake: "06:00", breakfast: "07:00", lunch: "13:00", snack: "17:00", dinner: "20:30", sleep: "22:30" };
const student = (school?: { start: string; end: string; days: number[] }): StoreState => ({
  ...useStore.getState(),
  onboarded: true,
  selectedLanguage: "kannada",
  selectedElective: "computer",
  routine: school ? { ...routine, school } : routine,
});

// 18 Nov 2026 is a Wednesday, 22 Nov 2026 a Sunday; both are well before the board exams
const WEDNESDAY = "2026-11-18";
const SUNDAY = "2026-11-22";
const MON_TO_FRI = [1, 2, 3, 4, 5];

describe("generateDayPlan with school hours", () => {
  const withSchool = student({ start: "08:00", end: "14:30", days: MON_TO_FRI });

  it("plans no study during school on a school day, and shows the school block", () => {
    const plan = generateDayPlan(WEDNESDAY, withSchool);
    expect(plan).toContainEqual(expect.objectContaining({ start: "08:00", end: "14:30", label: "School" }));
    const studyInSchool = plan.filter(
      (b) => b.type === "study" && toMin(b.start) < toMin("14:30") && toMin(b.end) > toMin("08:00")
    );
    expect(studyInSchool).toEqual([]);
  });

  it("drops a meal that falls during school instead of pushing it after school", () => {
    const plan = generateDayPlan(WEDNESDAY, withSchool);
    expect(plan.some((b) => b.label.startsWith("LUNCH"))).toBe(false);
    expect(plan).toContainEqual(expect.objectContaining({ start: "07:00", label: "BREAKFAST" }));
  });

  it("plans a day off school exactly as before", () => {
    expect(generateDayPlan(SUNDAY, withSchool)).toEqual(generateDayPlan(SUNDAY, student()));
  });

  it("keeps school at its set time when breakfast runs into it, ending breakfast at the bell", () => {
    const lateBreakfast = { ...withSchool, routine: { ...withSchool.routine, breakfast: "07:45" } };
    const plan = generateDayPlan(WEDNESDAY, lateBreakfast);
    expect(plan).toContainEqual(expect.objectContaining({ start: "08:00", end: "14:30", label: "School" }));
    expect(plan).toContainEqual(expect.objectContaining({ start: "07:45", end: "08:00", label: "BREAKFAST" }));
  });

  it("treats school hours that end before they start as no school", () => {
    const backwards = student({ start: "08:00", end: "02:30", days: MON_TO_FRI });
    expect(generateDayPlan(WEDNESDAY, backwards)).toEqual(generateDayPlan(WEDNESDAY, student()));
  });

  it("plans the whole day when school is switched off", () => {
    const off = { ...student(), routine: { ...routine, school: null } };
    expect(generateDayPlan(WEDNESDAY, off)).toEqual(generateDayPlan(WEDNESDAY, student()));
  });
});

// Preboards: Physics on Tue 8 Dec, Maths on Thu 10 Dec, Chemistry on Sat 12 Dec 2026
const PREBOARDS = { physics: "2026-12-08", math: "2026-12-10", chemistry: "2026-12-12" };
const studySubjects = (plan: ReturnType<typeof generateDayPlan>) =>
  plan.filter((b) => b.type === "study").map((b) => b.subjectKey);
/** Three of every four study blocks go to the next paper, the fourth to the paper after it */
const focusPattern = (next: string, after: string, n: number) =>
  Array.from({ length: n }, (_, i) => (i % 4 === 2 ? after : next));

describe("generateDayPlan during preboards", () => {
  const withPreboards = { ...student(), preboards: PREBOARDS };

  it("in the week before preboards, studies the first paper, with every fourth block on the paper after it", () => {
    const subjects = studySubjects(generateDayPlan("2026-12-05", withPreboards));
    expect(subjects.length).toBeGreaterThan(3);
    expect(subjects).toEqual(focusPattern("physics", "math", subjects.length));
  });

  it("on a preboard day, reviews that day's paper first, then moves to the next paper", () => {
    const subjects = studySubjects(generateDayPlan("2026-12-08", withPreboards));
    expect(subjects[0]).toBe("physics");
    expect(subjects.slice(1)).toEqual(focusPattern("math", "chemistry", subjects.length - 1));
  });

  it("after the last paper's review, goes back to the usual board plan", () => {
    const subjects = studySubjects(generateDayPlan("2026-12-12", withPreboards));
    const usual = studySubjects(generateDayPlan("2026-12-12", student()));
    expect(subjects[0]).toBe("chemistry");
    expect(subjects.slice(1)).toEqual(usual.slice(0, subjects.length - 1));
  });

  it("still plans no study during school hours on a preboard-season school day", () => {
    const plan = generateDayPlan("2026-12-09", { ...student({ start: "08:00", end: "14:30", days: MON_TO_FRI }), preboards: PREBOARDS });
    expect(plan).toContainEqual(expect.objectContaining({ start: "08:00", end: "14:30", label: "School" }));
    expect(plan.filter((b) => b.type === "study" && toMin(b.start) < toMin("14:30") && toMin(b.end) > toMin("08:00"))).toEqual([]);
    expect(studySubjects(plan)[0]).toBe("math");
  });

  it("reviews both papers first when two preboards fall on the same day, and labels the review", () => {
    const sameDay = { ...student(), preboards: { physics: "2026-12-08", chemistry: "2026-12-08", math: "2026-12-10" } };
    const plan = generateDayPlan("2026-12-08", sameDay);
    const study = plan.filter((b) => b.type === "study");
    expect(new Set(study.slice(0, 2).map((b) => b.subjectKey))).toEqual(new Set(["physics", "chemistry"]));
    expect(study[0].label).toMatch(/ — Quick review before your preboard$/);
    expect(study.slice(2).every((b) => b.subjectKey === "math")).toBe(true);
    const dayBefore = studySubjects(generateDayPlan("2026-12-07", sameDay));
    expect(dayBefore.filter((k) => k === "physics").length - dayBefore.filter((k) => k === "chemistry").length).toBeGreaterThanOrEqual(-1);
    expect(dayBefore.filter((k) => k === "physics").length - dayBefore.filter((k) => k === "chemistry").length).toBeLessThanOrEqual(1);
  });

  it("skips the review when there's no time to study before school, where the paper is written", () => {
    const early = { ...student({ start: "07:15", end: "14:00", days: MON_TO_FRI }), preboards: PREBOARDS };
    early.routine = { ...early.routine, breakfast: "06:30" };
    const subjects = studySubjects(generateDayPlan("2026-12-08", early));
    expect(subjects).not.toContain("physics");
    expect(subjects[0]).toBe("math");
  });

  it("only focuses on a paper in the week before it, so a long break between papers plans as usual", () => {
    const winterBreak = { ...student(), preboards: { physics: "2026-12-08", math: "2027-01-18" } };
    expect(generateDayPlan("2026-12-20", winterBreak)).toEqual(generateDayPlan("2026-12-20", student()));
    expect(studySubjects(generateDayPlan("2027-01-11", winterBreak)).every((k) => k === "math")).toBe(true);
  });

  it("ignores preboard dates in board season, so board revision is kept", () => {
    const late = { ...student(), preboards: { chemistry: "2027-02-17" } };
    expect(generateDayPlan("2027-02-13", late)).toEqual(generateDayPlan("2027-02-13", student()));
  });

  it("works through different chapters across the day instead of repeating one", () => {
    const plan = generateDayPlan("2026-12-05", withPreboards);
    const chapters = plan.filter((b) => b.type === "study" && b.subjectKey === "physics").map((b) => b.label);
    const unfinished = (withPreboards.subjects.physics || []).filter((c) => c.status !== "completed").length;
    expect(new Set(chapters).size).toBe(Math.min(chapters.length, unfinished));
  });

  it("plans exactly as before more than a week ahead of preboards, after them, and with none set", () => {
    for (const date of ["2026-11-30", "2026-12-13"]) {
      expect(generateDayPlan(date, withPreboards)).toEqual(generateDayPlan(date, student()));
    }
    expect(generateDayPlan("2026-12-05", { ...student(), preboards: {} })).toEqual(generateDayPlan("2026-12-05", student()));
  });
});
