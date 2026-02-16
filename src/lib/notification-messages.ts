// Central message bank for motivational notifications
// Each category has an array of { title, body } pairs; pick randomly at call time.

export interface NotificationMessage {
  title: string;
  body: string;
}

function pick(messages: NotificationMessage[]): NotificationMessage {
  return messages[Math.floor(Math.random() * messages.length)];
}

// --- Streak milestones ---

const streakMessages: Record<number, NotificationMessage[]> = {
  7: [
    { title: "One Week Strong", body: "7 days in a row. Most people quit by now -- you didn't." },
    { title: "Week One Done", body: "Seven straight days of showing up. Keep it rolling." },
  ],
  14: [
    { title: "Two Weeks Running", body: "14 days and counting. Legends don't skip days." },
    { title: "Fortnight of Focus", body: "Half a month of consistency. That's rare." },
  ],
  30: [
    { title: "30-Day Streak", body: "A full month without missing a beat. You're built different." },
    { title: "One Month Strong", body: "30 days of discipline. The results will follow." },
  ],
  60: [
    { title: "60-Day Machine", body: "Two months of relentless studying. Exams should be scared." },
    { title: "Sixty and Counting", body: "Most people dream about this kind of consistency." },
  ],
  100: [
    { title: "Triple Digits", body: "100-day streak. You've turned studying into a lifestyle." },
    { title: "The 100 Club", body: "A hundred days of showing up. Nothing can stop you now." },
  ],
};

export function getStreakMessage(milestone: number): NotificationMessage {
  const msgs = streakMessages[milestone];
  if (!msgs) return { title: "Streak Milestone", body: `${milestone}-day streak! Keep going.` };
  return pick(msgs);
}

// --- Chapter completion ---

const chapterCompleteMessages: NotificationMessage[] = [
  { title: "One Down, Many to Go", body: "Chapter locked in. On to the next one." },
  { title: "Chapter Cleared", body: "Another chapter conquered. Your syllabus is shrinking." },
  { title: "Progress Made", body: "That chapter is done. The finish line just got closer." },
  { title: "Chapter Complete", body: "Checked off the list. Momentum is everything." },
];

export function getChapterCompleteMessage(subjectLabel?: string, chapterName?: string): NotificationMessage {
  const base = pick(chapterCompleteMessages);
  if (subjectLabel && chapterName) {
    return { title: base.title, body: `${chapterName} (${subjectLabel}) -- done. ${base.body}` };
  }
  return base;
}

// --- Grammar perfect score ---

const grammarPerfectMessages: NotificationMessage[] = [
  { title: "Perfect Grammar", body: "100% accuracy. Not a single mistake." },
  { title: "Flawless Run", body: "Every answer correct. Grammar can't touch you." },
  { title: "Grammar Mastered", body: "Perfect score. That category is yours now." },
];

export function getGrammarPerfectMessage(category?: string): NotificationMessage {
  const base = pick(grammarPerfectMessages);
  if (category) {
    return { title: base.title, body: `${category} -- ${base.body}` };
  }
  return base;
}

// --- Daily goal reached ---

const dailyGoalMessages: NotificationMessage[] = [
  { title: "Target Smashed", body: "You hit your study goal today. Tomorrow, do it again." },
  { title: "Daily Goal Complete", body: "Today's target is done. Consistency wins championships." },
  { title: "Goal Reached", body: "Full quota for the day. Rest up and come back stronger." },
  { title: "Mission Accomplished", body: "Study goal hit. That's another productive day in the books." },
];

export function getDailyGoalMessage(): NotificationMessage {
  return pick(dailyGoalMessages);
}

// --- Timer session done ---

const timerWorkDoneMessages: NotificationMessage[] = [
  { title: "Session Locked In", body: "Another focused session in the bank. Compound interest, baby." },
  { title: "Work Session Done", body: "That's how you build momentum. Take a quick break." },
  { title: "Focus Delivered", body: "Solid work session complete. Your future self thanks you." },
  { title: "Session Complete", body: "Minutes well spent. Time for a breather." },
];

