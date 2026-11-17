import { describe, expect, it } from "vitest";
import { getDefaultChapters, withSubjectKeys, type Chapter } from "./constants";

const ch = (name: string, status: Chapter["status"] = "not_started"): Chapter => ({ name, status, difficulty: 3 });

describe("withSubjectKeys", () => {
  it("fills a subject saved as an empty list with its default chapters", () => {
    const next = withSubjectKeys({ math: [] }, "hindi", "computer");
    expect(next.math.length).toBeGreaterThan(0);
    expect(next.math[0]).toEqual({ name: "Goods and Services Tax (GST)", status: "not_started", difficulty: 2 });
  });

  it("adds default chapters for a subject with no saved list", () => {
    const next = withSubjectKeys({}, "hindi", "computer");
    expect(next.history[0].name).toBe("Lok Sabha");
    expect(next.english_lit[0].name).toBe("Julius Caesar - Act III");
  });

  it("never replaces a saved list that has chapters in it", () => {
    const own = [ch("My own revision list", "completed")];
    const physics = [ch("Force", "in_progress")];
    const next = withSubjectKeys({ math: own, physics }, "hindi", "computer");
    expect(next.math).toBe(own);
    expect(next.physics).toBe(physics);
  });

  it("keeps the second language and elective as empty lists, since they have no defaults", () => {
    const next = withSubjectKeys({ hindi: [] }, "hindi", "computer");
    expect(next.hindi).toEqual([]);
    expect(next.computer).toEqual([]);
  });

  it("does not change the saved subjects it was given", () => {
    const saved = { math: [] as Chapter[], english_lang: [] as Chapter[] };
    withSubjectKeys(saved, "hindi", "computer");
    expect(saved).toEqual({ math: [], english_lang: [] });
  });
});

describe("getDefaultChapters", () => {
  it.each(["math", "history", "english_lang", "english_lit"])("gives %s a list with unique names and difficulty 1-5", (key) => {
    const chapters = getDefaultChapters("hindi", "computer")[key];
    expect(chapters.length).toBeGreaterThan(0);
    expect(new Set(chapters.map((c) => c.name)).size).toBe(chapters.length);
    for (const c of chapters) {
      expect(c.status).toBe("not_started");
      expect(Number.isInteger(c.difficulty) && c.difficulty >= 1 && c.difficulty <= 5).toBe(true);
    }
  });

  it("returns fresh chapter objects each time, so marking one student's chapter can't leak into another's", () => {
    const a = getDefaultChapters("hindi", "computer");
    a.math[0].status = "completed";
    expect(getDefaultChapters("hindi", "computer").math[0].status).toBe("not_started");
  });
});
