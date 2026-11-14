/**
 * A student's identity: the sticker they picked in onboarding and their study vibe.
 * The sticker is their avatar everywhere (sidebar, top bar, leaderboard, parent report);
 * the vibe tunes the AI coach's advice.
 */

export const AVATARS = [
  { key: "ghost", name: "Ghost" },
  { key: "cloud", name: "Cloud" },
  { key: "toast", name: "Toast" },
  { key: "cat", name: "Cat" },
  { key: "frog", name: "Frog" },
  { key: "samosa", name: "Samosa" },
  { key: "chai", name: "Chai" },
  { key: "star", name: "Star" },
  { key: "moon", name: "Moon" },
  { key: "blob", name: "Blob" },
] as const;

export type AvatarKey = (typeof AVATARS)[number]["key"];

export const STUDY_VIBES = [
  { key: "night_owl", name: "Night owl", line: "Brain switches on after 9 pm", coach: "studies best late at night; suggest evening sessions and protecting sleep before papers" },
  { key: "early_bird", name: "Early bird", line: "Physics done before breakfast", coach: "studies best early in the morning; put hard subjects first thing" },
  { key: "sprinter", name: "Sprinter", line: "25-minute bursts, then a snack", coach: "prefers short focused bursts; suggest Pomodoro-style 25-minute sessions" },
  { key: "marathoner", name: "Marathoner", line: "Three hours deep, no breaks", coach: "likes long deep sessions; suggest 50-minute blocks and remind them to take real breaks" },
  { key: "planner", name: "Planner", line: "Colour-coded everything", coach: "loves structure; give clear day-by-day plans and checklists" },
  { key: "last_minute", name: "Last-minute legend", line: "Works best under pressure", coach: "tends to leave things late; break work into small daily targets and keep deadlines close" },
] as const;

export type StudyVibeKey = (typeof STUDY_VIBES)[number]["key"];

export function isAvatarKey(value: unknown): value is AvatarKey {
  return typeof value === "string" && AVATARS.some((a) => a.key === value);
}

/** The student's chosen sticker, or a stable one picked from their name until they choose */
export function avatarFor(avatar: string | undefined | null, seed: string | undefined | null): AvatarKey {
  if (isAvatarKey(avatar)) return avatar;
  const text = seed || "student";
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return AVATARS[hash % AVATARS.length].key;
}

export function vibeFor(key: string | undefined | null) {
  return STUDY_VIBES.find((v) => v.key === key);
}
