import { describe, expect, it } from "vitest";
import { ELECTIVES, SECOND_LANGUAGES, getDefaultChapters, withSubjectKeys, type Chapter } from "./constants";

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

  it("fills the student's second language and elective saved as empty lists", () => {
    const next = withSubjectKeys({ hindi: [], computer: [] }, "hindi", "computer");
    expect(next.hindi.map((c) => c.name).slice(0, 5)).toEqual([
      "Composition",
      "Letter",
      "Comprehension",
      "Grammar",
      "Sahitya Sagar - Bade Ghar Ki Beti",
    ]);
    expect(next.computer[0].name).toBe("Revision of Class IX Syllabus");
  });

  it("keeps an elective with no published syllabus as an empty list", () => {
    expect(withSubjectKeys({}, "hindi", "robotics_ai").robotics_ai).toEqual([]);
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

  const withSyllabus = [...SECOND_LANGUAGES, ...ELECTIVES].map((s) => s.key).filter((k) => k !== "robotics_ai");

  it.each(withSyllabus)("gives %s a list with unique names and difficulty 1-5", (key) => {
    const isLanguage = SECOND_LANGUAGES.some((l) => l.key === key);
    const chapters = getDefaultChapters(isLanguage ? key : "hindi", isLanguage ? "computer" : key)[key];
    expect(chapters.length).toBeGreaterThan(0);
    expect(new Set(chapters.map((c) => c.name)).size).toBe(chapters.length);
    for (const c of chapters) {
      expect(c.status).toBe("not_started");
      expect(Number.isInteger(c.difficulty) && c.difficulty >= 1 && c.difficulty <= 5).toBe(true);
    }
  });

  it("starts every Indian language with the four Section A units", () => {
    const indian = SECOND_LANGUAGES.map((l) => l.key).filter((k) => k !== "french" && k !== "german");
    for (const key of indian) {
      const names = getDefaultChapters(key, "computer")[key].map((c) => c.name);
      expect(names.slice(0, 4), key).toEqual(["Composition", "Letter", "Comprehension", "Grammar"]);
    }
  });

  it("returns fresh chapter objects each time, so marking one student's chapter can't leak into another's", () => {
    const a = getDefaultChapters("hindi", "computer");
    a.math[0].status = "completed";
    a.hindi[0].status = "completed";
    const b = getDefaultChapters("hindi", "computer");
    expect(b.math[0].status).toBe("not_started");
    expect(b.hindi[0].status).toBe("not_started");
  });
});
