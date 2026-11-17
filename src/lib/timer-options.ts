import type { Chapter } from "./constants";

/**
 * Options for the timer's Chapter dropdown. A subject with no chapters (e.g. Robotics & AI, which has
 * no published syllabus yet) gets a "No chapters yet" prompt instead of an empty list.
 */
export function chapterOptions(
  subjectKey: string,
  subjects: Record<string, Chapter[]>
): { options: { value: string; label: string }[]; noChapters: boolean } {
  if (!subjectKey) return { options: [{ value: "", label: "Select chapter" }], noChapters: false };
  const chapters = subjects[subjectKey] || [];
  if (chapters.length === 0) return { options: [{ value: "", label: "No chapters yet" }], noChapters: true };
  return {
    options: [{ value: "", label: "Select chapter" }, ...chapters.map((ch) => ({ value: ch.name, label: ch.name }))],
    noChapters: false,
  };
}
