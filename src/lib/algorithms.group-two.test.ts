import { describe, expect, it } from "vitest";
import { generateDayPlan } from "./algorithms";
import { getDefaultChapters } from "./constants";
import { useStore, type StoreState } from "@/store/use-store";

const commerceStudent = (): StoreState => ({
  ...useStore.getState(),
  onboarded: true,
  selectedLanguage: "hindi",
  selectedElective: "computer",
  groupTwo: ["economics", "commercial"],
  subjects: getDefaultChapters("hindi", "computer", ["economics", "commercial"]),
});

describe("generateDayPlan for a student without Maths and Science", () => {
  // 18 Nov 2026: an ordinary day, well before the board exams
  const plan = generateDayPlan("2026-11-18", commerceStudent());
  const studied = new Set(plan.filter((b) => b.type === "study").map((b) => b.subjectKey));

  it("plans none of the subjects they don't take", () => {
    for (const key of ["math", "physics", "chemistry", "biology"]) expect(studied.has(key)).toBe(false);
  });

  it("plans the Group II subjects they do take", () => {
    expect(studied.has("economics") || studied.has("commercial")).toBe(true);
  });
});
