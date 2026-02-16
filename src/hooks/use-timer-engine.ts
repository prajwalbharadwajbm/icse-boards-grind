"use client";

import { useEffect, useRef } from "react";
import { useTimerStore } from "@/store/use-timer-store";
import { useStore } from "@/store/use-store";
import { capture } from "@/lib/analytics";
import { today, playBeep, sendNotification } from "@/lib/utils";
import { getTimerWorkDoneMessage, getTimerBreakDoneMessage } from "@/lib/notification-messages";

/**
 * Global timer engine — mount once in dashboard layout.
 * Drives the countdown via setInterval and handles session logging.
 */
export function useTimerEngine() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const running = useTimerStore((s) => s.running);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        const result = useTimerStore.getState().tick();

        if (result === "work_done") {
          playBeep();
          const state = useTimerStore.getState();
          const msg = getTimerWorkDoneMessage(state.workMinutes);
          sendNotification(msg.title, msg.body, "timer-work-done");
          logStudyTime(state.subject, state.chapter, state.workMinutes);
          capture("timer_completed", {
            subject: state.subject || "general",
            chapter: state.chapter || "",
            duration_minutes: state.workMinutes,
          });
        } else if (result === "break_done") {
          playBeep();
          const msg = getTimerBreakDoneMessage();
          sendNotification(msg.title, msg.body, "timer-break-done");
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);
}

function logStudyTime(subject: string, chapter: string, workMinutes: number) {
  const td = today();
  useStore.getState().update((s) => {
    const studyLog = { ...s.studyLog };
    const existing = studyLog[td] || { hours: 0, sessions: 0 };
    const newHours = existing.hours + workMinutes / 60;
    studyLog[td] = {
      hours: newHours,
      sessions: existing.sessions + 1,
    };

    let streak = s.streak;
    let streakRecoveryAvailable = s.streakRecoveryAvailable;
    let streakBeforeReset = s.streakBeforeReset;
    const lastDate = s.lastStudyDate;

    if (lastDate !== td) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];

      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const twoDaysAgoStr = twoDaysAgo.toISOString().split("T")[0];

      if (lastDate === yStr) {
        streak = streak + 1;
      } else if (lastDate === twoDaysAgoStr && streak > 1) {
        streakRecoveryAvailable = true;
        streakBeforeReset = streak;
        streak = 1;
      } else {
        streak = 1;
        streakRecoveryAvailable = false;
        streakBeforeReset = 0;
      }
    }

    const studyTarget = s.studyHours || 8;
    if (streakRecoveryAvailable && newHours >= studyTarget * 2) {
      streak = streakBeforeReset + 1;
      streakRecoveryAvailable = false;
      streakBeforeReset = 0;
      capture("streak_recovered", { restored_streak: streak });
    }

    const timerSessions = [
      ...s.timerSessions,
      {
        date: td,
        subject: subject || "general",
        chapter: chapter || "",
        minutes: workMinutes,
      },
    ];

    return {
      studyLog,
      streak,
      lastStudyDate: td,
      timerSessions,
      streakRecoveryAvailable,
      streakBeforeReset,
    };
  });
}
