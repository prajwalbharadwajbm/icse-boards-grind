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
