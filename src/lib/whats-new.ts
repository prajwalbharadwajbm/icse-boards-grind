export interface WhatsNewEntry {
  version: string;
  date: string;
  emoji: string;
  title: string;
  description: string;
}

export const whatsNewEntries: WhatsNewEntry[] = [
  {
    version: "2026-01-20-smart-scheduling",
    date: "Jan 20, 2026",
    emoji: "\u{1F4C5}",
    title: "Smart Study Scheduling",
    description:
      "Your study plan now auto-schedules sessions weighted by subject difficulty and skips chapters you've already completed.",
  },
  {
    version: "2026-01-25-ai-coach",
    date: "Jan 25, 2026",
    emoji: "\u{1F9E0}",
    title: "AI Study Coach",
    description:
      "Chat with your personal AI coach for free! Get explanations, study tips, and plan adjustments — all tailored to your progress.",
  },
  {
    version: "2026-02-01-practice-papers",
    date: "Feb 1, 2026",
    emoji: "\u{1F4DD}",
    title: "CISCE Practice Papers",
    description:
      "Access real CISCE specimen papers from 2017 onwards. Practice with actual exam questions and track which papers you've solved.",
  },
  {
    version: "2026-02-05-free-grammar-drills",
    date: "Feb 5, 2026",
    emoji: "\u{1F4DA}",
    title: "Free Grammar Drills",
    description:
      "Practice grammar exercises powered by AI — no API key needed anymore. Drills now track your score so you can see improvement over time.",
  },
  {
    version: "2026-02-10-push-notifications",
    date: "Feb 10, 2026",
    emoji: "\u{1F514}",
    title: "Study Reminders",
    description:
      "Enable push notifications to get gentle reminders for your study sessions. Never miss a scheduled block again!",
  },
  {
    version: "2026-02-15-grammar-fix",
    date: "Feb 15, 2026",
    emoji: "\u{2728}",
    title: "Smarter Grammar Practice",
    description:
      "Grammar drills no longer repeat the same questions back-to-back. You'll get a fresh mix every time you practice.",
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
