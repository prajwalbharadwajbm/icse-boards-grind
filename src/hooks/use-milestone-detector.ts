"use client";

import { useEffect, useRef } from "react";
import { useStore, type StoreState } from "@/store/use-store";
import { useConfetti } from "./use-confetti";
import { capture } from "@/lib/analytics";

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
  const prevRef = useRef<Partial<StoreState> | null>(null);

  useEffect(() => {
    const unsub = useStore.subscribe((state) => {
      const prev = prevRef.current;
      prevRef.current = { streak: state.streak, subjects: state.subjects, grammarDrillStats: state.grammarDrillStats, solvedPapers: state.solvedPapers };

      if (!prev) return; // First render, just capture state

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
              }
            }
          }
        }
      }
    });

    return unsub;
  }, [fire]);
}
