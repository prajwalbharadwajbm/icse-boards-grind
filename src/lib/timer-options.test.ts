import { describe, expect, it } from "vitest";
import { chapterOptions } from "./timer-options";
import type { Chapter } from "./constants";

const ch = (name: string): Chapter => ({ name, status: "not_started", difficulty: 3 });
const subjects: Record<string, Chapter[]> = { math: [ch("Banking"), ch("Matrices")], robotics_ai: [] };

describe("chapterOptions", () => {
  it("offers only the prompt before a subject is picked", () => {
    expect(chapterOptions("", subjects)).toEqual({ options: [{ value: "", label: "Select chapter" }], noChapters: false });
  });

  it("lists the subject's chapters after the prompt", () => {
    expect(chapterOptions("math", subjects)).toEqual({
      options: [
        { value: "", label: "Select chapter" },
        { value: "Banking", label: "Banking" },
        { value: "Matrices", label: "Matrices" },
      ],
      noChapters: false,
    });
  });

  it("says there are no chapters yet for a subject with an empty list", () => {
    expect(chapterOptions("robotics_ai", subjects)).toEqual({ options: [{ value: "", label: "No chapters yet" }], noChapters: true });
  });

  it("treats a subject missing from the saved data like an empty one", () => {
    expect(chapterOptions("economics", subjects).noChapters).toBe(true);
  });
});
