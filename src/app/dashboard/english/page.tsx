"use client";

import { useState, useMemo, useEffect } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { StatChip } from "@/components/ui/stat-chip";
import { JCScenes } from "@/components/english/jc-scenes";
import { JCFlashcards } from "@/components/english/jc-flashcards";
import { JCQuiz } from "@/components/english/jc-quiz";
import { JCCharacters } from "@/components/english/jc-characters";
import { JCQuoteIdentifier } from "@/components/english/jc-quote-identifier";
import { JCLineByLine } from "@/components/english/jc-line-by-line";
import { Poems } from "@/components/english/poems";

type MainTab = "julius-caesar" | "poems";
type JCSubTab = "flashcards" | "quotes" | "scenes" | "characters" | "quiz" | "line-by-line";

const JC_SUB_TABS: { id: JCSubTab; label: string }[] = [
  { id: "flashcards", label: "Flashcards" },
  { id: "quotes", label: "Quote Identifier" },
  { id: "scenes", label: "Scenes" },
  { id: "characters", label: "Characters" },
  { id: "quiz", label: "MCQ Quiz" },
  { id: "line-by-line", label: "Line by Line" },
];

export default function EnglishPage() {
  const jcFlashcardsReviewed = useStore((s) => s.jcFlashcardsReviewed);
  const jcQuizScores = useStore((s) => s.jcQuizScores);

  const [mainTab, setMainTab] = useState<MainTab>("julius-caesar");
  const [jcSubTab, setJcSubTab] = useState<JCSubTab>("flashcards");

  useEffect(() => {
    capture("english_page_viewed");
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
          English Literature
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Julius Caesar &amp; Poems revision (Paper 2)
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

      {/* Main Tabs */}
      <div className="flex gap-2">
        {(["julius-caesar", "poems"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setMainTab(tab); capture("english_tab_changed", { tab }); }}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background:
                mainTab === tab ? "var(--primary)" : "var(--bg-card)",
              color: mainTab === tab ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${
                mainTab === tab ? "transparent" : "var(--border)"
              }`,
            }}
          >
            {tab === "julius-caesar" ? "Julius Caesar" : "Poems"}
          </button>
        ))}
      </div>

      {/* Poems */}
      {mainTab === "poems" && <Poems />}

      {/* Julius Caesar */}
      {mainTab === "julius-caesar" && (
        <div className="space-y-4">
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2">
            {JC_SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setJcSubTab(tab.id); capture("jc_sub_tab_changed", { sub_tab: tab.id }); }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
                style={{
                  background:
                    jcSubTab === tab.id
                      ? "rgba(123,97,255,0.15)"
                      : "var(--bg-card)",
                  color:
                    jcSubTab === tab.id ? "#7b61ff" : "var(--text-secondary)",
                  border: `1px solid ${
                    jcSubTab === tab.id
                      ? "rgba(123,97,255,0.3)"
                      : "var(--border)"
                  }`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {jcSubTab === "flashcards" && <JCFlashcards />}
          {jcSubTab === "quotes" && <JCQuoteIdentifier />}
          {jcSubTab === "scenes" && <JCScenes />}
          {jcSubTab === "characters" && <JCCharacters />}
          {jcSubTab === "quiz" && <JCQuiz />}
          {jcSubTab === "line-by-line" && <JCLineByLine />}
        </div>
      )}
    </div>
  );
}
