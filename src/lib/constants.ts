import { syllabusChapters } from "./syllabus-chapters";

export interface Chapter {
  name: string;
  status: "not_started" | "in_progress" | "completed" | "needs_revision";
  difficulty: number;
  revisionDate?: string;
  revisionIntervals?: number[];
  revisionsCompleted?: number;
}

export interface Block {
  start: string;
  end: string;
  label: string;
  type: "study" | "meal" | "break" | "sleep";
  subjectKey?: string;
}

export interface Exam {
  date: string;
  subject: string;
  key: string;
  duration: string;
}

export interface SecondLanguage {
  name: string;
  key: string;
  date: string;
  duration: string;
}

export interface Elective {
  name: string;
  key: string;
  date: string;
  duration: string;
  group: string;
}

/** One year's ICSE (Class 10) timetable, as published by CISCE. */
export interface ExamTimetable {
  year: number;
  /** When the timetable was published, and where the dates were checked */
  released: string;
  source: string;
  /** Regular papers: reading time starts, writing starts, candidates seated by (24h, IST) */
  readingStart: string;
  writingStart: string;
  seatedBy: string;
  core: Exam[];
  secondLanguages: SecondLanguage[];
  electives: Elective[];
}

// ── ICSE 2026 (Feb–Mar 2026). Kept for reference and for past-year reports. ──
const TIMETABLE_2026: ExamTimetable = {
  year: 2026,
  released: "2025-11-13",
  source: "CISCE ICSE Year 2026 timetable",
  readingStart: "10:45",
  writingStart: "11:00",
  seatedBy: "10:30",
  core: [
    { date: "2026-02-17", subject: "English Language Paper 1", key: "english_lang", duration: "2hrs" },
    { date: "2026-02-20", subject: "English Literature Paper 2", key: "english_lit", duration: "2hrs" },
    { date: "2026-03-02", subject: "Mathematics", key: "math", duration: "3hrs" },
    { date: "2026-03-09", subject: "Physics", key: "physics", duration: "2hrs" },
    { date: "2026-03-11", subject: "Chemistry", key: "chemistry", duration: "2hrs" },
    { date: "2026-03-13", subject: "Biology", key: "biology", duration: "2hrs" },
    { date: "2026-03-16", subject: "History & Civics", key: "history", duration: "2hrs" },
    { date: "2026-03-18", subject: "Geography", key: "geography", duration: "2hrs" },
  ],
  secondLanguages: [
    { name: "Hindi", key: "hindi", date: "2026-02-26", duration: "3hrs" },
    { name: "Kannada", key: "kannada", date: "2026-03-06", duration: "3hrs" },
    { name: "Tamil", key: "tamil", date: "2026-03-06", duration: "3hrs" },
    { name: "Telugu", key: "telugu", date: "2026-03-06", duration: "3hrs" },
    { name: "Bengali", key: "bengali", date: "2026-03-06", duration: "3hrs" },
    { name: "Malayalam", key: "malayalam", date: "2026-03-06", duration: "3hrs" },
    { name: "Marathi", key: "marathi", date: "2026-03-06", duration: "3hrs" },
    { name: "Gujarati", key: "gujarati", date: "2026-03-06", duration: "3hrs" },
    { name: "Punjabi", key: "punjabi", date: "2026-03-06", duration: "3hrs" },
    { name: "Urdu", key: "urdu", date: "2026-03-06", duration: "3hrs" },
    { name: "French", key: "french", date: "2026-03-06", duration: "3hrs" },
    { name: "German", key: "german", date: "2026-03-06", duration: "3hrs" },
    { name: "Sanskrit", key: "sanskrit", date: "2026-03-06", duration: "3hrs" },
  ],
  electives: [
    { name: "Computer Applications", key: "computer", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Economic Applications", key: "economic_app", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Physical Education", key: "physical_ed", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Home Science", key: "home_science", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Fashion Designing", key: "fashion", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Cookery", key: "cookery", date: "2026-03-23", duration: "2hrs", group: "III-A" },
    { name: "Commercial Studies", key: "commercial", date: "2026-03-25", duration: "2hrs", group: "II" },
    { name: "French (Elective)", key: "french_elective", date: "2026-03-25", duration: "2hrs", group: "II" },
    { name: "Economics", key: "economics", date: "2026-03-27", duration: "2hrs", group: "II" },
    { name: "Environmental Science", key: "env_science", date: "2026-03-30", duration: "2hrs", group: "II" },
  ],
};

// ── ICSE 2027 (15 Feb – 31 Mar 2027). Published by CISCE on 10 Nov 2026. ──
// Dates cross-checked across OneIndia, CareerIndia and Careers360 reports of the official PDF.
// New for 2027: reading time 10:00, writing 10:15, seated by 9:45 (was 10:45 / 11:00).
// Durations follow the 2026 paper lengths.
const SECOND_LANGUAGE_DAY_2027 = "2027-03-19"; // Indian and foreign languages, one sitting
const GROUP_3A_DAY_2027 = "2027-03-17"; // Group III elective, section A

const TIMETABLE_2027: ExamTimetable = {
  year: 2027,
  released: "2026-11-10",
  source: "CISCE ICSE Year 2027 timetable",
  readingStart: "10:00",
  writingStart: "10:15",
  seatedBy: "09:45",
  core: [
    { date: "2027-02-15", subject: "English Language Paper 1", key: "english_lang", duration: "2hrs" },
    { date: "2027-02-18", subject: "English Literature Paper 2", key: "english_lit", duration: "2hrs" },
    { date: "2027-02-22", subject: "Mathematics", key: "math", duration: "3hrs" },
    { date: "2027-02-26", subject: "History & Civics", key: "history", duration: "2hrs" },
    { date: "2027-03-01", subject: "Geography", key: "geography", duration: "2hrs" },
    { date: "2027-03-08", subject: "Physics", key: "physics", duration: "2hrs" },
    { date: "2027-03-12", subject: "Chemistry", key: "chemistry", duration: "2hrs" },
    { date: "2027-03-15", subject: "Biology", key: "biology", duration: "2hrs" },
  ],
  secondLanguages: [
    { name: "Hindi", key: "hindi", date: "2027-03-04", duration: "3hrs" },
    { name: "Kannada", key: "kannada", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Tamil", key: "tamil", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Telugu", key: "telugu", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Bengali", key: "bengali", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Malayalam", key: "malayalam", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Marathi", key: "marathi", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Gujarati", key: "gujarati", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Punjabi", key: "punjabi", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Urdu", key: "urdu", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "French", key: "french", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "German", key: "german", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
    { name: "Sanskrit", key: "sanskrit", date: SECOND_LANGUAGE_DAY_2027, duration: "3hrs" },
  ],
  electives: [
    { name: "Computer Applications", key: "computer", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Economic Applications", key: "economic_app", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Commercial Applications", key: "commercial_app", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Physical Education", key: "physical_ed", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Home Science", key: "home_science", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Fashion Designing", key: "fashion", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Cookery", key: "cookery", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Technical Drawing Applications", key: "tech_drawing", date: GROUP_3A_DAY_2027, duration: "2hrs", group: "III-A" },
    { name: "Robotics & Artificial Intelligence", key: "robotics_ai", date: "2027-02-24", duration: "2hrs", group: "III-B" },
    { name: "Environmental Science", key: "env_science", date: "2027-03-25", duration: "2hrs", group: "II" },
    { name: "Commercial Studies", key: "commercial", date: "2027-03-29", duration: "2hrs", group: "II" },
    { name: "Economics", key: "economics", date: "2027-03-31", duration: "2hrs", group: "II" },
    { name: "French (Elective)", key: "french_elective", date: "2027-03-31", duration: "2hrs", group: "II" },
    { name: "Sanskrit (Elective)", key: "sanskrit_elective", date: "2027-03-31", duration: "2hrs", group: "II" },
  ],
};

export const TIMETABLES: Record<number, ExamTimetable> = {
  2026: TIMETABLE_2026,
  2027: TIMETABLE_2027,
};

/** The board exam year the app is preparing students for. Bump this (and add a timetable) each November. */
export const EXAM_YEAR = 2027;
export const TIMETABLE: ExamTimetable = TIMETABLES[EXAM_YEAR];

// Current-year lists (used by onboarding, settings and admin)
export const CORE_EXAMS: Exam[] = TIMETABLE.core;
export const SECOND_LANGUAGES: SecondLanguage[] = TIMETABLE.secondLanguages;
export const ELECTIVES: Elective[] = TIMETABLE.electives;

/** Writing start of a paper as a local Date, e.g. 2027-02-15 10:15 */
export function examStart(date: string): Date {
  return new Date(`${date}T${TIMETABLE.writingStart}:00`);
}

/** Paper length in hours, from strings like "2hrs" or "2.5hrs" */
export function examHours(duration: string): number {
  return parseFloat(duration) || 2;
}

/** When a paper finishes writing */
export function examEnd(exam: Pick<Exam, "date" | "duration">): Date {
  const end = examStart(exam.date);
  end.setMinutes(end.getMinutes() + Math.round(examHours(exam.duration) * 60));
  return end;
}

/**
 * ICSE Group II: every student takes any two or three of these (CISCE regulations). Science is one
 * subject with three papers. Group I (English, a second language, History & Civics, Geography) is
 * compulsory and Group III is the elective.
 */
export const GROUP_TWO_OPTIONS = [
  { key: "math", name: "Mathematics", papers: ["math"] },
  { key: "science", name: "Science", detail: "Physics, Chemistry, Biology", papers: ["physics", "chemistry", "biology"] },
  { key: "economics", name: "Economics", papers: ["economics"] },
  { key: "commercial", name: "Commercial Studies", papers: ["commercial"] },
  { key: "env_science", name: "Environmental Science", papers: ["env_science"] },
  { key: "french_elective", name: "French", papers: ["french_elective"] },
  { key: "sanskrit_elective", name: "Sanskrit", papers: ["sanskrit_elective"] },
] as const;

/** Students who never chose (everyone before Group II choice existed) take Maths and Science */
export const DEFAULT_GROUP_TWO = ["math", "science"];

const GROUP_ONE_PAPERS = ["english_lang", "english_lit", "history", "geography"];

/** The paper keys for a student's Group II choice, e.g. ["math", "science"] → math, physics, chemistry, biology */
export function groupTwoPapers(groupTwo?: readonly string[] | null): string[] {
  const chosen = groupTwo && groupTwo.length > 0 ? groupTwo : DEFAULT_GROUP_TWO;
  return GROUP_TWO_OPTIONS.filter((o) => chosen.includes(o.key)).flatMap((o) => [...o.papers]);
}

/** Build the full exam list: Group I, the chosen Group II subjects, the second language and the elective */
export function getExams(languageKey: string, electiveKey: string, groupTwo?: readonly string[] | null): Exam[] {
  const papers = [...GROUP_ONE_PAPERS, ...groupTwoPapers(groupTwo)];
  const exams: Exam[] = CORE_EXAMS.filter((e) => papers.includes(e.key));
  for (const key of papers) {
    if (exams.some((e) => e.key === key)) continue;
    const paper = ELECTIVES.find((e) => e.key === key);
    if (paper) exams.push({ date: paper.date, subject: paper.name, key: paper.key, duration: paper.duration });
  }

  const lang = SECOND_LANGUAGES.find((l) => l.key === languageKey);
  if (lang) {
    exams.push({ date: lang.date, subject: lang.name, key: lang.key, duration: lang.duration });
  }

  // Older accounts may have a Group II subject saved as their elective; it can also be in groupTwo
  const elective = ELECTIVES.find((e) => e.key === electiveKey);
  if (elective && !exams.some((e) => e.key === elective.key)) {
    exams.push({ date: elective.date, subject: elective.name, key: elective.key, duration: elective.duration });
  }

  // Sort by date
  exams.sort((a, b) => a.date.localeCompare(b.date));
  return exams;
}

/** All possible subject labels and colors (for "show all papers" mode) */
export const ALL_SUBJECT_LABELS: Record<string, string> = {
  english_lang: "English Language",
  english_lit: "English Literature",
  math: "Mathematics",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
  history: "History & Civics",
  geography: "Geography",
  ...Object.fromEntries(SECOND_LANGUAGES.map((l) => [l.key, l.name])),
  ...Object.fromEntries(ELECTIVES.map((e) => [e.key, e.name])),
  economics: "Economics",
  commercial: "Commercial Studies",
};

/** All possible subject colors (for "show all papers" mode) */
export const ALL_SUBJECT_COLORS: Record<string, string> = {
  english_lang: "#7b61ff", english_lit: "#9c7cff", math: "#ea4335", physics: "#1a73e8",
  chemistry: "#f9ab00", biology: "#12b5cb", history: "#d93025", geography: "#1e8e3e",
  hindi: "#ff6b35", kannada: "#34a853", tamil: "#e040fb", telugu: "#00bfa5",
  bengali: "#ff5722", malayalam: "#3f51b5", marathi: "#ff9800", gujarati: "#8bc34a",
  punjabi: "#009688", urdu: "#795548", french: "#2196f3", german: "#607d8b", sanskrit: "#9c27b0",
  computer: "#5f6368", economic_app: "#4caf50", physical_ed: "#ff5252",
  home_science: "#e91e63", fashion: "#ab47bc", cookery: "#ff7043",
  commercial: "#42a5f5", french_elective: "#26a69a", economics: "#66bb6a", env_science: "#29b6f6",
  commercial_app: "#5c6bc0", tech_drawing: "#8d6e63", robotics_ai: "#00acc1", sanskrit_elective: "#ab47bc",
};

/** Get labels for all subjects including the selected language and elective */
export function getSubjectLabels(languageKey: string, electiveKey: string, groupTwo?: readonly string[] | null): Record<string, string> {
  const named: Record<string, string> = {
    english_lang: "English Language",
    english_lit: "English Literature",
    math: "Mathematics",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    history: "History & Civics",
    geography: "Geography",
  };
  const labels: Record<string, string> = {};
  for (const key of [...GROUP_ONE_PAPERS, ...groupTwoPapers(groupTwo)]) {
    const name = named[key] ?? ELECTIVES.find((e) => e.key === key)?.name;
    if (name) labels[key] = name;
  }

  const lang = SECOND_LANGUAGES.find((l) => l.key === languageKey);
  if (lang) labels[lang.key] = lang.name;

  const elective = ELECTIVES.find((e) => e.key === electiveKey);
  if (elective) labels[elective.key] = elective.name;

  return labels;
}

/** Get colors for all subjects including the selected language and elective */
export function getSubjectColors(languageKey: string, electiveKey: string, groupTwo?: readonly string[] | null): Record<string, string> {
  const colors: Record<string, string> = {
    english_lang: "#7b61ff",
    english_lit: "#9c7cff",
    math: "#ea4335",
    physics: "#1a73e8",
    chemistry: "#f9ab00",
    biology: "#12b5cb",
    history: "#d93025",
    geography: "#1e8e3e",
  };

  // Assign colors for language and elective
  const langColors: Record<string, string> = {
    hindi: "#ff6b35", kannada: "#34a853", tamil: "#e040fb", telugu: "#00bfa5",
    bengali: "#ff5722", malayalam: "#3f51b5", marathi: "#ff9800", gujarati: "#8bc34a",
    punjabi: "#009688", urdu: "#795548", french: "#2196f3", german: "#607d8b",
    sanskrit: "#9c27b0",
  };

  const electiveColors: Record<string, string> = {
    computer: "#5f6368", economic_app: "#4caf50", physical_ed: "#ff5252",
    home_science: "#e91e63", fashion: "#ab47bc", cookery: "#ff7043",
    commercial: "#42a5f5", french_elective: "#26a69a", economics: "#66bb6a",
    env_science: "#29b6f6", commercial_app: "#5c6bc0", tech_drawing: "#8d6e63",
    robotics_ai: "#00acc1", sanskrit_elective: "#ab47bc",
  };

  const all: Record<string, string> = { ...colors, ...electiveColors, ...langColors };
  const picked: Record<string, string> = {};
  for (const key of Object.keys(getSubjectLabels(languageKey, electiveKey, groupTwo))) {
    if (all[key]) picked[key] = all[key];
  }
  return picked;
}

/** Get default chapters for all subjects */
export function getDefaultChapters(languageKey: string, electiveKey: string, groupTwo?: readonly string[] | null): Record<string, Chapter[]> {
  const core: Record<string, Chapter[]> = {
    physics: [
      { name: "Force", status: "not_started", difficulty: 3 },
      { name: "Work, Power & Energy", status: "not_started", difficulty: 3 },
      { name: "Machines", status: "not_started", difficulty: 3 },
      { name: "Refraction of Light at Plane Surfaces", status: "not_started", difficulty: 4 },
      { name: "Refraction Through a Lens", status: "not_started", difficulty: 4 },
      { name: "Spectrum", status: "not_started", difficulty: 2 },
      { name: "Sound", status: "not_started", difficulty: 3 },
      { name: "Current Electricity", status: "not_started", difficulty: 4 },
      { name: "Electrical Power and Household Circuits", status: "not_started", difficulty: 3 },
      { name: "Magnetic Effects of Current", status: "not_started", difficulty: 3 },
      { name: "Calorimetry", status: "not_started", difficulty: 3 },
      { name: "Radioactivity and Nuclear Energy", status: "not_started", difficulty: 3 },
    ],
    chemistry: [
      { name: "The Periodic Table", status: "not_started", difficulty: 3 },
      { name: "Chemical Bonding", status: "not_started", difficulty: 4 },
      { name: "Acids, Bases and Salts", status: "not_started", difficulty: 3 },
      { name: "Analytical Chemistry", status: "not_started", difficulty: 3 },
      { name: "Electrolysis", status: "not_started", difficulty: 4 },
      { name: "Electro Metallurgy", status: "not_started", difficulty: 3 },
      { name: "Study of Compounds - HCl", status: "not_started", difficulty: 3 },
      { name: "Study of Compounds - NH3", status: "not_started", difficulty: 3 },
      { name: "Study of Compounds - HNO3", status: "not_started", difficulty: 3 },
      { name: "Study of Compounds - H2SO4", status: "not_started", difficulty: 3 },
      { name: "Organic Chemistry", status: "not_started", difficulty: 4 },
    ],
    biology: [
      { name: "Structure of Chromosomes", status: "not_started", difficulty: 3 },
      { name: "Genetics & Cell Division", status: "not_started", difficulty: 4 },
      { name: "Photosynthesis", status: "not_started", difficulty: 3 },
      { name: "Transpiration", status: "not_started", difficulty: 3 },
      { name: "Chemical Coordination in Plants", status: "not_started", difficulty: 3 },
      { name: "Circulatory System", status: "not_started", difficulty: 4 },
      { name: "Excretory System", status: "not_started", difficulty: 3 },
      { name: "Nervous System", status: "not_started", difficulty: 4 },
      { name: "Endocrine System", status: "not_started", difficulty: 3 },
      { name: "Reproductive System", status: "not_started", difficulty: 3 },
      { name: "Health & Hygiene", status: "not_started", difficulty: 2 },
      { name: "Pollution", status: "not_started", difficulty: 2 },
      { name: "Population", status: "not_started", difficulty: 2 },
      { name: "Human Evolution", status: "not_started", difficulty: 3 },
    ],
    geography: [
      { name: "Climate", status: "not_started", difficulty: 3 },
      { name: "Soil", status: "not_started", difficulty: 2 },
      { name: "Natural Vegetation", status: "not_started", difficulty: 3 },
      { name: "Water Resources", status: "not_started", difficulty: 3 },
      { name: "Transport", status: "not_started", difficulty: 2 },
      { name: "Agriculture Unit 1 - Types & Major Crops", status: "not_started", difficulty: 3 },
      { name: "Agriculture Unit 2 - Climatic & Soil Conditions", status: "not_started", difficulty: 3 },
      { name: "Agriculture Unit 3 - Tools, Techniques, Changes", status: "not_started", difficulty: 2 },
      { name: "Agriculture Unit 4 - Problems & Government Measures", status: "not_started", difficulty: 2 },
      { name: "Industries - Types, Examples, Factors", status: "not_started", difficulty: 3 },
      { name: "Mineral Resources", status: "not_started", difficulty: 3 },
      { name: "Conventional Energy", status: "not_started", difficulty: 2 },
      { name: "Non-Conventional Energy", status: "not_started", difficulty: 2 },
    ],
    // Units and set texts below follow the CISCE ICSE 2027 (Class X) syllabus PDFs, in syllabus order
    english_lang: [
      { name: "Composition", status: "not_started", difficulty: 3 },
      { name: "Letter - Formal", status: "not_started", difficulty: 2 },
      { name: "Letter - Friendly", status: "not_started", difficulty: 2 },
      { name: "Notice", status: "not_started", difficulty: 2 },
      { name: "E-mail", status: "not_started", difficulty: 2 },
      { name: "Comprehension - Unseen Passage", status: "not_started", difficulty: 3 },
      { name: "Summary", status: "not_started", difficulty: 3 },
      { name: "Grammar - Prepositions", status: "not_started", difficulty: 2 },
      { name: "Grammar - Conjunctions", status: "not_started", difficulty: 2 },
      { name: "Grammar - Verbs", status: "not_started", difficulty: 3 },
      { name: "Grammar - Structure of Sentences", status: "not_started", difficulty: 4 },
    ],
    english_lit: [
      { name: "Julius Caesar - Act III", status: "not_started", difficulty: 4 },
      { name: "Julius Caesar - Act IV", status: "not_started", difficulty: 3 },
      { name: "Julius Caesar - Act V", status: "not_started", difficulty: 3 },
      { name: "With the Photographer", status: "not_started", difficulty: 2 },
      { name: "The Elevator", status: "not_started", difficulty: 2 },
      { name: "The Girl Who Can", status: "not_started", difficulty: 2 },
      { name: "The Pedestrian", status: "not_started", difficulty: 3 },
      { name: "The Last Lesson", status: "not_started", difficulty: 2 },
      { name: "Haunted Houses", status: "not_started", difficulty: 3 },
      { name: "The Glove and the Lions", status: "not_started", difficulty: 2 },
      { name: "When Great Trees Fall", status: "not_started", difficulty: 3 },
      { name: "A Considerable Speck", status: "not_started", difficulty: 3 },
      { name: "The Power of Music", status: "not_started", difficulty: 2 },
    ],
    math: [
      { name: "Goods and Services Tax (GST)", status: "not_started", difficulty: 2 },
      { name: "Banking", status: "not_started", difficulty: 2 },
      { name: "Shares and Dividends", status: "not_started", difficulty: 3 },
      { name: "Linear Inequations", status: "not_started", difficulty: 2 },
      { name: "Quadratic Equations in One Variable", status: "not_started", difficulty: 3 },
      { name: "Ratio and Proportion", status: "not_started", difficulty: 3 },
      { name: "Factorisation of Polynomials", status: "not_started", difficulty: 3 },
      { name: "Matrices", status: "not_started", difficulty: 3 },
      { name: "Arithmetic and Geometric Progression", status: "not_started", difficulty: 4 },
      { name: "Co-ordinate Geometry - Reflection", status: "not_started", difficulty: 2 },
      { name: "Co-ordinate Geometry - Section and Mid-point Formula", status: "not_started", difficulty: 3 },
      { name: "Co-ordinate Geometry - Equation of a Line", status: "not_started", difficulty: 4 },
      { name: "Similarity", status: "not_started", difficulty: 3 },
      { name: "Loci", status: "not_started", difficulty: 3 },
      { name: "Circles - Angle Properties", status: "not_started", difficulty: 3 },
      { name: "Circles - Cyclic Properties", status: "not_started", difficulty: 3 },
      { name: "Circles - Tangent and Secant Properties", status: "not_started", difficulty: 4 },
      { name: "Constructions", status: "not_started", difficulty: 3 },
      { name: "Mensuration - Cylinder, Cone and Sphere", status: "not_started", difficulty: 4 },
      { name: "Trigonometry - Identities", status: "not_started", difficulty: 4 },
      { name: "Trigonometry - Heights and Distances", status: "not_started", difficulty: 4 },
      { name: "Statistics - Measures of Central Tendency", status: "not_started", difficulty: 3 },
      { name: "Statistics - Histograms and Ogive", status: "not_started", difficulty: 3 },
      { name: "Probability", status: "not_started", difficulty: 2 },
    ],
    history: [
      // Section A: Civics
      { name: "Lok Sabha", status: "not_started", difficulty: 3 },
      { name: "Rajya Sabha", status: "not_started", difficulty: 2 },
      { name: "The President", status: "not_started", difficulty: 3 },
      { name: "The Vice-President", status: "not_started", difficulty: 2 },
      { name: "Prime Minister and Council of Ministers", status: "not_started", difficulty: 3 },
      { name: "The Supreme Court", status: "not_started", difficulty: 3 },
      { name: "The High Courts", status: "not_started", difficulty: 2 },
      { name: "Subordinate Courts", status: "not_started", difficulty: 2 },
      // Section B: History
      { name: "The First War of Independence, 1857", status: "not_started", difficulty: 3 },
      { name: "Factors Leading to the Growth of Nationalism", status: "not_started", difficulty: 3 },
      { name: "Foundation of the Indian National Congress", status: "not_started", difficulty: 2 },
      { name: "First Phase of the Indian National Movement (1885-1907)", status: "not_started", difficulty: 3 },
      { name: "Second Phase of the Indian National Movement (1905-1916)", status: "not_started", difficulty: 3 },
      { name: "The Muslim League and the Lucknow Pact", status: "not_started", difficulty: 2 },
      { name: "Non-Cooperation Movement", status: "not_started", difficulty: 3 },
      { name: "Civil Disobedience Movement", status: "not_started", difficulty: 3 },
      { name: "Quit India Movement", status: "not_started", difficulty: 3 },
      { name: "Forward Bloc and INA", status: "not_started", difficulty: 2 },
      { name: "Independence and Partition of India", status: "not_started", difficulty: 4 },
      { name: "The First World War", status: "not_started", difficulty: 3 },
      { name: "Rise of Dictatorships", status: "not_started", difficulty: 3 },
      { name: "The Second World War", status: "not_started", difficulty: 3 },
      { name: "United Nations", status: "not_started", difficulty: 3 },
      { name: "Non-Aligned Movement", status: "not_started", difficulty: 2 },
    ],
  };

  // Group I and the chosen Group II subjects; Economics, Commercial Studies and the like, the second
  // language and the elective come from their CISCE 2027 syllabus (see syllabus-chapters.ts)
  const chapters: Record<string, Chapter[]> = {};
  for (const key of [...GROUP_ONE_PAPERS, ...groupTwoPapers(groupTwo)]) {
    chapters[key] = core[key] ?? syllabusChapters(key);
  }
  chapters[languageKey] = syllabusChapters(languageKey);
  chapters[electiveKey] = syllabusChapters(electiveKey);

  return chapters;
}

/**
 * Make sure every subject the student takes has a chapter list, adding the default list for any
 * that is missing or saved empty (e.g. after choosing Hindi, or for students who signed up before
 * Maths, History & Civics and English had default chapters).
 * A non-empty saved list is never replaced.
 */
export function withSubjectKeys(
  subjects: Record<string, Chapter[]> | undefined,
  languageKey: string,
  electiveKey: string,
  groupTwo?: readonly string[] | null
): Record<string, Chapter[]> {
  const next = { ...(subjects || {}) };
  for (const [key, chapters] of Object.entries(getDefaultChapters(languageKey, electiveKey, groupTwo))) {
    if (!next[key]?.length) next[key] = chapters;
  }
  return next;
}

// Static references for backward compatibility (default selections)
export const EXAMS = getExams("kannada", "computer");

export const SUBJECT_COLORS: Record<string, string> = getSubjectColors("kannada", "computer");

export const SUBJECT_LABELS: Record<string, string> = getSubjectLabels("kannada", "computer");

export const DEFAULT_CHAPTERS: Record<string, Chapter[]> = getDefaultChapters("kannada", "computer");

export const MOTIVATIONAL_QUOTES = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
  "The expert in anything was once a beginner.",
  "It always seems impossible until it's done. \u2014 Nelson Mandela",
  "Push yourself, because no one else is going to do it for you.",
  "Hard work beats talent when talent doesn't work hard.",
  "Believe you can and you're halfway there. \u2014 Theodore Roosevelt",
  "The only way to do great work is to love what you do. \u2014 Steve Jobs",
  "Your future is created by what you do today, not tomorrow.",
  "Every champion was once a contender that refused to give up.",
  "Dream big, work hard, stay focused, and surround yourself with good people.",
  "Discipline is choosing between what you want now and what you want most.",
];

export const STATUS_CYCLE = ["not_started", "in_progress", "completed", "needs_revision"] as const;
export const STATUS_LABELS: Record<string, string> = {
  not_started: "",
  in_progress: "~",
  completed: "\u2713",
  needs_revision: "!",
};

export const SECTION_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  calendar: "Calendar",
  subjects: "Subjects",
  planner: "Planner",
  coach: "AI coach",
  timer: "Timer",
  progress: "Progress",
  papers: "Practice papers",
  settings: "Settings",
  notes: "Revision notes",
  leaderboard: "Leaderboard",
  "parent-report": "Parent report",
  english: "English",
};
