"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDbInstance } from "@/lib/firebase";
import { useStore, type StoreState } from "./use-store";
import { anonymizeName, getCurrentWeekStart } from "@/lib/leaderboard";

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let currentUid: string | null = null;

const actionKeys = ["setField", "update", "setAll", "resetStore", "markHydrated"];

function getDataToSync(): Partial<StoreState> {
  const state = useStore.getState();
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(state)) {
    if (key === "_hydrated" || actionKeys.includes(key) || typeof value === "function") continue;
    data[key] = value;
  }
  return data as Partial<StoreState>;
}

export function setCurrentUid(uid: string | null) {
  currentUid = uid;
}

export function schedulCloudSync() {
  if (!currentUid) return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => pushToCloud(), 2000);
}

async function pushToCloud() {
  if (!currentUid) return;
  try {
    const data = getDataToSync();
    await setDoc(doc(getDbInstance(), "users", currentUid), data);

    // F9: Push leaderboard data if opted in
    const state = useStore.getState();
    if (state.leaderboardOptIn) {
      try {
        let totalHours = 0;
        Object.values(state.studyLog || {}).forEach((log) => { totalHours += log.hours; });
        let chapsDone = 0;
        Object.values(state.subjects || {}).forEach((chs) => {
          chs.forEach((ch) => { if (ch.status === "completed") chapsDone++; });
        });

        await setDoc(doc(getDbInstance(), "leaderboard", currentUid), {
          name: anonymizeName(state.name),
          streak: state.streak || 0,
          totalHours,
          chaptersDone: chapsDone,
          weekStart: getCurrentWeekStart(),
          updatedAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Leaderboard sync failed:", e);
      }
    }
  } catch (e) {
    console.error("Cloud sync failed:", e);
  }
}

export async function loadFromCloud(uid: string): Promise<boolean> {
  currentUid = uid;
  try {
    const docSnap = await getDoc(doc(getDbInstance(), "users", uid));
    if (docSnap.exists()) {
      const cloudData = docSnap.data() as Partial<StoreState>;
      // Auto-opt-in existing users who were never explicitly on the leaderboard
      if (cloudData.leaderboardOptIn === false || cloudData.leaderboardOptIn === undefined) {
        cloudData.leaderboardOptIn = true;
      }
      useStore.getState().setAll(cloudData);
      // Ensure leaderboard data is pushed on load
      pushLeaderboardData();
      return true;
    }
  } catch (e) {
    console.error("Cloud load failed:", e);
  }
  return false;
}

/** Push current user's leaderboard entry to Firestore immediately */
export async function pushLeaderboardData() {
  if (!currentUid) return;
  const state = useStore.getState();
  if (!state.leaderboardOptIn) return;

  try {
    let totalHours = 0;
    Object.values(state.studyLog || {}).forEach((log) => { totalHours += log.hours; });
    let chapsDone = 0;
    Object.values(state.subjects || {}).forEach((chs) => {
      chs.forEach((ch) => { if (ch.status === "completed") chapsDone++; });
    });

    await setDoc(doc(getDbInstance(), "leaderboard", currentUid), {
      name: anonymizeName(state.name),
      streak: state.streak || 0,
      totalHours,
      chaptersDone: chapsDone,
      weekStart: getCurrentWeekStart(),
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Leaderboard push failed:", e);
  }
}

export async function deleteCloudData(uid: string) {
  try {
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(doc(getDbInstance(), "users", uid));
  } catch {
    /* ignore */
  }
}

// Subscribe to store changes and sync to cloud
let unsubscribe: (() => void) | null = null;

export function startSyncListener() {
  if (unsubscribe) unsubscribe();
  unsubscribe = useStore.subscribe(() => {
    if (currentUid) schedulCloudSync();
  });
}

export function stopSyncListener() {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  currentUid = null;
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
}
