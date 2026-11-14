"use client";

import { create } from "zustand";
import { capture } from "@/lib/analytics";

type TimerPhase = "work" | "break";
type Preset = "pomodoro" | "deep" | "custom";

interface TimerStore {
  // Timer config
  preset: Preset;
  workMinutes: number;
  breakMinutes: number;
  customWork: number;
  customBreak: number;

  // Timer state
  seconds: number;
  totalSeconds: number;
  running: boolean;
  phase: TimerPhase;
  /**
   * Wall-clock time (ms) when the current phase ends, while running.
   * The countdown is derived from this, so it stays correct when the browser
   * throttles or suspends timers (background tabs, locked phones).
   */
  endsAt: number | null;

  // Subject context
  subject: string;
  chapter: string;

  // Actions
  setPreset: (preset: Preset) => void;
  setCustomWork: (minutes: number) => void;
  setCustomBreak: (minutes: number) => void;
  applyCustom: () => void;
  setSubject: (subject: string) => void;
  setChapter: (chapter: string) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => "work_done" | "break_done" | null;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  preset: "pomodoro",
  workMinutes: 25,
  breakMinutes: 5,
  customWork: 30,
  customBreak: 10,
  seconds: 25 * 60,
  totalSeconds: 25 * 60,
  running: false,
  phase: "work",
  endsAt: null,
  subject: "",
  chapter: "",

  setPreset: (preset) => {
    const state = get();
    let work: number, brk: number;
    if (preset === "pomodoro") {
      work = 25; brk = 5;
    } else if (preset === "deep") {
      work = 50; brk = 10;
    } else {
      work = state.customWork; brk = state.customBreak;
    }
    set({
      preset,
      running: false,
      endsAt: null,
      phase: "work",
      workMinutes: work,
      breakMinutes: brk,
      seconds: work * 60,
      totalSeconds: work * 60,
    });
  },

  setCustomWork: (minutes) => set({ customWork: minutes }),
  setCustomBreak: (minutes) => set({ customBreak: minutes }),

  applyCustom: () => {
    const { customWork, customBreak } = get();
    set({
      running: false,
      endsAt: null,
      phase: "work",
      workMinutes: customWork,
      breakMinutes: customBreak,
      seconds: customWork * 60,
      totalSeconds: customWork * 60,
    });
  },

  setSubject: (subject) => set({ subject }),
  setChapter: (chapter) => set({ chapter }),

  start: () => {
    const { running, seconds } = get();
    if (running) return;
    set({ running: true, endsAt: Date.now() + seconds * 1000 });
  },
  pause: () => {
    const { running, phase, seconds, totalSeconds } = get();
    if (running) capture("timer_paused", { phase, seconds_left: seconds, total_seconds: totalSeconds });
    set({ running: false, seconds: remainingSeconds(get()), endsAt: null });
  },

  reset: () => {
    const { workMinutes, phase, seconds, totalSeconds } = get();
    if (seconds !== totalSeconds) capture("timer_reset", { phase, seconds_left: seconds, total_seconds: totalSeconds });
    set({
      running: false,
      endsAt: null,
      phase: "work",
      seconds: workMinutes * 60,
      totalSeconds: workMinutes * 60,
    });
  },

  tick: () => {
    const state = get();
    if (!state.running) return null;
    const now = Date.now();
    const endsAt = state.endsAt ?? now + state.seconds * 1000;
    const remaining = Math.max(0, Math.ceil((endsAt - now) / 1000));

    if (remaining <= 0) {
      if (state.phase === "work") {
        // The break starts when the focus block ended, even if the tab was asleep then
        const breakSecs = state.breakMinutes * 60;
        set({ phase: "break", seconds: breakSecs, totalSeconds: breakSecs, endsAt: endsAt + breakSecs * 1000 });
        return "work_done";
      }
      const workSecs = state.workMinutes * 60;
      set({ phase: "work", seconds: workSecs, totalSeconds: workSecs, running: false, endsAt: null });
      return "break_done";
    }

    if (remaining !== state.seconds || state.endsAt === null) set({ seconds: remaining, endsAt });
    return null;
  },
}));

/** Seconds left in the current phase, from the end time while running */
function remainingSeconds(state: Pick<TimerStore, "running" | "endsAt" | "seconds">): number {
  if (!state.running || state.endsAt === null) return state.seconds;
  return Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
}
