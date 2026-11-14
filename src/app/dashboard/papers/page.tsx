"use client";

import { useMemo, useState, useEffect } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { StatChip } from "@/components/ui/stat-chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CheckSticker } from "@/components/brand/sticker";
import { getSubjectLabels, getSubjectColors, ALL_SUBJECT_LABELS, ALL_SUBJECT_COLORS } from "@/lib/constants";
import {
  PRACTICE_PAPERS,
  getPapersForSubjects,
  getAllSubjectsWithPapers,
  getAvailableYears,
  type PracticePaper,
} from "@/lib/practice-papers";

const TYPE_LABELS: Record<string, string> = {
  board: "Board",
  specimen: "Specimen",
  practice: "Practice",
};

export default function PapersPage() {
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const solvedPapers = useStore((s) => s.solvedPapers) || [];
  const update = useStore((s) => s.update);

  const subjectLabels = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);
  const subjectColors = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);
  const fullSubjectLabels = useMemo(() => ({ ...ALL_SUBJECT_LABELS, ...subjectLabels }), [subjectLabels]);
  const fullSubjectColors = useMemo(() => ({ ...ALL_SUBJECT_COLORS, ...subjectColors }), [subjectColors]);
  const subjectKeys = useMemo(() => Object.keys(subjectLabels), [subjectLabels]);
  const allSubjectKeys = useMemo(() => getAllSubjectsWithPapers(), []);
  const availableYears = useMemo(() => getAvailableYears(), []);

  useEffect(() => {
    capture("papers_page_viewed");
  }, []);

  // Toggle: show only my subjects vs all papers
  const [showAllPapers, setShowAllPapers] = useState(false);
  const effectiveSubjectKeys = showAllPapers ? allSubjectKeys : subjectKeys;

  // Track filter changes
  useEffect(() => {
    if (showAllPapers) {
      capture("papers_show_all_toggled", { show_all: true });
    }
  }, [showAllPapers]);

  // All papers relevant to selected scope (my subjects or all)
  const userPapers = useMemo(() => getPapersForSubjects(effectiveSubjectKeys), [effectiveSubjectKeys]);

  // Filter state
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Filtered papers
  const filteredPapers = useMemo(() => {
    let papers = userPapers;
    if (filterSubject) papers = papers.filter((p) => p.subject === filterSubject);
    if (filterYear) papers = papers.filter((p) => p.year === filterYear);
    if (filterType) papers = papers.filter((p) => p.type === filterType);
    return papers;
  }, [userPapers, filterSubject, filterYear, filterType]);

  // Stats
  const solvedCount = useMemo(
    () => userPapers.filter((p) => solvedPapers.includes(p.id)).length,
    [userPapers, solvedPapers]
  );
  const totalCount = userPapers.length;
  const completionPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Per-subject stats (use effectiveSubjectKeys when showing all)
  const subjectStats = useMemo(() => {
    const stats: { key: string; label: string; color: string; solved: number; total: number }[] = [];
    for (const key of effectiveSubjectKeys) {
      const papers = userPapers.filter((p) => p.subject === key);
      if (papers.length === 0) continue;
      const solved = papers.filter((p) => solvedPapers.includes(p.id)).length;
      stats.push({
        key,
        label: fullSubjectLabels[key] || subjectLabels[key] || key,
        color: (showAllPapers ? fullSubjectColors : subjectColors)[key] || "var(--text-muted)",
        solved,
        total: papers.length,
      });
    }
    return stats.sort((a, b) => b.total - a.total);
  }, [effectiveSubjectKeys, userPapers, solvedPapers, subjectLabels, subjectColors, fullSubjectLabels, fullSubjectColors, showAllPapers]);

  // Subjects that actually have papers (for filter pills)
  const subjectsWithPapers = useMemo(
    () => subjectStats.map((s) => s.key),
    [subjectStats]
  );

  const labelsForDisplay = showAllPapers ? fullSubjectLabels : subjectLabels;
  const colorsForDisplay = showAllPapers ? fullSubjectColors : subjectColors;

  // The one sticker on this screen: the most recently solved paper
  const latestSolvedId = solvedPapers.length > 0 ? solvedPapers[solvedPapers.length - 1] : null;

  const toggleSolved = (paperId: string) => {
    const wasSolved = solvedPapers.includes(paperId);
    const paper = userPapers.find((p) => p.id === paperId);
    update((state) => {
      const current = state.solvedPapers || [];
      if (current.includes(paperId)) {
        return { solvedPapers: current.filter((id) => id !== paperId) };
      }
      return { solvedPapers: [...current, paperId] };
    });
    capture(wasSolved ? "paper_unsolved" : "paper_solved", {
      paper_id: paperId,
      subject: paper?.subject,
      year: paper?.year,
      type: paper?.type,
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-baseline gap-x-3 gap-y-1 flex-wrap">
        <h1 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>
          Practice papers
        </h1>
        <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
          {solvedCount}/{totalCount} solved
        </span>
      </div>

      {/* Filter Bar */}
      <div className="space-y-3">
        {/* My subjects vs All papers toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <FilterPill
            label="My subjects"
            active={!showAllPapers}
            onClick={() => setShowAllPapers(false)}
          />
          <FilterPill
            label="All papers"
            active={showAllPapers}
            onClick={() => setShowAllPapers(true)}
          />
        </div>
        {/* Subject pills */}
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All subjects"
            active={filterSubject === null}
            onClick={() => setFilterSubject(null)}
          />
          {subjectsWithPapers.map((key) => (
            <FilterPill
              key={key}
              label={labelsForDisplay[key] || key}
              active={filterSubject === key}
              onClick={() => setFilterSubject(filterSubject === key ? null : key)}
              dot={colorsForDisplay[key]}
            />
          ))}
        </div>

        {/* Year + Type pills */}
        <div className="flex flex-wrap gap-2">
          <FilterPill
            label="All years"
            active={filterYear === null}
            onClick={() => setFilterYear(null)}
          />
          {availableYears.map((y) => (
            <FilterPill
              key={y}
              label={String(y)}
              active={filterYear === y}
              onClick={() => setFilterYear(filterYear === y ? null : y)}
            />
          ))}
          <span className="w-0.5 h-6 mx-1 rounded-full self-center" style={{ background: "var(--divider)" }} aria-hidden="true" />
          <FilterPill
            label="All types"
            active={filterType === null}
            onClick={() => setFilterType(null)}
          />
          {(["board", "specimen", "practice"] as const).map((t) => (
            <FilterPill
              key={t}
              label={TYPE_LABELS[t]}
              active={filterType === t}
              onClick={() => setFilterType(filterType === t ? null : t)}
            />
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatChip label="Papers solved" value={solvedCount} />
        <StatChip label="Total papers" value={totalCount} />
        <StatChip label="Completion" value={`${completionPct}%`}>
          <OutlinedBar pct={completionPct} fill="var(--mint)" />
        </StatChip>
      </div>

      {/* Subject Progress */}
      {subjectStats.length > 0 && (
        <Card>
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-4" style={{ color: "var(--text)" }}>
            Papers by subject
          </h3>
          <div className="space-y-3">
            {subjectStats.map((s) => (
              <div key={s.key} className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.color }}
                />
                <span
                  className="text-sm font-medium w-32 shrink-0 truncate"
                  style={{ color: "var(--text)" }}
                >
                  {s.label}
                </span>
                <div className="flex-1">
                  <ProgressBar
                    value={s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0}
                    color={s.color}
                  />
                </div>
                <span
                  className="text-xs font-bold tabular-nums w-12 text-right"
                  style={{ color: "var(--text-muted)" }}
                >
                  {s.solved}/{s.total}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Paper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPapers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            solved={solvedPapers.includes(paper.id)}
            latest={paper.id === latestSolvedId}
            subjectLabel={labelsForDisplay[paper.subject] || paper.subject}
            subjectColor={colorsForDisplay[paper.subject] || "var(--text-muted)"}
            onToggle={() => toggleSolved(paper.id)}
          />
        ))}
        {filteredPapers.length === 0 && (
          <div
            className="col-span-full rounded-2xl px-4 py-10 text-center text-sm"
            style={{ border: "2px solid var(--outline)", color: "var(--text-secondary)" }}
          >
            No papers match these filters. Clear a filter to see more.
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  dot,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dot?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm border-2 border-[var(--outline)] transition-colors duration-150 cursor-pointer ${
        active
          ? "bg-[var(--text)] text-[var(--bg)] font-bold"
          : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
      }`}
      aria-pressed={active}
    >
      {dot && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />}
      {label}
    </button>
  );
}

function PaperCard({
  paper,
  solved,
  latest,
  subjectLabel,
  subjectColor,
  onToggle,
}: {
  paper: PracticePaper;
  solved: boolean;
  /** The most recently solved paper carries the screen's one sticker */
  latest: boolean;
  subjectLabel: string;
  subjectColor: string;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-[20px] p-5 flex flex-col"
      style={{
        background: "var(--bg-card)",
        border: "2px solid var(--outline)",
      }}
    >
      {/* Top row: type badge + year */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>
          {TYPE_LABELS[paper.type]}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
          {paper.year}
        </span>
      </div>

      {/* Title (links to respaper) */}
      <a
        href={paper.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => capture("paper_opened", { paper_id: paper.id, subject: paper.subject, year: paper.year, type: paper.type, source: paper.source })}
        className="block flex-1 text-[15px] font-bold mb-4 hover:underline underline-offset-4 decoration-2"
        style={{ color: "var(--text)" }}
      >
        {paper.title}
      </a>

      {/* Bottom row: subject + solved toggle */}
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[13px] font-medium min-w-0" style={{ color: "var(--text-secondary)" }}>
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColor }} />
          <span className="truncate">{subjectLabel}</span>
        </span>
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 h-9 rounded-full text-sm border-2 border-[var(--outline)] transition-colors duration-150 cursor-pointer shrink-0 ${
            solved
              ? `bg-[var(--success-soft)] text-[var(--text)] font-bold ${latest ? "pl-1 pr-4" : "px-4"}`
              : "px-4 bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
          }`}
          aria-pressed={solved}
        >
          {solved ? (
            latest ? (
              <CheckSticker size={28} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="5 12.5 10 17.5 19 7.5" />
              </svg>
            )
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
            </svg>
          )}
          {solved ? "Solved" : "Mark as solved"}
        </button>
      </div>
    </div>
  );
}

/* ── An outlined progress bar, filled with a sticker colour ── */

function OutlinedBar({ pct, fill }: { pct: number; fill: string }) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <div
      className="h-3.5 rounded-full overflow-hidden mt-1"
      style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: "100%", transform: `scaleX(${value / 100})`, background: fill, boxShadow: value > 0 && value < 100 ? "inset -2px 0 0 var(--outline)" : undefined }}
      />
    </div>
  );
}
