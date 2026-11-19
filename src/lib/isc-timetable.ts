/*
  ISC (Class 12) Year 2027 timetable, for the public /isc page. The app itself is ICSE Class 10 only;
  this page is how ISC students get something useful and ask for the full planner.

  Published by CISCE on 10 Nov 2026. cisce.org blocks automated checks, so the dates were matched
  across The Hindu, Times of India and Careers360 copies of the official PDF (all 41 papers agree).
  Papers start writing at 2:00 pm, Art papers at 9:00 am (The Hindu and Times of India), after 15
  minutes of reading time. Every paper is 3 hours. Practicals are set by each school, so they are not here.
*/

export interface IscSubject {
  key: string;
  name: string;
}

export interface IscPaper {
  key: string;
  /** The IscSubject this paper belongs to: picking the subject picks all its papers */
  subject: string;
  name: string;
  /** YYYY-MM-DD, India time */
  date: string;
  /** Writing starts, India time (24h) */
  start: "09:00" | "14:00";
  hours: number;
}

/** Picker order: English first, then the usual Science, Commerce and Humanities subjects, then the rest */
export const ISC_SUBJECTS: IscSubject[] = [
  { key: "english", name: "English" },
  { key: "physics", name: "Physics" },
  { key: "chemistry", name: "Chemistry" },
  { key: "mathematics", name: "Mathematics" },
  { key: "biology", name: "Biology" },
  { key: "computer_science", name: "Computer Science" },
  { key: "accountancy", name: "Accountancy" },
  { key: "commerce", name: "Commerce" },
  { key: "business_studies", name: "Business Studies" },
  { key: "economics", name: "Economics" },
  { key: "history", name: "History" },
  { key: "political_science", name: "Political Science" },
  { key: "geography", name: "Geography" },
  { key: "psychology", name: "Psychology" },
  { key: "sociology", name: "Sociology" },
  { key: "legal_studies", name: "Legal Studies" },
  { key: "mass_media", name: "Mass Media & Communication" },
  { key: "physical_education", name: "Physical Education" },
  { key: "language", name: "A language (Hindi, Bengali, French…)" },
  { key: "elective_english", name: "Elective English" },
  { key: "applied_mathematics", name: "Applied Mathematics" },
  { key: "environmental_science", name: "Environmental Science" },
  { key: "biotechnology", name: "Biotechnology" },
  { key: "home_science", name: "Home Science" },
  { key: "fashion_designing", name: "Fashion Designing" },
  { key: "art", name: "Art" },
  { key: "hindustani_music", name: "Indian Music (Hindustani)" },
  { key: "western_music", name: "Western Music" },
  { key: "hospitality", name: "Hospitality Management" },
  { key: "artificial_intelligence", name: "Artificial Intelligence" },
  { key: "robotics", name: "Robotics" },
  { key: "electricity_electronics", name: "Electricity and Electronics" },
  { key: "building_drawing", name: "Geometrical and Building Drawing" },
  { key: "mechanical_drawing", name: "Geometrical and Mechanical Drawing" },
  { key: "modern_english", name: "Modern English" },
];

const paper = (date: string, subject: string, name: string, start: IscPaper["start"] = "14:00", key = subject): IscPaper => ({
  key,
  subject,
  name,
  date,
  start,
  hours: 3,
});

/** Every ISC 2027 theory paper, in the order they are written */
export const ISC_PAPERS: IscPaper[] = [
  paper("2027-02-09", "environmental_science", "Environmental Science"),
  paper("2027-02-09", "western_music", "Western Music (theory)"),
  paper("2027-02-10", "english", "English Language", "14:00", "english_1"),
  paper("2027-02-10", "modern_english", "Modern English Language", "14:00", "modern_english_1"),
  paper("2027-02-12", "applied_mathematics", "Applied Mathematics"),
  paper("2027-02-12", "robotics", "Robotics (theory)"),
  paper("2027-02-12", "building_drawing", "Geometrical and Building Drawing"),
  paper("2027-02-12", "biotechnology", "Biotechnology"),
  paper("2027-02-13", "art", "Art 1: Still life", "09:00", "art_1"),
  paper("2027-02-15", "english", "English Literature", "14:00", "english_2"),
  paper("2027-02-16", "modern_english", "Modern English Literature", "14:00", "modern_english_2"),
  paper("2027-02-18", "economics", "Economics"),
  paper("2027-02-22", "language", "Indian and foreign languages"),
  paper("2027-02-24", "chemistry", "Chemistry (theory)"),
  paper("2027-02-26", "accountancy", "Accountancy"),
  paper("2027-02-27", "art", "Art 2: Nature", "09:00", "art_2"),
  paper("2027-03-01", "mathematics", "Mathematics"),
  paper("2027-03-03", "physical_education", "Physical Education"),
  paper("2027-03-04", "home_science", "Home Science (theory)"),
  paper("2027-03-04", "hindustani_music", "Indian Music, Hindustani (theory)"),
  paper("2027-03-08", "physics", "Physics (theory)"),
  paper("2027-03-09", "mass_media", "Mass Media & Communication"),
  paper("2027-03-11", "business_studies", "Business Studies"),
  paper("2027-03-12", "geography", "Geography"),
  paper("2027-03-13", "art", "Art 4: Composition", "09:00", "art_4"),
  paper("2027-03-15", "biology", "Biology (theory)"),
  paper("2027-03-17", "computer_science", "Computer Science (theory)"),
  paper("2027-03-19", "history", "History"),
  paper("2027-03-20", "art", "Art 5: Crafts", "09:00", "art_5"),
  paper("2027-03-24", "art", "Art 3: Living person", "09:00", "art_3"),
  paper("2027-03-25", "sociology", "Sociology"),
  paper("2027-03-29", "commerce", "Commerce"),
  paper("2027-03-31", "psychology", "Psychology"),
  paper("2027-04-02", "political_science", "Political Science"),
  paper("2027-04-03", "fashion_designing", "Fashion Designing (theory)"),
  paper("2027-04-03", "mechanical_drawing", "Geometrical and Mechanical Drawing"),
  paper("2027-04-05", "artificial_intelligence", "Artificial Intelligence (theory)"),
  paper("2027-04-05", "hospitality", "Hospitality Management"),
  paper("2027-04-05", "electricity_electronics", "Electricity and Electronics"),
  paper("2027-04-06", "elective_english", "Elective English"),
  paper("2027-04-08", "legal_studies", "Legal Studies"),
];

/** Candidates are seated 30 minutes before writing starts; reading time is the 15 minutes before it */
export const ISC_SEATED_BY: Record<IscPaper["start"], string> = { "09:00": "08:30", "14:00": "13:30" };

/** When writing starts, as an exact moment (the timetable is in India time wherever the student is) */
export function iscPaperStart(p: Pick<IscPaper, "date" | "start">): Date {
  return new Date(`${p.date}T${p.start}:00+05:30`);
}

/**
 * The papers for the picked subjects, or every paper when nothing is picked. Picks saved on the
 * device that match no paper (a subject renamed later) are ignored.
 */
export function papersFor(papers: IscPaper[], picked: string[]): IscPaper[] {
  const mine = papers.filter((p) => picked.includes(p.subject));
  return mine.length === 0 ? papers : mine;
}

/** The next paper to be written: the first of the student's papers that hasn't started yet */
export function nextIscPaper(papers: IscPaper[], picked: string[], now: Date): IscPaper | null {
  return papersFor(papers, picked).find((p) => iscPaperStart(p) > now) ?? null;
}
