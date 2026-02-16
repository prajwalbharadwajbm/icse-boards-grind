"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/use-store";
import { useNotifications } from "@/store/use-notifications";
import { today } from "@/lib/utils";
import { showNotification } from "@/lib/push-notifications";
import { getDailyGoalMessage } from "@/lib/notification-messages";
import { throttle } from "@/lib/notification-throttle";

/**
 * Watches studyLog changes and fires a push + in-app notification
 * when daily study hours >= target. Throttled to once per day.
 */
export function useDailyGoalDetector() {
  const addNotification = useNotifications((s) => s.addNotification);
  const firedRef = useRef(false);

  useEffect(() => {
    const unsub = useStore.subscribe((state) => {
      if (firedRef.current) return;

      const td = today();
      const entry = state.studyLog[td];
      if (!entry) return;

      const target = state.studyHours || 8;
      if (entry.hours >= target) {
        if (!throttle("daily_goal")) return;
        firedRef.current = true;

        const msg = getDailyGoalMessage();

        // In-app notification
        addNotification({
          title: msg.title,
          message: msg.body,
          type: "success",
        });

        // Push notification
        showNotification(msg.title, {
          body: msg.body,
          tag: `daily-goal-${td}`,
        });
      }
    });

    return unsub;
  }, [addNotification]);
}
