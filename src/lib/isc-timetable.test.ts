import { describe, expect, it } from "vitest";
import { ISC_PAPERS, ISC_SUBJECTS, nextIscPaper } from "./isc-timetable";

/** A moment in India time, e.g. ist("2027-03-08 13:00") */
const ist = (dateTime: string) => new Date(dateTime.replace(" ", "T") + ":00+05:30");

describe("nextIscPaper", () => {
  it("with no subjects picked, is the first paper of the season", () => {
    const next = nextIscPaper(ISC_PAPERS, [], ist("2026-11-19 10:00"));
    expect(next?.name).toBe("Environmental Science");
    expect(next?.date).toBe("2027-02-09");
  });

  it("only counts the picked subjects' papers, and moves on once a paper has started", () => {
    const next = nextIscPaper(ISC_PAPERS, ["english", "physics"], ist("2027-02-10 14:30"));
    expect(next?.name).toBe("English Literature");
    expect(next?.date).toBe("2027-02-15");
  });

  it("is null once the student's last paper has started", () => {
    expect(nextIscPaper(ISC_PAPERS, ["physics"], ist("2027-03-08 14:01"))).toBeNull();
  });

  it("ignores saved picks that are no longer subjects, and uses every paper if none are left", () => {
    expect(nextIscPaper(ISC_PAPERS, ["chemistry", "old_subject"], ist("2027-01-01 09:00"))?.name).toBe("Chemistry (theory)");
    expect(nextIscPaper(ISC_PAPERS, ["old_subject"], ist("2027-01-01 09:00"))?.name).toBe("Environmental Science");
  });
});

// Checked against The Hindu, Times of India and Careers360 copies of CISCE's ISC 2027 timetable
describe("ISC 2027 timetable data", () => {
  it("has all 41 theory papers, 9 February to 8 April 2027, in date order", () => {
    expect(ISC_PAPERS).toHaveLength(41);
    expect(ISC_PAPERS[0]).toMatchObject({ name: "Environmental Science", date: "2027-02-09" });
    expect(ISC_PAPERS.at(-1)).toMatchObject({ name: "Legal Studies", date: "2027-04-08" });
    const dates = ISC_PAPERS.map((p) => p.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("starts Art papers at 9:00 and every other paper at 2:00 pm", () => {
    for (const p of ISC_PAPERS) {
      expect([p.key, p.start]).toEqual([p.key, p.subject === "art" ? "09:00" : "14:00"]);
    }
  });

  it("puts the main papers on the published dates", () => {
    const dateOf = (key: string) => ISC_PAPERS.find((p) => p.key === key)?.date;
    expect(dateOf("english_1")).toBe("2027-02-10");
    expect(dateOf("accountancy")).toBe("2027-02-26");
    expect(dateOf("mathematics")).toBe("2027-03-01");
    expect(dateOf("physics")).toBe("2027-03-08");
    expect(dateOf("computer_science")).toBe("2027-03-17");
    expect(dateOf("psychology")).toBe("2027-03-31");
  });

  it("links every paper to a subject in the picker, and every subject to a paper", () => {
    const subjects = ISC_SUBJECTS.map((s) => s.key);
    expect(new Set(ISC_PAPERS.map((p) => p.key)).size).toBe(ISC_PAPERS.length);
    expect(new Set(subjects).size).toBe(subjects.length);
    expect(ISC_PAPERS.filter((p) => !subjects.includes(p.subject))).toEqual([]);
    expect(subjects.filter((s) => !ISC_PAPERS.some((p) => p.subject === s))).toEqual([]);
  });
});
