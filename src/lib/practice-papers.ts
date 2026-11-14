export interface PracticePaper {
  id: string;
  subject: string;
  year: number;
  type: "board" | "specimen" | "practice";
  title: string;
  url: string;
  source: "respaper" | "cisce";
}

const BASE = "https://www.respaper.com";
const CISCE = "https://cisceboard.org/pdf/ICSE-Class-X-Specimen-Question-Papers-2017";

export const PRACTICE_PAPERS: PracticePaper[] = [
  // Only verified papers: uploads by ResPaper's official "icse" account, or board papers featured in its
  // ICSE section (Board Exam / Board Specimen lists). User uploads titled "Board Exam" were often school
  // prelims or other subjects, so they are not used. Re-checked 14 Nov 2026; labels come from each page.
  // ── Mathematics ──
  { id: "math_2026_board_r1", subject: "math", year: 2026, type: "board", title: "Mathematics Board Exam 2026", url: `${BASE}/nybnrj/9614-pdf.html`, source: "respaper" },
  { id: "math_2025_board_r1", subject: "math", year: 2025, type: "board", title: "Mathematics Board Exam 2025", url: `${BASE}/abhijeet2771/2772-pdf.html`, source: "respaper" },
  { id: "math_2025_specimen_r1", subject: "math", year: 2025, type: "specimen", title: "Mathematics Specimen Paper 2025", url: `${BASE}/icse/159/2912-pdf.html`, source: "respaper" },
  { id: "math_2024_specimen_r1", subject: "math", year: 2024, type: "specimen", title: "Mathematics Specimen Paper 2024", url: `${BASE}/icse/159/4925-pdf.html`, source: "respaper" },
  { id: "math_2023_board_1", subject: "math", year: 2023, type: "board", title: "Mathematics Board Exam 2023", url: `${BASE}/apurvsoni/3514-pdf.html`, source: "respaper" },
  { id: "math_2023_specimen_r1", subject: "math", year: 2023, type: "specimen", title: "Mathematics Specimen Paper 2023", url: `${BASE}/icse/159/2768-pdf.html`, source: "respaper" },
  // ── Physics ──
  { id: "physics_2026_specimen_1", subject: "physics", year: 2026, type: "specimen", title: "Physics Specimen Paper 2026", url: `${BASE}/ujaan/730-pdf.html`, source: "respaper" },
  { id: "physics_2025_specimen_r1", subject: "physics", year: 2025, type: "specimen", title: "Physics Specimen Paper 2025", url: `${BASE}/icse/159/6086-pdf.html`, source: "respaper" },
  { id: "physics_2024_board_2", subject: "physics", year: 2024, type: "board", title: "Physics Board Exam 2024", url: `${BASE}/sagnik2008/6651-pdf.html`, source: "respaper" },
  { id: "physics_2024_specimen_r1", subject: "physics", year: 2024, type: "specimen", title: "Physics Specimen Paper 2024", url: `${BASE}/icse/159/9112-pdf.html`, source: "respaper" },
  { id: "physics_2023_specimen_r1", subject: "physics", year: 2023, type: "specimen", title: "Physics Specimen Paper 2023", url: `${BASE}/icse/159/7552-pdf.html`, source: "respaper" },
  // ── Chemistry ──
  { id: "chemistry_2025_specimen_r1", subject: "chemistry", year: 2025, type: "specimen", title: "Chemistry Specimen Paper 2025", url: `${BASE}/icse/159/3723-pdf.html`, source: "respaper" },
  { id: "chemistry_2024_board_1", subject: "chemistry", year: 2024, type: "board", title: "Chemistry Board Exam 2024", url: `${BASE}/surajit1968/7871-pdf.html`, source: "respaper" },
  { id: "chemistry_2024_specimen_r1", subject: "chemistry", year: 2024, type: "specimen", title: "Chemistry Specimen Paper 2024", url: `${BASE}/icse/159/8279-pdf.html`, source: "respaper" },
  { id: "chemistry_2023_specimen_r1", subject: "chemistry", year: 2023, type: "specimen", title: "Chemistry Specimen Paper 2023", url: `${BASE}/icse/159/6296-pdf.html`, source: "respaper" },
  // ── Biology ──
  { id: "biology_2025_board_2", subject: "biology", year: 2025, type: "board", title: "Biology Board Exam 2025", url: `${BASE}/amit2911/5110-pdf.html`, source: "respaper" },
  { id: "biology_2025_specimen_r1", subject: "biology", year: 2025, type: "specimen", title: "Biology Specimen Paper 2025", url: `${BASE}/icse/159/5230-pdf.html`, source: "respaper" },
  { id: "biology_2024_board_r1", subject: "biology", year: 2024, type: "board", title: "Biology Board Exam 2024", url: `${BASE}/surajit1968/2002-pdf.html`, source: "respaper" },
  { id: "biology_2024_specimen_r1", subject: "biology", year: 2024, type: "specimen", title: "Biology Specimen Paper 2024", url: `${BASE}/icse/159/5869-pdf.html`, source: "respaper" },
  { id: "biology_2023_board_1", subject: "biology", year: 2023, type: "board", title: "Biology Board Exam 2023", url: `${BASE}/hardik5425/5806-pdf.html`, source: "respaper" },
  { id: "biology_2023_specimen_r1", subject: "biology", year: 2023, type: "specimen", title: "Biology Specimen Paper 2023", url: `${BASE}/icse/159/263-pdf.html`, source: "respaper" },
  // ── History & Civics ──
  { id: "history_2025_board_1", subject: "history", year: 2025, type: "board", title: "History & Civics Board Exam 2025", url: `${BASE}/devik_10/6395-pdf.html`, source: "respaper" },
  { id: "history_2025_specimen_r1", subject: "history", year: 2025, type: "specimen", title: "History & Civics Specimen Paper 2025", url: `${BASE}/icse/159/4887-pdf.html`, source: "respaper" },
  { id: "history_2024_board_r1", subject: "history", year: 2024, type: "board", title: "History & Civics Board Exam 2024", url: `${BASE}/logiuse5677/768/5129-pdf.html`, source: "respaper" },
  { id: "history_2024_specimen_r1", subject: "history", year: 2024, type: "specimen", title: "History & Civics Specimen Paper 2024", url: `${BASE}/icse/159/9125-pdf.html`, source: "respaper" },
  { id: "history_2023_board_2", subject: "history", year: 2023, type: "board", title: "History & Civics Board Exam 2023", url: `${BASE}/aryan_7/5417-pdf.html`, source: "respaper" },
  { id: "history_2023_specimen_r1", subject: "history", year: 2023, type: "specimen", title: "History & Civics Specimen Paper 2023", url: `${BASE}/icse/159/1489-pdf.html`, source: "respaper" },
  // ── Geography ──
  { id: "geography_2025_board_r1", subject: "geography", year: 2025, type: "board", title: "Geography Board Exam 2025", url: `${BASE}/matke1234/3956-pdf.html`, source: "respaper" },
  { id: "geography_2025_specimen_r1", subject: "geography", year: 2025, type: "specimen", title: "Geography Specimen Paper 2025", url: `${BASE}/icse/159/5669-pdf.html`, source: "respaper" },
  { id: "geography_2024_board_1", subject: "geography", year: 2024, type: "board", title: "Geography Board Exam 2024", url: `${BASE}/anikam/9132-pdf.html`, source: "respaper" },
  { id: "geography_2024_specimen_r1", subject: "geography", year: 2024, type: "specimen", title: "Geography Specimen Paper 2024", url: `${BASE}/icse/159/6101-pdf.html`, source: "respaper" },
  { id: "geography_2023_board_1", subject: "geography", year: 2023, type: "board", title: "Geography Board Exam 2023", url: `${BASE}/sirdksaraf/3112-pdf.html`, source: "respaper" },
  { id: "geography_2023_specimen_r1", subject: "geography", year: 2023, type: "specimen", title: "Geography Specimen Paper 2023", url: `${BASE}/icse/159/7832-pdf.html`, source: "respaper" },
  // ── English Language ──
  { id: "english_lang_2025_board_r1", subject: "english_lang", year: 2025, type: "board", title: "English Language Board Exam 2025", url: `${BASE}/iyla/4720-pdf.html`, source: "respaper" },
  { id: "english_lang_2025_specimen_r1", subject: "english_lang", year: 2025, type: "specimen", title: "English Language Specimen Paper 2025", url: `${BASE}/icse/159/4965-pdf.html`, source: "respaper" },
  { id: "english_lang_2024_board_r1", subject: "english_lang", year: 2024, type: "board", title: "English Language Board Exam 2024", url: `${BASE}/divv60/9132-pdf.html`, source: "respaper" },
  { id: "english_lang_2024_specimen_r1", subject: "english_lang", year: 2024, type: "specimen", title: "English Language Specimen Paper 2024", url: `${BASE}/icse/159/2327-pdf.html`, source: "respaper" },
  { id: "english_lang_2023_board_r1", subject: "english_lang", year: 2023, type: "board", title: "English Language Board Exam 2023", url: `${BASE}/gargimunjal/2510-pdf.html`, source: "respaper" },
  { id: "english_lang_2023_specimen_r1", subject: "english_lang", year: 2023, type: "specimen", title: "English Language Specimen Paper 2023", url: `${BASE}/icse/916/7256-pdf.html`, source: "respaper" },
  // ── English Literature ──
  { id: "english_lit_2026_board_r1", subject: "english_lit", year: 2026, type: "board", title: "English Literature Board Exam 2026", url: `${BASE}/hackor1421/727-pdf.html`, source: "respaper" },
  { id: "english_lit_2025_board_r1", subject: "english_lit", year: 2025, type: "board", title: "English Literature Board Exam 2025", url: `${BASE}/raeed/2911-pdf.html`, source: "respaper" },
  { id: "english_lit_2025_specimen_r1", subject: "english_lit", year: 2025, type: "specimen", title: "English Literature Specimen Paper 2025", url: `${BASE}/icse/159/9709-pdf.html`, source: "respaper" },
  { id: "english_lit_2024_board_r1", subject: "english_lit", year: 2024, type: "board", title: "English Literature Board Exam 2024", url: `${BASE}/logiuse5677/768/7352-pdf.html`, source: "respaper" },
  { id: "english_lit_2024_specimen_r1", subject: "english_lit", year: 2024, type: "specimen", title: "English Literature Specimen Paper 2024", url: `${BASE}/icse/159/9837-pdf.html`, source: "respaper" },
  { id: "english_lit_2023_board_r1", subject: "english_lit", year: 2023, type: "board", title: "English Literature Board Exam 2023", url: `${BASE}/gargimunjal/2785-pdf.html`, source: "respaper" },
  { id: "english_lit_2023_specimen_r1", subject: "english_lit", year: 2023, type: "specimen", title: "English Literature Specimen Paper 2023", url: `${BASE}/icse/159/5378-pdf.html`, source: "respaper" },
  // ── Hindi ──
  { id: "hindi_2025_board_1", subject: "hindi", year: 2025, type: "board", title: "Hindi Board Exam 2025", url: `${BASE}/dishes4u/9091-pdf.html`, source: "respaper" },
  { id: "hindi_2023_specimen_r1", subject: "hindi", year: 2023, type: "specimen", title: "Hindi Specimen Paper 2023", url: `${BASE}/icse/159/4875-pdf.html`, source: "respaper" },
  // ── Kannada ──
  { id: "kannada_2023_specimen_r1", subject: "kannada", year: 2023, type: "specimen", title: "Kannada Specimen Paper 2023", url: `${BASE}/icse/159/3738-pdf.html`, source: "respaper" },
  // ── Tamil ──
  { id: "tamil_2023_board_r1", subject: "tamil", year: 2023, type: "board", title: "Tamil Board Exam 2023", url: `${BASE}/papersexchange/4895-pdf.html`, source: "respaper" },
  { id: "tamil_2023_specimen_r1", subject: "tamil", year: 2023, type: "specimen", title: "Tamil Specimen Paper 2023", url: `${BASE}/icse/159/8645-pdf.html`, source: "respaper" },
  // ── Telugu ──
  { id: "telugu_2023_specimen_r1", subject: "telugu", year: 2023, type: "specimen", title: "Telugu Specimen Paper 2023", url: `${BASE}/icse/159/6765-pdf.html`, source: "respaper" },
  // ── Bengali ──
  { id: "bengali_2024_board_r1", subject: "bengali", year: 2024, type: "board", title: "Bengali Board Exam 2024", url: `${BASE}/h4unter65434/6227-pdf.html`, source: "respaper" },
  { id: "bengali_2023_board_r1", subject: "bengali", year: 2023, type: "board", title: "Bengali Board Exam 2023", url: `${BASE}/shubhadeep385/24/9773-pdf.html`, source: "respaper" },
  // ── Malayalam ──
  { id: "malayalam_2023_specimen_r1", subject: "malayalam", year: 2023, type: "specimen", title: "Malayalam Specimen Paper 2023", url: `${BASE}/icse/159/6327-pdf.html`, source: "respaper" },
  // ── Marathi ──
  { id: "marathi_2025_board_r1", subject: "marathi", year: 2025, type: "board", title: "Marathi Board Exam 2025", url: `${BASE}/anonymoususer123/2705-zip.html`, source: "respaper" },
  { id: "marathi_2023_specimen_r1", subject: "marathi", year: 2023, type: "specimen", title: "Marathi Specimen Paper 2023", url: `${BASE}/icse/159/9472-pdf.html`, source: "respaper" },
  // ── Punjabi ──
  { id: "punjabi_2023_specimen_r1", subject: "punjabi", year: 2023, type: "specimen", title: "Punjabi Specimen Paper 2023", url: `${BASE}/icse/159/2435-pdf.html`, source: "respaper" },
  // ── Sanskrit ──
  { id: "sanskrit_2023_specimen_r1", subject: "sanskrit", year: 2023, type: "specimen", title: "Sanskrit Specimen Paper 2023", url: `${BASE}/icse/159/5112-pdf.html`, source: "respaper" },
  // ── French ──
  { id: "french_2023_specimen_r1", subject: "french", year: 2023, type: "specimen", title: "French Specimen Paper 2023", url: `${BASE}/icse/159/2848-pdf.html`, source: "respaper" },
  // ── German ──
  { id: "german_2023_specimen_r1", subject: "german", year: 2023, type: "specimen", title: "German Specimen Paper 2023", url: `${BASE}/icse/159/8950-pdf.html`, source: "respaper" },
  // ── Computer Applications ──
  { id: "computer_2025_specimen_1", subject: "computer", year: 2025, type: "specimen", title: "Computer Applications Specimen Paper 2025", url: `${BASE}/promaicse/6190-pdf.html`, source: "respaper" },
  { id: "computer_2024_specimen_r1", subject: "computer", year: 2024, type: "specimen", title: "Computer Applications Specimen Paper 2024", url: `${BASE}/icse/159/3785-pdf.html`, source: "respaper" },
  { id: "computer_2023_board_1", subject: "computer", year: 2023, type: "board", title: "Computer Applications Board Exam 2023", url: `${BASE}/shubhadeep385/27/7568-pdf.html`, source: "respaper" },
  { id: "computer_2023_specimen_1", subject: "computer", year: 2023, type: "specimen", title: "Computer Applications Specimen Paper 2023", url: `${BASE}/jwiiick88/6348-pdf.html`, source: "respaper" },
  // ── Commercial Studies ──
  { id: "commercial_2025_specimen_r1", subject: "commercial", year: 2025, type: "specimen", title: "Commercial Studies Specimen Paper 2025", url: `${BASE}/icse/159/3352-pdf.html`, source: "respaper" },
  { id: "commercial_2024_specimen_r1", subject: "commercial", year: 2024, type: "specimen", title: "Commercial Studies Specimen Paper 2024", url: `${BASE}/icse/159/8113-pdf.html`, source: "respaper" },
  { id: "commercial_2023_specimen_r1", subject: "commercial", year: 2023, type: "specimen", title: "Commercial Studies Specimen Paper 2023", url: `${BASE}/icse/159/7077-pdf.html`, source: "respaper" },
  // ── Economics ──
  { id: "economics_2025_specimen_r1", subject: "economics", year: 2025, type: "specimen", title: "Economics Specimen Paper 2025", url: `${BASE}/icse/159/4293-pdf.html`, source: "respaper" },
  { id: "economics_2024_specimen_r1", subject: "economics", year: 2024, type: "specimen", title: "Economics Specimen Paper 2024", url: `${BASE}/icse/159/1138-pdf.html`, source: "respaper" },
  // ── Environmental Science ──
  { id: "env_science_2025_specimen_r1", subject: "env_science", year: 2025, type: "specimen", title: "Environmental Science Specimen Paper 2025", url: `${BASE}/icse/159/9784-pdf.html`, source: "respaper" },
  { id: "env_science_2024_specimen_r1", subject: "env_science", year: 2024, type: "specimen", title: "Environmental Science Specimen Paper 2024", url: `${BASE}/icse/159/5727-pdf.html`, source: "respaper" },
  { id: "env_science_2023_specimen_r1", subject: "env_science", year: 2023, type: "specimen", title: "Environmental Science Specimen Paper 2023", url: `${BASE}/icse/159/2026-pdf.html`, source: "respaper" },
  // ── Physical Education ──
  { id: "physical_ed_2025_specimen_r1", subject: "physical_ed", year: 2025, type: "specimen", title: "Physical Education Specimen Paper 2025", url: `${BASE}/icse/159/5276-pdf.html`, source: "respaper" },
  { id: "physical_ed_2024_specimen_r1", subject: "physical_ed", year: 2024, type: "specimen", title: "Physical Education Specimen Paper 2024", url: `${BASE}/icse/159/3679-pdf.html`, source: "respaper" },
  { id: "physical_ed_2023_specimen_r1", subject: "physical_ed", year: 2023, type: "specimen", title: "Physical Education Specimen Paper 2023", url: `${BASE}/icse/159/9612-pdf.html`, source: "respaper" },
  // ── Economic Applications ──
  { id: "economic_app_2025_specimen_r1", subject: "economic_app", year: 2025, type: "specimen", title: "Economic Applications Specimen Paper 2025", url: `${BASE}/icse/159/7045-pdf.html`, source: "respaper" },
  { id: "economic_app_2024_specimen_r1", subject: "economic_app", year: 2024, type: "specimen", title: "Economic Applications Specimen Paper 2024", url: `${BASE}/icse/159/4086-pdf.html`, source: "respaper" },
  { id: "economic_app_2023_board_r1", subject: "economic_app", year: 2023, type: "board", title: "Economic Applications Board Exam 2023", url: `${BASE}/topper18/3406-zip.html`, source: "respaper" },
  { id: "economic_app_2023_specimen_r1", subject: "economic_app", year: 2023, type: "specimen", title: "Economic Applications Specimen Paper 2023", url: `${BASE}/icse/159/2109-pdf.html`, source: "respaper" },
  // ── Commercial Applications ──
  { id: "commercial_app_2025_specimen_r1", subject: "commercial_app", year: 2025, type: "specimen", title: "Commercial Applications Specimen Paper 2025", url: `${BASE}/icse/159/6776-pdf.html`, source: "respaper" },
  { id: "commercial_app_2024_specimen_r1", subject: "commercial_app", year: 2024, type: "specimen", title: "Commercial Applications Specimen Paper 2024", url: `${BASE}/icse/159/2808-pdf.html`, source: "respaper" },
  { id: "commercial_app_2023_specimen_r1", subject: "commercial_app", year: 2023, type: "specimen", title: "Commercial Applications Specimen Paper 2023", url: `${BASE}/icse/159/9527-pdf.html`, source: "respaper" },
  // ── Home Science ──
  { id: "home_science_2025_specimen_r1", subject: "home_science", year: 2025, type: "specimen", title: "Home Science Specimen Paper 2025", url: `${BASE}/icse/159/6436-pdf.html`, source: "respaper" },
  { id: "home_science_2024_specimen_r1", subject: "home_science", year: 2024, type: "specimen", title: "Home Science Specimen Paper 2024", url: `${BASE}/icse/159/2552-pdf.html`, source: "respaper" },
  { id: "home_science_2023_specimen_r1", subject: "home_science", year: 2023, type: "specimen", title: "Home Science Specimen Paper 2023", url: `${BASE}/icse/159/8404-pdf.html`, source: "respaper" },
  // ── Fashion Designing ──
  { id: "fashion_2025_board_r1", subject: "fashion", year: 2025, type: "board", title: "Fashion Designing Board Exam 2025", url: `${BASE}/abhijeet2771/2773-pdf.html`, source: "respaper" },
  { id: "fashion_2025_specimen_r1", subject: "fashion", year: 2025, type: "specimen", title: "Fashion Designing Specimen Paper 2025", url: `${BASE}/icse/159/1530-pdf.html`, source: "respaper" },
  { id: "fashion_2024_specimen_r1", subject: "fashion", year: 2024, type: "specimen", title: "Fashion Designing Specimen Paper 2024", url: `${BASE}/icse/159/2404-pdf.html`, source: "respaper" },
  { id: "fashion_2023_specimen_r1", subject: "fashion", year: 2023, type: "specimen", title: "Fashion Designing Specimen Paper 2023", url: `${BASE}/icse/159/4978-pdf.html`, source: "respaper" },
  // ── Cookery ──
  { id: "cookery_2025_specimen_r1", subject: "cookery", year: 2025, type: "specimen", title: "Cookery Specimen Paper 2025", url: `${BASE}/icse/159/1189-pdf.html`, source: "respaper" },
  { id: "cookery_2024_specimen_r1", subject: "cookery", year: 2024, type: "specimen", title: "Cookery Specimen Paper 2024", url: `${BASE}/icse/159/7546-pdf.html`, source: "respaper" },
  { id: "cookery_2023_specimen_r1", subject: "cookery", year: 2023, type: "specimen", title: "Cookery Specimen Paper 2023", url: `${BASE}/icse/159/7964-pdf.html`, source: "respaper" },
  // ── Robotics & AI ──
  { id: "robotics_ai_2025_specimen_r1", subject: "robotics_ai", year: 2025, type: "specimen", title: "Robotics & AI Specimen Paper 2025", url: `${BASE}/icse/159/8492-pdf.html`, source: "respaper" },
  // ── CISCE specimen papers (2017, older syllabus) ──
  { id: "english_lang_2017_specimen_1", subject: "english_lang", year: 2017, type: "specimen", title: "English Language Specimen Paper 2017", url: `${CISCE}/English%20Language%20(English%20Paper%20-%201).pdf`, source: "cisce" },
  { id: "english_lit_2017_specimen_1", subject: "english_lit", year: 2017, type: "specimen", title: "English Literature Specimen Paper 2017", url: `${CISCE}/Literature%20in%20English%20(English%20Paper%20-%202).pdf`, source: "cisce" },
  { id: "hindi_2017_specimen_1", subject: "hindi", year: 2017, type: "specimen", title: "Hindi Specimen Paper 2017", url: `${CISCE}/Hindi.pdf`, source: "cisce" },
  { id: "sanskrit_2017_specimen_1", subject: "sanskrit", year: 2017, type: "specimen", title: "Sanskrit Specimen Paper 2017", url: `${CISCE}/Sanskrit.pdf`, source: "cisce" },
  { id: "french_2017_specimen_1", subject: "french", year: 2017, type: "specimen", title: "French Specimen Paper 2017", url: `${CISCE}/French%20(Group%201).pdf`, source: "cisce" },
  { id: "german_2017_specimen_1", subject: "german", year: 2017, type: "specimen", title: "German Specimen Paper 2017", url: `${CISCE}/German%20(Group%201).pdf`, source: "cisce" },
  { id: "history_2017_specimen_1", subject: "history", year: 2017, type: "specimen", title: "History & Civics Specimen Paper 2017", url: `${CISCE}/History_Civics(HCG%20Paper-1)-2014.pdf`, source: "cisce" },
  { id: "geography_2017_specimen_1", subject: "geography", year: 2017, type: "specimen", title: "Geography Specimen Paper 2017", url: `${CISCE}/Geography%20(HCG%20Paper%20-%202).pdf`, source: "cisce" },
  { id: "math_2017_specimen_1", subject: "math", year: 2017, type: "specimen", title: "Mathematics Specimen Paper 2017", url: `${CISCE}/Mathematics.pdf`, source: "cisce" },
  { id: "physics_2017_specimen_1", subject: "physics", year: 2017, type: "specimen", title: "Physics Specimen Paper 2017", url: `${CISCE}/Physics%20(Science%20Paper%20-%201).pdf`, source: "cisce" },
  { id: "chemistry_2017_specimen_1", subject: "chemistry", year: 2017, type: "specimen", title: "Chemistry Specimen Paper 2017", url: `${CISCE}/Chemistry%20(Science%20Paper%202).pdf`, source: "cisce" },
  { id: "biology_2017_specimen_1", subject: "biology", year: 2017, type: "specimen", title: "Biology Specimen Paper 2017", url: `${CISCE}/Biology%20(Science%20Paper%203).pdf`, source: "cisce" },
  { id: "economics_2017_specimen_1", subject: "economics", year: 2017, type: "specimen", title: "Economics Specimen Paper 2017", url: `${CISCE}/Economics.pdf`, source: "cisce" },
  { id: "commercial_2017_specimen_1", subject: "commercial", year: 2017, type: "specimen", title: "Commercial Studies Specimen Paper 2017", url: `${CISCE}/Commercial%20Studies.pdf`, source: "cisce" },
  { id: "env_science_2017_specimen_1", subject: "env_science", year: 2017, type: "specimen", title: "Environmental Science Specimen Paper 2017", url: `${CISCE}/Environmental%20Science.pdf`, source: "cisce" },
  { id: "computer_2017_specimen_1", subject: "computer", year: 2017, type: "specimen", title: "Computer Applications Specimen Paper 2017", url: `${CISCE}/Computer%20Applications.pdf`, source: "cisce" },
  { id: "physical_ed_2017_specimen_1", subject: "physical_ed", year: 2017, type: "specimen", title: "Physical Education Specimen Paper 2017", url: `${CISCE}/Physical%20Education.pdf`, source: "cisce" },
  { id: "home_science_2017_specimen_1", subject: "home_science", year: 2017, type: "specimen", title: "Home Science Specimen Paper 2017", url: `${CISCE}/Home%20Science%20(Revised).pdf`, source: "cisce" },
  { id: "fashion_2017_specimen_1", subject: "fashion", year: 2017, type: "specimen", title: "Fashion Designing Specimen Paper 2017", url: `${CISCE}/Fashion%20Designing.pdf`, source: "cisce" },
  { id: "cookery_2017_specimen_1", subject: "cookery", year: 2017, type: "specimen", title: "Cookery Specimen Paper 2017", url: `${CISCE}/Cookery.pdf`, source: "cisce" },
  { id: "bengali_2017_specimen_1", subject: "bengali", year: 2017, type: "specimen", title: "Bengali Specimen Paper 2017", url: `${CISCE}/Bengali.pdf`, source: "cisce" },
  { id: "kannada_2017_specimen_1", subject: "kannada", year: 2017, type: "specimen", title: "Kannada Specimen Paper 2017", url: `${CISCE}/Kannada.pdf`, source: "cisce" },
  { id: "malayalam_2017_specimen_1", subject: "malayalam", year: 2017, type: "specimen", title: "Malayalam Specimen Paper 2017", url: `${CISCE}/Malyalam.pdf`, source: "cisce" },
  { id: "punjabi_2017_specimen_1", subject: "punjabi", year: 2017, type: "specimen", title: "Punjabi Specimen Paper 2017", url: `${CISCE}/Punjabi.pdf`, source: "cisce" },
];

/** Get all unique subject keys that have papers */
export function getAllSubjectsWithPapers(): string[] {
  const keys = new Set(PRACTICE_PAPERS.map((p) => p.subject));
  return Array.from(keys);
}

/** Get papers filtered to a set of subject keys */
export function getPapersForSubjects(subjectKeys: string[]): PracticePaper[] {
  return PRACTICE_PAPERS.filter((p) => subjectKeys.includes(p.subject));
}

/** Get distinct years available across all papers */
export function getAvailableYears(): number[] {
  const years = new Set(PRACTICE_PAPERS.map((p) => p.year));
  return Array.from(years).sort((a, b) => b - a);
}
