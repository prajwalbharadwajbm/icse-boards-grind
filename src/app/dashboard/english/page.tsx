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
import { Prose } from "@/components/english/prose";

type MainTab = "julius-caesar" | "poems" | "prose";
type JCSubTab = "flashcards" | "quotes" | "scenes" | "characters" | "quiz" | "line-by-line";

const JC_SUB_TABS: { id: JCSubTab; label: string }[] = [
  { id: "flashcards", label: "Flashcards" },
  { id: "quotes", label: "Quote identifier" },
  { id: "scenes", label: "Scenes" },
  { id: "characters", label: "Characters" },
  { id: "quiz", label: "MCQ quiz" },
  { id: "line-by-line", label: "Line by line" },
];

/** Sticker pill: ink when active, outlined paper otherwise */
function pillClass(active: boolean) {
  return `h-9 px-4 rounded-full text-sm whitespace-nowrap transition-colors duration-150 cursor-pointer ${
    active
      ? "bg-[var(--text)] text-[var(--bg)] font-bold"
      : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
  }`;
}

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
      <header className="flex flex-col gap-2">
        <h1
          className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]"
          style={{ color: "var(--text)" }}
        >
          English Literature
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Julius Caesar, poems and prose revision (Paper 2)
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatChip label="Flashcards reviewed" value={jcFlashcardsReviewed.length} />
        <StatChip
          label="Best quiz score"
          value={bestQuizScore !== null ? `${bestQuizScore}%` : "--"}
        />
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["julius-caesar", "poems", "prose"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setMainTab(tab); capture("english_tab_changed", { tab }); }}
            aria-pressed={mainTab === tab}
            className={pillClass(mainTab === tab)}
            style={{ border: "2px solid var(--outline)" }}
          >
            {tab === "julius-caesar" ? "Julius Caesar" : tab === "poems" ? "Poems" : "Prose"}
          </button>
        ))}
      </div>

      {/* Poems */}
      {mainTab === "poems" && <Poems />}

      {/* Prose */}
      {mainTab === "prose" && <Prose />}

      {/* Julius Caesar */}
      {mainTab === "julius-caesar" && (
        <div className="space-y-5">
          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-2">
            {JC_SUB_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setJcSubTab(tab.id); capture("jc_sub_tab_changed", { sub_tab: tab.id }); }}
                aria-pressed={jcSubTab === tab.id}
                className={pillClass(jcSubTab === tab.id)}
                style={{ border: "2px solid var(--outline)" }}
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