const timerBreakDoneMessages: NotificationMessage[] = [
  { title: "Break Over", body: "Recharged and ready. Let's get back to it." },
  { title: "Back to Business", body: "Break time is up. Your books are waiting." },
  { title: "Round Two", body: "Rested? Good. Time to lock in again." },
];

export function getTimerWorkDoneMessage(minutes?: number): NotificationMessage {
  const base = pick(timerWorkDoneMessages);
  if (minutes) {
    return { title: base.title, body: `${minutes} minutes done. ${base.body}` };
  }
  return base;
}

export function getTimerBreakDoneMessage(): NotificationMessage {
  return pick(timerBreakDoneMessages);
}

// --- Morning kickoff ---

const morningMessages: NotificationMessage[] = [
  { title: "Rise and Grind", body: "Your books are waiting. Let's make today count." },
  { title: "Good Morning", body: "A new day, a new chance to get ahead. Start strong." },
  { title: "Time to Start", body: "The morning is yours. Open those books and own it." },
  { title: "Day One Mentality", body: "Treat today like it matters -- because it does." },
];

export function getMorningMessage(): NotificationMessage {
  return pick(morningMessages);
}

// --- Evening nudge ---

const eveningNudgeMessages: NotificationMessage[] = [
  { title: "Still Time Left", body: "You're short of your goal. One more session can fix that." },
  { title: "Don't Stop Now", body: "The day isn't over yet. A quick session goes a long way." },
  { title: "Evening Push", body: "Your daily target is within reach. Finish what you started." },
];

export function getEveningNudgeMessage(hoursShort?: number): NotificationMessage {
  const base = pick(eveningNudgeMessages);
  if (hoursShort && hoursShort > 0) {
    const rounded = Math.round(hoursShort * 10) / 10;
    return { title: base.title, body: `You're ${rounded}h short of your goal. ${base.body}` };
  }
  return base;
}

// --- Streak at risk ---

const streakRiskMessages: NotificationMessage[] = [
  { title: "Don't Break the Chain", body: "Your streak ends tonight if you don't study." },
  { title: "Streak in Danger", body: "No study logged today. Don't let it slip." },
  { title: "Last Call", body: "Your streak is on the line. Even a short session counts." },
];

export function getStreakRiskMessage(streakDays?: number): NotificationMessage {
  const base = pick(streakRiskMessages);
  if (streakDays && streakDays > 1) {
    return { title: base.title, body: `Your ${streakDays}-day streak ends tonight if you don't study. Even 10 minutes counts.` };
  }
  return base;
}

// --- Exam countdown ---

const examCountdownMessages: NotificationMessage[] = [
  { title: "Clock's Ticking", body: "You know what to do." },
  { title: "Exam Approaching", body: "Time to tighten the screws. Review, revise, repeat." },
  { title: "Countdown Mode", body: "Every hour counts now. Focus on weak areas." },
];

export function getExamCountdownMessage(subject: string, daysLeft: number): NotificationMessage {
  const base = pick(examCountdownMessages);
  if (daysLeft === 0) {
    return { title: "Exam Today", body: `${subject} is today. Trust your preparation. You've got this.` };
  }
  if (daysLeft === 1) {
    return { title: "Exam Tomorrow", body: `${subject} is tomorrow. Light revision, early sleep. Stay calm.` };
  }
  return { title: base.title, body: `${subject} in ${daysLeft} days. ${base.body}` };
}

// --- Study session reminders (replacing emoji versions) ---

export function getStudyStartMessage(label: string): NotificationMessage {
  return { title: "Time to Study", body: `Start your ${label} session now.` };
}

export function getStudyReminderMessage(label: string, minutesBefore: number): NotificationMessage {
  return { title: "Session Starting Soon", body: `${label} starts in ${minutesBefore} minutes.` };
}

export function getRevisionDueMessage(subject: string, chapter: string): NotificationMessage {
  return { title: "Revision Due", body: `Time to revise ${chapter} (${subject}).` };
}
