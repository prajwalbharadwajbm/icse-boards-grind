"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/use-store";
import { useNotifications } from "@/store/use-notifications";
import { getExams, getSubjectLabels } from "@/lib/constants";
import { today, daysBetween } from "@/lib/utils";
import { getExamCountdownMessage } from "@/lib/notification-messages";
import { showNotification } from "@/lib/push-notifications";
import { throttle } from "@/lib/notification-throttle";

/**
 * Generates in-app notifications on mount (revision due, upcoming exams, exam countdown).
 * Call this in the dashboard layout so notifications exist before the bell is opened.
 */
export function useGenerateNotifications() {
  const subjects = useStore((s) => s.subjects);
  const selectedLanguage = useStore((s) => s.selectedLanguage) || "kannada";
  const selectedElective = useStore((s) => s.selectedElective) || "computer";
  const addNotification = useNotifications((s) => s.addNotification);
  const generated = useRef(false);

  useEffect(() => {
    if (generated.current) return;
    generated.current = true;

    const td = today();
    const SUBJECT_LABELS = getSubjectLabels(selectedLanguage, selectedElective);
    const exams = getExams(selectedLanguage, selectedElective);

    // Revision-due notifications
    Object.keys(subjects).forEach((subjectKey) => {
      (subjects[subjectKey] || []).forEach((ch) => {
        if (ch.status === "needs_revision" && ch.revisionDate && ch.revisionIntervals) {
          const completed = ch.revisionsCompleted || 0;
          if (completed < ch.revisionIntervals.length) {
            const interval = ch.revisionIntervals[completed];
            const dueDate = new Date(
              new Date(ch.revisionDate + "T00:00:00").getTime() + interval * 86400000
            );
            const dueDateStr = dueDate.toISOString().split("T")[0];
            if (dueDateStr === td) {
              addNotification({
                title: "Revision Due",
                message: `${SUBJECT_LABELS[subjectKey] || subjectKey} - ${ch.name} is due for revision today`,
                type: "warning",
              });
            }
          }
        }
      });
    });

    // Exam countdown notifications with motivational messages
    exams.forEach((exam) => {
      const days = daysBetween(td, exam.date);

      // In-app: show for exams within 7 days
      if (days >= 0 && days <= 7) {
        const msg = getExamCountdownMessage(exam.subject, days);
        const notifType = days <= 1 ? "error" as const : days <= 3 ? "warning" as const : "info" as const;

        addNotification({
          title: msg.title,
          message: msg.body,
          type: notifType,
        });

        // Push notification for exams within 3 days (throttled)
        if (days <= 3 && throttle("exam_countdown")) {
          showNotification(msg.title, {
            body: msg.body,
            tag: `exam-countdown-${exam.date}-${exam.subject}`,
          });
        }
      }
    });
  }, [subjects, selectedLanguage, selectedElective, addNotification]);
}
