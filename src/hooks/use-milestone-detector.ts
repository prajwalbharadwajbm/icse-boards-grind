"use client";

import { useEffect, useRef } from "react";
import { useStore, type StoreState } from "@/store/use-store";
import { useNotifications } from "@/store/use-notifications";
import { useConfetti } from "./use-confetti";
import { capture } from "@/lib/analytics";
import { showNotification } from "@/lib/push-notifications";
import { getStreakMessage, getChapterCompleteMessage, getGrammarPerfectMessage } from "@/lib/notification-messages";
import { throttle } from "@/lib/notification-throttle";
import { getSubjectLabels } from "@/lib/constants";

const STREAK_MILESTONES = [7, 14, 30, 60, 100];

function getCelebratedKey(type: string, detail: string) {
  return `milestone_${type}_${detail}`;
}

function wasCelebrated(key: string) {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(key) === "1";
}

function markCelebrated(key: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, "1");
}

export function useMilestoneDetector() {
  const { fire } = useConfetti();
  const addNotification = useNotifications((s) => s.addNotification);
  const prevRef = useRef<Partial<StoreState> | null>(null);

  useEffect(() => {
    const unsub = useStore.subscribe((state) => {
      const prev = prevRef.current;
      prevRef.current = { streak: state.streak, subjects: state.subjects, grammarDrillStats: state.grammarDrillStats, solvedPapers: state.solvedPapers };

      if (!prev) return; // First render, just capture state

      const lang = state.selectedLanguage || "kannada";
      const elective = state.selectedElective || "computer";
      const SUBJECT_LABELS = getSubjectLabels(lang, elective);

      // Check notification prefs
      const savedPrefs = typeof localStorage !== "undefined" ? localStorage.getItem("notification-prefs") : null;
      const prefs = savedPrefs ? JSON.parse(savedPrefs) : {};
      const milestonesEnabled = prefs.milestones !== false; // default true

      // Detect chapter completion
      if (state.subjects && prev.subjects) {
        for (const key of Object.keys(state.subjects)) {
          const newChapters = state.subjects[key] || [];
          const oldChapters = (prev.subjects as Record<string, { status: string }[]>)?.[key] || [];
          for (let i = 0; i < newChapters.length; i++) {
            if (
              newChapters[i]?.status === "completed" &&
              oldChapters[i]?.status !== "completed"
            ) {
              const mKey = getCelebratedKey("chapter", `${key}_${i}`);
              if (!wasCelebrated(mKey)) {
                markCelebrated(mKey);
                fire();
                capture("milestone_celebrated", { type: "chapter_completed", subject: key, chapter: newChapters[i].name });

                if (milestonesEnabled && throttle("chapter_complete")) {
                  const subjectLabel = SUBJECT_LABELS[key] || key;
                  const msg = getChapterCompleteMessage(subjectLabel, newChapters[i].name);
                  addNotification({ title: msg.title, message: msg.body, type: "success" });
                  showNotification(msg.title, { body: msg.body, tag: `chapter-${key}-${i}` });
                }
              }
            }
          }
        }
      }

      // Detect streak milestones
      if (state.streak !== (prev.streak as number)) {
        for (const m of STREAK_MILESTONES) {
          if (state.streak >= m && ((prev.streak as number) || 0) < m) {
            const mKey = getCelebratedKey("streak", String(m));
            if (!wasCelebrated(mKey)) {
              markCelebrated(mKey);
              fire();
              capture("milestone_celebrated", { type: "streak", value: m });

              if (milestonesEnabled && throttle("streak_milestone")) {
                const msg = getStreakMessage(m);
                addNotification({ title: msg.title, message: msg.body, type: "success" });
                showNotification(msg.title, { body: msg.body, tag: `streak-${m}` });
              }
            }
          }
        }
      }

      // Detect grammar 100% accuracy (min 5 attempts)
      if (state.grammarDrillStats) {
        for (const [cat, stats] of Object.entries(state.grammarDrillStats)) {
          if (stats.attempted >= 5 && stats.correct === stats.attempted) {
            const prevStats = (prev.grammarDrillStats as Record<string, { attempted: number; correct: number }>)?.[cat];
            if (!prevStats || prevStats.correct !== prevStats.attempted || prevStats.attempted < 5) {
              const mKey = getCelebratedKey("grammar", cat);
              if (!wasCelebrated(mKey)) {
                markCelebrated(mKey);
                fire();
                capture("milestone_celebrated", { type: "grammar_perfect", category: cat });

                if (milestonesEnabled) {
                  const msg = getGrammarPerfectMessage(cat);
                  addNotification({ title: msg.title, message: msg.body, type: "success" });
                  showNotification(msg.title, { body: msg.body, tag: `grammar-${cat}` });
                }
              }
            }
          }
        }
      }
    });

    return unsub;
  }, [fire, addNotification]);
}
