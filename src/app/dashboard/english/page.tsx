"use client";

import { useMemo, useEffect } from "react";
import posthog from "posthog-js";
import { useStore } from "@/store/use-store";
import { StatChip } from "@/components/ui/stat-chip";
import { GrammarDrill } from "@/components/english/grammar-drill";

export default function EnglishLanguagePage() {
  const grammarDrillStats = useStore((s) => s.grammarDrillStats);

  useEffect(() => {
    posthog.capture("english_language_page_viewed");
  }, []);

  // Stats
  const grammarStats = useMemo(() => {
    const entries = Object.values(grammarDrillStats);
    const total = entries.reduce((a, e) => a + e.attempted, 0);
    const correct = entries.reduce((a, e) => a + e.correct, 0);
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, correct, accuracy };
  }, [grammarDrillStats]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          English Language
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Grammar drills and practice for Paper 1
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatChip
          label="Questions Attempted"
          value={grammarStats.total}
          color="#7b61ff"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
        />
        <StatChip
          label="Correct Answers"
          value={grammarStats.correct}
          color="#34a853"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        />
        <StatChip
          label="Accuracy"
          value={grammarStats.total > 0 ? `${grammarStats.accuracy}%` : "--"}
          color="#1a73e8"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          }
        />
      </div>

      {/* Grammar Drills */}
      <GrammarDrill />
    </div>
  );
}
