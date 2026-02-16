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
} from "@/lib/push-notifications";

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
