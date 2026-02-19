export interface WhatsNewEntry {
  version: string;
  date: string;
  emoji: string;
  title: string;
  description: string;
  link?: string;
}

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    version: "2026-01-20-smart-scheduling",
    date: "Jan 20, 2026",
    emoji: "\u{1F4C5}",
    title: "Smart Study Scheduling",
    description:
      "Your study plan now auto-schedules sessions weighted by subject difficulty and skips chapters you've already completed.",
    link: "/dashboard",
  },
  {
    version: "2026-01-25-ai-coach",
    date: "Jan 25, 2026",
    emoji: "\u{1F9E0}",
    title: "AI Study Coach",
    description:
      "Chat with your personal AI coach for free! Get explanations, study tips, and plan adjustments — all tailored to your progress.",
    link: "/dashboard/ai-coach",
  },
  {
    version: "2026-02-01-practice-papers",
    date: "Feb 1, 2026",
    emoji: "\u{1F4DD}",
    title: "CISCE Practice Papers",
    description:
      "Access real CISCE specimen papers from 2017 onwards. Practice with actual exam questions and track which papers you've solved.",
    link: "/dashboard/papers",
  },
  {
    version: "2026-02-05-free-grammar-drills",
    date: "Feb 5, 2026",
    emoji: "\u{1F4DA}",
    title: "Free Grammar Drills",
    description:
      "Practice grammar exercises powered by AI — no API key needed anymore. Drills now track your score so you can see improvement over time.",
    link: "/dashboard/english",
  },
  {
    version: "2026-02-10-push-notifications",
    date: "Feb 10, 2026",
    emoji: "\u{1F514}",
    title: "Study Reminders",
    description:
      "Enable push notifications to get gentle reminders for your study sessions. Never miss a scheduled block again!",
    link: "/dashboard/settings",
  },
  {
    version: "2026-02-15-grammar-fix",
    date: "Feb 15, 2026",
    emoji: "\u{2728}",
    title: "Smarter Grammar Practice",
    description:
      "Grammar drills no longer repeat the same questions back-to-back. You'll get a fresh mix every time you practice.",
    link: "/dashboard/english",
  },
  {
    version: "2026-02-16-streak-recovery",
    date: "Feb 16, 2026",
    emoji: "\u{1F525}",
    title: "Streak Recovery",
    description:
      "Missed a day? Don't panic! Study 2x your target today to recover your streak. Look for the amber banner on your dashboard.",
    link: "/dashboard",
  },
  {
    version: "2026-02-16-progress-bar",
    date: "Feb 16, 2026",
    emoji: "\u{1F4CA}",
    title: "Daily Progress Bar",
    description:
      "A color-coded bar now sits below the topbar on every page — red, yellow, or green based on how close you are to your daily goal.",
    link: "/dashboard",
  },
  {
    version: "2026-02-16-confetti",
    date: "Feb 16, 2026",
    emoji: "\u{1F389}",
    title: "Milestone Celebrations",
    description:
      "Complete a chapter, hit a streak milestone (7, 14, 30 days), or ace a grammar category — and confetti will rain down!",
  },
  {
    version: "2026-02-16-smart-recs",
    date: "Feb 16, 2026",
    emoji: "\u{1F9E0}",
    title: "Smart Recommendations",
    description:
      "Your dashboard now shows weak subjects, grammar categories below 60%, and revision-due chapters — all with quick links to study.",
    link: "/dashboard",
  },
  {
    version: "2026-02-16-live-countdown",
    date: "Feb 16, 2026",
    emoji: "\u{23F0}",
    title: "Live Exam Countdown",
    description:
      "The exam countdown now ticks every second with days, hours, minutes and seconds. Plus a compact countdown in the sidebar!",
    link: "/dashboard",
  },
  {
    version: "2026-02-16-weekly-summary",
    date: "Feb 16, 2026",
    emoji: "\u{1F4C8}",
    title: "Weekly Progress Summary",
    description:
      "See your hours, sessions, and best study day this week — with arrows comparing to last week so you can track your improvement.",
    link: "/dashboard",
  },
  {
    version: "2026-02-16-notes",
    date: "Feb 16, 2026",
    emoji: "\u{1F4DD}",
    title: "Revision Notes",
    description:
      "Add notes to any chapter from the Subjects page. View and search all your notes at /dashboard/notes — never lose revision notes again!",
    link: "/dashboard/notes",
  },
  {
    version: "2026-02-16-leaderboard",
    date: "Feb 16, 2026",
    emoji: "\u{1F3C6}",
    title: "Study Leaderboard",
    description:
      "Opt in from Settings to join the leaderboard! See how your streak, hours, and chapters compare to other students — anonymized for privacy.",
    link: "/dashboard/leaderboard",
  },
  {
    version: "2026-02-16-parent-report",
    date: "Feb 16, 2026",
    emoji: "\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}",
    title: "Parent Progress Report",
    description:
      "Share a read-only progress report with your parents. Enable it in Settings, copy the link, and they can view your progress anytime — even print it!",
    link: "/dashboard/settings",
  },
  {
    version: "2026-02-18-english-prose",
    date: "Feb 18, 2026",
    emoji: "\u{1F4D6}",
    title: "English Literature: Prose Section",
    description:
      "Study 5 ICSE prose pieces — The Elevator, The Girl Who Can, The Last Lesson, The Pedestrian & With the Photographer. Each story has summaries, passage flashcards, word meanings, literary devices, Q&A, and MCQ quizzes.",
    link: "/dashboard/english",
  },
  {
    version: "2026-02-19-bonus-credits",
    date: "Feb 19, 2026",
    emoji: "\u{1F381}",
    title: "1000+ Bonus Credits for Everyone!",
    description:
      "Congrats! We're giving 1000 bonus credits to all existing users. Use them for MCQs, comprehension, subjective answers, and mock tests. New users now start with 1500 credits too — keep studying!",
    link: "/dashboard",
  },
];

export function getLatestWhatsNewVersion(): string {
  return whatsNewEntries[whatsNewEntries.length - 1].version;
}

export function getUnseenUpdates(lastSeen: string | null): WhatsNewEntry[] {
  if (!lastSeen) return whatsNewEntries;
  const lastSeenIndex = whatsNewEntries.findIndex((e) => e.version === lastSeen);
  if (lastSeenIndex === -1) return whatsNewEntries;
  return whatsNewEntries.slice(lastSeenIndex + 1);
}
