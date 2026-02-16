"use client";

import { create } from "zustand";

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
      phase: "work",
      workMinutes: customWork,
      breakMinutes: customBreak,
      seconds: customWork * 60,
      totalSeconds: customWork * 60,
    });
  },

  setSubject: (subject) => set({ subject }),
  setChapter: (chapter) => set({ chapter }),

  start: () => set({ running: true }),
  pause: () => set({ running: false }),

  reset: () => {
    const { workMinutes } = get();
    set({
      running: false,
      phase: "work",
      seconds: workMinutes * 60,
      totalSeconds: workMinutes * 60,
    });
  },

  tick: () => {
    const state = get();
    if (state.seconds <= 1) {
      if (state.phase === "work") {
        const breakSecs = state.breakMinutes * 60;
        set({ phase: "break", seconds: breakSecs, totalSeconds: breakSecs });
        return "work_done";
      } else {
        const workSecs = state.workMinutes * 60;
        set({ phase: "work", seconds: workSecs, totalSeconds: workSecs, running: false });
        return "break_done";
      }
    }
    set({ seconds: state.seconds - 1 });
    return null;
  },
}));
