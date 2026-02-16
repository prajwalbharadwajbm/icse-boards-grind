"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@/store/use-store";
import { getExams, type Block } from "@/lib/constants";
import { today } from "@/lib/utils";
import { getDayPlan } from "@/lib/algorithms";
import {
  isPushSupported,
  getNotificationPermission,
  requestNotificationPermission,
  registerServiceWorker,
  restoreScheduledNotifications,
  scheduleStudyNotifications,
  scheduleExamNotifications,
  cancelAllScheduledNotifications,
  scheduleNotification,
} from "@/lib/push-notifications";
import {
  getMorningMessage,
  getEveningNudgeMessage,
  getStreakRiskMessage,
} from "@/lib/notification-messages";
import { canSendNotification } from "@/lib/notification-throttle";

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() => {
    if (typeof window === "undefined") return "default";
    return isPushSupported() ? getNotificationPermission() : "unsupported";
  });
  const [isSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    return isPushSupported();
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const scheduled = useRef(false);

  const selectedLanguage = useStore((s) => s.selectedLanguage) || "kannada";
  const selectedElective = useStore((s) => s.selectedElective) || "computer";
  const routine = useStore((s) => s.routine);

  // Initialize on mount and auto-enable notifications
  useEffect(() => {
    if (!isSupported) return;

    registerServiceWorker().then(async () => {
      restoreScheduledNotifications();

      if (getNotificationPermission() === "default") {
        const result = await requestNotificationPermission();
        setPermission(result);
      }

      setIsInitialized(true);
    });
  }, [isSupported]);

  // Schedule notifications once after initialization
  useEffect(() => {
    if (!isInitialized || permission !== "granted" || scheduled.current) return;
    scheduled.current = true;

    const savedPrefs = localStorage.getItem("notification-prefs");
    const prefs = savedPrefs ? JSON.parse(savedPrefs) : {
      studyReminders: true,
      examAlerts: true,
      revisionDue: true,
      dailyGoalAlerts: true,
    };

    const td = today();

    cancelAllScheduledNotifications();

    // Schedule study session notifications
    if (prefs.studyReminders) {
      const state = useStore.getState();
      const blocks = getDayPlan(td, state);
      if (blocks && blocks.length > 0) {
        const studyBlocks = blocks
          .filter((b: Block) => b.type === "study" && b.subjectKey)
          .map((b: Block) => ({
            start: b.start,
            end: b.end,
            subject: b.subjectKey || "",
            label: b.label,
          }));
        scheduleStudyNotifications(studyBlocks, td);
      }
    }

    // Schedule exam notifications
    if (prefs.examAlerts) {
      const exams = getExams(selectedLanguage, selectedElective);
      scheduleExamNotifications(exams);
    }

    // Schedule motivational notifications (morning, evening, streak risk)
    if (prefs.dailyGoalAlerts !== false) {
      scheduleMorningKickoff(routine?.wake);
      scheduleEveningNudge();
      scheduleStreakRisk();
    }
  }, [isInitialized, permission, selectedLanguage, selectedElective, routine]);

  // Re-schedule at midnight
  useEffect(() => {
    if (!isInitialized || permission !== "granted") return;

    const checkMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        scheduled.current = false; // Allow re-scheduling for new day
      }
    };

    const interval = setInterval(checkMidnight, 60000);
    return () => clearInterval(interval);
  }, [isInitialized, permission]);

  return {
    isSupported,
    permission,
    isInitialized,
  };
}

/** Schedule a morning kickoff notification 15 min after wake time */
function scheduleMorningKickoff(wakeTime?: string) {
  if (!canSendNotification("morning_kickoff")) return;

  const wake = wakeTime || "06:00";
  const [h, m] = wake.split(":").map(Number);
  const target = new Date();
  target.setHours(h, m + 15, 0, 0); // 15 min after wake

  if (target.getTime() <= Date.now()) return; // Already past

  const msg = getMorningMessage();
  scheduleNotification({
    id: `morning-kickoff-${new Date().toISOString().split("T")[0]}`,
    title: msg.title,
    body: msg.body,
    scheduledTime: target.getTime(),
    type: "study_reminder",
    data: { url: "/dashboard" },
  });
}

/** Schedule an evening nudge at 8 PM if daily goal not met */
function scheduleEveningNudge() {
  if (!canSendNotification("evening_nudge")) return;

  const target = new Date();
  target.setHours(20, 0, 0, 0); // 8 PM

  if (target.getTime() <= Date.now()) return;

  // We schedule it now; the notification handler will check if goal is met
  // For simplicity, we schedule and check at fire time via a custom approach:
  // Actually, since setTimeout fires in-session, we can check at that time.
  const td = today();
  const delay = target.getTime() - Date.now();

  setTimeout(() => {
    const state = useStore.getState();
    const entry = state.studyLog[td];
    const targetHours = state.studyHours || 8;
    const studied = entry?.hours || 0;

    if (studied >= targetHours) return; // Goal met, no nudge needed

    const hoursShort = targetHours - studied;
    const msg = getEveningNudgeMessage(hoursShort);

    // Use direct notification instead of scheduled (we're already at the right time)
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(msg.title, {
          body: msg.body,
          tag: `evening-nudge-${td}`,
          icon: "/icons/icon-192x192.png",
        });
      } catch {
        /* silent */
      }
    }
  }, delay);
}

/** Schedule streak-at-risk notification at 8:30 PM if no study logged today */
function scheduleStreakRisk() {
  if (!canSendNotification("streak_risk")) return;

  const target = new Date();
  target.setHours(20, 30, 0, 0); // 8:30 PM

  if (target.getTime() <= Date.now()) return;

  const td = today();
  const delay = target.getTime() - Date.now();

  setTimeout(() => {
    const state = useStore.getState();
    const entry = state.studyLog[td];

    if (entry && entry.hours > 0) return; // Studied today, streak safe
    if (state.streak <= 0) return; // No streak to protect

    const msg = getStreakRiskMessage(state.streak);

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(msg.title, {
          body: msg.body,
          tag: `streak-risk-${td}`,
          icon: "/icons/icon-192x192.png",
        });
      } catch {
        /* silent */
      }
    }
  }, delay);
}
