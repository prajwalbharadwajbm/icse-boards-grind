import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const firestore = vi.hoisted(() => ({
  saved: null as Record<string, unknown> | null,
  setDoc: vi.fn(),
}));

vi.mock("@/lib/firebase", () => ({ getDbInstance: () => ({}) }));
vi.mock("firebase/firestore", () => ({
  doc: (_db: unknown, ...path: string[]) => ({ path: path.join("/") }),
  getDoc: async () => ({ exists: () => firestore.saved !== null, data: () => structuredClone(firestore.saved) }),
  setDoc: firestore.setDoc,
}));

import { loadFromCloud, stopSyncListener } from "./firebase-sync";
import type { Chapter } from "@/lib/constants";

const ch = (name: string): Chapter => ({ name, status: "completed", difficulty: 3 });
const userDocWrites = () =>
  firestore.setDoc.mock.calls.filter(([ref]) => (ref as { path: string }).path.startsWith("users/"));

/** A student saved before the four core subjects had chapter lists */
function savedStudent(subjects: Record<string, Chapter[]>) {
  return { onboarded: true, selectedLanguage: "hindi", selectedElective: "computer", leaderboardOptIn: false, subjects };
}

describe("loadFromCloud", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    firestore.setDoc.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    stopSyncListener();
    vi.useRealTimers();
  });

  it("saves the default chapters it filled in for a subject saved empty", async () => {
    firestore.saved = savedStudent({ math: [], physics: [ch("Force")] });

    await loadFromCloud("student-1");
    await vi.advanceTimersByTimeAsync(2500);

    const writes = userDocWrites();
    expect(writes).toHaveLength(1);
    const [ref, data] = writes[0] as [{ path: string }, { subjects: Record<string, Chapter[]> }];
    expect(ref.path).toBe("users/student-1");
    expect(data.subjects.math[0].name).toBe("Goods and Services Tax (GST)");
    expect(data.subjects.physics).toEqual([ch("Force")]);
  });

  it("saves when a subject was missing altogether", async () => {
    const withoutMath = fullySaved();
    delete withoutMath.math;
    firestore.saved = savedStudent(withoutMath);

    await loadFromCloud("student-2");
    await vi.advanceTimersByTimeAsync(2500);

    expect(userDocWrites()).toHaveLength(1);
  });

  it("writes nothing when every subject already has its list", async () => {
    firestore.saved = savedStudent(fullySaved());

    await loadFromCloud("student-3");
    await vi.advanceTimersByTimeAsync(2500);

    expect(userDocWrites()).toHaveLength(0);
  });
});

/** Every subject saved with chapters, except the second language and elective, which have no defaults */
function fullySaved(): Record<string, Chapter[]> {
  const keys = ["english_lang", "english_lit", "math", "physics", "chemistry", "biology", "history", "geography"];
  return { ...Object.fromEntries(keys.map((k) => [k, [ch(`${k} chapter`)]])), hindi: [], computer: [] };
}
