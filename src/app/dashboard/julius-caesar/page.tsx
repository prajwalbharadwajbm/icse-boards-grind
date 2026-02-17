"use client";

import { useState, useMemo, useEffect } from "react";
import posthog from "posthog-js";
import { useStore } from "@/store/use-store";
import { StatChip } from "@/components/ui/stat-chip";
import { JCScenes } from "@/components/english/jc-scenes";
import { JCFlashcards } from "@/components/english/jc-flashcards";
import { JCQuiz } from "@/components/english/jc-quiz";
import { JCCharacters } from "@/components/english/jc-characters";
import { JCQuoteIdentifier } from "@/components/english/jc-quote-identifier";

type JCSubTab = "flashcards" | "quotes" | "scenes" | "characters" | "quiz";

const JC_SUB_TABS: { id: JCSubTab; label: string }[] = [
  { id: "flashcards", label: "Flashcards" },
  { id: "quotes", label: "Quote Identifier" },
  { id: "scenes", label: "Scenes" },
  { id: "characters", label: "Characters" },
  { id: "quiz", label: "MCQ Quiz" },
];

export default function JuliusCaesarPage() {
  const jcFlashcardsReviewed = useStore((s) => s.jcFlashcardsReviewed);
  const jcQuizScores = useStore((s) => s.jcQuizScores);

  const [subTab, setSubTab] = useState<JCSubTab>("flashcards");

  useEffect(() => {
    posthog.capture("julius_caesar_page_viewed");
  }, []);

  const bestQuizScore = useMemo(() => {
    if (jcQuizScores.length === 0) return null;
    return Math.max(
      ...jcQuizScores.map((s) => Math.round((s.score / s.total) * 100))
    );
  }, [jcQuizScores]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Julius Caesar
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          English Literature - Drama revision for Paper 2
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <StatChip
          label="Flashcards Reviewed"
          value={jcFlashcardsReviewed.length}
          color="#1a73e8"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 4v16" />
            </svg>
          }
        />
        <StatChip
          label="Best Quiz Score"
          value={bestQuizScore !== null ? `${bestQuizScore}%` : "--"}
          color="#34a853"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          }
        />
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2">
        {JC_SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background:
                subTab === tab.id ? "var(--primary)" : "var(--bg-card)",
              color: subTab === tab.id ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${
                subTab === tab.id ? "transparent" : "var(--border)"
              }`,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {subTab === "flashcards" && <JCFlashcards />}
        {subTab === "quotes" && <JCQuoteIdentifier />}
        {subTab === "scenes" && <JCScenes />}
        {subTab === "characters" && <JCCharacters />}
        {subTab === "quiz" && <JCQuiz />}
      </div>
    </div>
  );
}
