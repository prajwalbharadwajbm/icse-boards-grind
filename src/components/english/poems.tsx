"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { useCredits } from "@/hooks/use-credits";
import { POEMS_DATA, type PoemData } from "@/lib/poems-data";
import { CREDIT_COSTS } from "@/lib/credits";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StarSticker } from "@/components/brand/sticker";

const EASE = [0.22, 1, 0.36, 1] as const;

type StudyMode = "summary" | "line-by-line" | "word-meanings" | "literary-devices" | "qa" | "mcq-quiz";
type ReviewStatus = "needs_review" | "confident";

const STUDY_MODES: { id: StudyMode; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "line-by-line", label: "Line-by-line" },
  { id: "word-meanings", label: "Word meanings" },
  { id: "literary-devices", label: "Literary devices" },
  { id: "qa", label: "Subjective questions" },
  { id: "mcq-quiz", label: "MCQ quiz" },
];

/** Sticker pill for chips and tabs: outlined, the active one is solid ink */
function pillClass(active: boolean) {
  return `h-9 px-4 rounded-full text-sm border-2 border-[var(--outline)] transition-colors cursor-pointer ${
    active
      ? "bg-[var(--text)] text-[var(--bg)] font-bold"
      : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
  }`;
}

function stanzaKey(poemId: string, idx: number) {
  return `${poemId}:${idx}`;
}

export function Poems() {
  const poemReviewStatus = useStore((s) => s.poemReviewStatus);
  const update = useStore((s) => s.update);
  const { credits, canAfford, deduct } = useCredits();

  const [selectedPoemIdx, setSelectedPoemIdx] = useState(0);
  const [studyMode, setStudyMode] = useState<StudyMode>("summary");
  const [revealedQAs, setRevealedQAs] = useState<Set<number>>(new Set());

  const poem = POEMS_DATA[selectedPoemIdx];

  const handlePoemChange = (idx: number) => {
    setSelectedPoemIdx(idx);
    setStudyMode("summary");
    setRevealedQAs(new Set());
    capture("poem_selected", { poem_id: POEMS_DATA[idx].id, title: POEMS_DATA[idx].title });
  };

  const handleModeChange = (mode: StudyMode) => {
    setStudyMode(mode);
    setRevealedQAs(new Set());
    capture("poem_study_mode_changed", { poem_id: poem.id, mode });
  };

  const toggleStanzaStatus = (stanzaIdx: number, status: ReviewStatus) => {
    const key = stanzaKey(poem.id, stanzaIdx);
    const current = poemReviewStatus[key];
    const newStatus = current === status ? undefined : status;

    capture("poem_stanza_status_changed", {
      poem_id: poem.id,
      stanza_index: stanzaIdx,
      status: newStatus ?? "unmarked",
    });

    update((s) => {
      const next = { ...s.poemReviewStatus };
      if (newStatus) {
        next[key] = newStatus;
      } else {
        delete next[key];
      }
      return { poemReviewStatus: next };
    });
  };

  const toggleQA = async (idx: number) => {
    // If already revealed, just collapse
    if (revealedQAs.has(idx)) {
      setRevealedQAs((prev) => {
        const next = new Set(prev);
        next.delete(idx);
        return next;
      });
      return;
    }

    // Deduct credits to reveal
    if (!canAfford("poem_qa")) return;
    const ok = await deduct("poem_qa");
    if (!ok) return;

    setRevealedQAs((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
    capture("poem_qa_revealed", { poem_id: poem.id, question_index: idx });
  };

  // Progress for line-by-line
  const stanzaProgress = useMemo(() => {
    let confident = 0;
    let needsReview = 0;
    for (let i = 0; i < poem.stanzas.length; i++) {
      const key = stanzaKey(poem.id, i);
      const st = poemReviewStatus[key];
      if (st === "confident") confident++;
      if (st === "needs_review") needsReview++;
    }
    return { total: poem.stanzas.length, confident, needsReview };
  }, [poem, poemReviewStatus]);

  return (
    <div className="space-y-6">
      {/* Poem selector */}
      <div className="flex flex-wrap gap-2">
        {POEMS_DATA.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handlePoemChange(idx)}
            aria-pressed={selectedPoemIdx === idx}
            className={pillClass(selectedPoemIdx === idx)}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Poem title + poet */}
      <div
        className="rounded-[20px] px-5 py-4"
        style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
      >
        <h2
          className="font-display text-[22px] font-extrabold tracking-[-0.01em] leading-tight"
          style={{ color: "var(--text)" }}
        >
          {poem.title}
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          by {poem.poet}
        </p>
      </div>

      {/* Study mode tabs */}
      <div className="flex flex-wrap gap-2">
        {STUDY_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            aria-pressed={studyMode === mode.id}
            className={pillClass(studyMode === mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {studyMode === "summary" && <SummaryView poem={poem} />}
      {studyMode === "line-by-line" && (
        <LineByLineView
          poem={poem}
          poemReviewStatus={poemReviewStatus}
          progress={stanzaProgress}
          onToggleStatus={toggleStanzaStatus}
        />
      )}
      {studyMode === "word-meanings" && <WordMeaningsView poem={poem} />}
      {studyMode === "literary-devices" && <LiteraryDevicesView poem={poem} />}
      {studyMode === "qa" && (
        <QAView
          poem={poem}
          revealedQAs={revealedQAs}
          onToggle={toggleQA}
          credits={credits}
          canAffordQA={canAfford("poem_qa")}
        />
      )}
      {studyMode === "mcq-quiz" && <PoemMCQQuiz poem={poem} />}
    </div>
  );
}

/* ─── Summary View ─────────────────────────────────────────────────────────── */

function SummaryView({ poem }: { poem: PoemData }) {
  return (
    <div className="space-y-4">
      <Card>
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em] mb-2"
          style={{ color: "var(--text)" }}
        >
          Summary
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          {poem.summary}
        </p>
      </Card>

      <Card>
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em] mb-3"
          style={{ color: "var(--text)" }}
        >
          Themes
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {poem.themes.map((theme) => (
            <span
              key={theme}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--text-muted)" }}
                aria-hidden="true"
              />
              {theme}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─── Line-by-Line Flashcard View ──────────────────────────────────────────── */

function LineByLineView({
  poem,
  poemReviewStatus,
  progress,
  onToggleStatus,
}: {
  poem: PoemData;
  poemReviewStatus: Record<string, ReviewStatus>;
  progress: { total: number; confident: number; needsReview: number };
  onToggleStatus: (idx: number, status: ReviewStatus) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const stanza = poem.stanzas[currentIndex];
  const total = poem.stanzas.length;
  const key = stanzaKey(poem.id, currentIndex);
  const status = poemReviewStatus[key];

  const handleFlip = () => setFlipped((f) => !f);

  const navigate = (dir: -1 | 1) => {
    setFlipped(false);
    setCurrentIndex((i) => {
      const next = i + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
          Stanza {currentIndex + 1} of {total}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color: "var(--success)" }}>
          {progress.confident}/{total} confident
        </span>
      </div>

      {/* Progress bar: confident in mint, needs review in tomato */}
      <div
        className="w-full h-3.5 rounded-full overflow-hidden"
        style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }}
      >
        <div className="h-full flex">
          <div
            className="h-full transition-[width]"
            style={{
              width: `${(progress.confident / total) * 100}%`,
              background: "var(--mint)",
              boxShadow:
                progress.confident > 0 && progress.confident < total
                  ? "inset -2px 0 0 var(--outline)"
                  : undefined,
            }}
          />
          <div
            className="h-full transition-[width]"
            style={{
              width: `${(progress.needsReview / total) * 100}%`,
              background: "var(--tomato)",
              boxShadow:
                progress.needsReview > 0 && progress.confident + progress.needsReview < total
                  ? "inset -2px 0 0 var(--outline)"
                  : undefined,
            }}
          />
        </div>
      </div>

      {/* Flashcard with 3D flip: the one pop element on this screen */}
      <div
        className="relative mx-auto w-full"
        style={{ perspective: "1000px", maxWidth: 560 }}
      >
        <motion.div
          onClick={handleFlip}
          className="cursor-pointer w-full"
          style={{
            transformStyle: "preserve-3d",
            minHeight: 280,
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {/* Front — Poem text */}
          <div
            className="absolute inset-0 rounded-[24px] p-6 flex flex-col items-center justify-center text-center"
            style={{
              background: "var(--bg-card)",
              border: "2px solid var(--outline)",
              boxShadow: "4px 4px 0 var(--outline)",
              backfaceVisibility: "hidden",
            }}
          >
            {status && (
              <span
                className="absolute top-4 right-5 text-xs font-bold"
                style={{
                  color: status === "needs_review" ? "var(--danger)" : "var(--success)",
                }}
              >
                {status === "needs_review" ? "Needs review" : "Confident"}
              </span>
            )}
            <span
              className="text-[13px] font-medium mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Stanza {currentIndex + 1}
            </span>
            <p
              className="text-base font-serif italic leading-relaxed whitespace-pre-line mb-4"
              style={{ color: "var(--text)" }}
            >
              {stanza.lines}
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Tap to reveal explanation
            </p>
          </div>

          {/* Back — Explanation */}
          <div
            className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-center"
            style={{
              background: "var(--bg-card)",
              border: "2px solid var(--outline)",
              // The flip mirrors this face, so a left offset lands bottom-right like the front
              boxShadow: "-4px 4px 0 var(--outline)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="space-y-3">
              <div>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Stanza {currentIndex + 1}
                </span>
              </div>
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Poem
                </span>
                <p
                  className="text-sm font-serif italic leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text)" }}
                >
                  {stanza.lines}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Explanation
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {stanza.explanation}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onToggleStatus(currentIndex, "needs_review")}
          aria-pressed={status === "needs_review"}
          className={`h-9 px-4 rounded-full text-sm border-2 border-[var(--outline)] text-[var(--text)] transition-colors cursor-pointer ${
            status === "needs_review"
              ? "bg-[var(--danger-soft)] font-bold"
              : "bg-[var(--bg-card)] font-medium hover:bg-[var(--paper)]"
          }`}
        >
          Needs review
        </button>
        <button
          onClick={() => onToggleStatus(currentIndex, "confident")}
          aria-pressed={status === "confident"}
          className={`h-9 px-4 rounded-full text-sm border-2 border-[var(--outline)] text-[var(--text)] transition-colors cursor-pointer ${
            status === "confident"
              ? "bg-[var(--success-soft)] font-bold"
              : "bg-[var(--bg-card)] font-medium hover:bg-[var(--paper)]"
          }`}
        >
          Confident
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous stanza"
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 border-[var(--outline)] bg-[var(--bg-card)] hover:bg-[var(--paper)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {poem.stanzas.map((_, i) => {
            const dotKey = stanzaKey(poem.id, i);
            const dotStatus = poemReviewStatus[dotKey];
            return (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-[width,background-color] ${
                  i === currentIndex ? "w-5" : "w-2.5"
                }`}
                style={{
                  border: "2px solid var(--outline)",
                  background:
                    i === currentIndex
                      ? "var(--text)"
                      : dotStatus === "confident"
                      ? "var(--mint)"
                      : dotStatus === "needs_review"
                      ? "var(--tomato)"
                      : "var(--bg-card)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigate(1)}
          aria-label="Next stanza"
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors border-2 border-[var(--outline)] bg-[var(--bg-card)] hover:bg-[var(--paper)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Word Meanings View ───────────────────────────────────────────────────── */

function WordMeaningsView({ poem }: { poem: PoemData }) {
  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
    >
      <div className="px-5 py-4">
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em]"
          style={{ color: "var(--text)" }}
        >
          Word meanings
        </h3>
      </div>
      <div style={{ borderTop: "1px solid var(--divider)" }}>
        {poem.wordMeanings.map((wm, idx) => (
          <div
            key={idx}
            className="px-5 py-3 flex gap-4"
            style={{
              borderBottom:
                idx < poem.wordMeanings.length - 1 ? "1px solid var(--divider)" : undefined,
            }}
          >
            <span
              className="text-sm font-bold shrink-0"
              style={{ color: "var(--text)", minWidth: "140px" }}
            >
              {wm.word}
            </span>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {wm.meaning}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Literary Devices View ────────────────────────────────────────────────── */

function LiteraryDevicesView({ poem }: { poem: PoemData }) {
  return (
    <div className="space-y-3">
      {poem.literaryDevices.map((ld, idx) => (
        <Card key={idx}>
          <span
            className="block font-display text-lg font-extrabold tracking-[-0.01em] mb-2"
            style={{ color: "var(--text)" }}
          >
            {ld.device}
          </span>
          <p
            className="text-sm font-serif italic mb-2 leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            &ldquo;{ld.example}&rdquo;
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {ld.explanation}
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ─── Q&A View (credit-gated) ──────────────────────────────────────────────── */

function QAView({
  poem,
  revealedQAs,
  onToggle,
  credits,
  canAffordQA,
}: {
  poem: PoemData;
  revealedQAs: Set<number>;
  onToggle: (idx: number) => void;
  credits: number;
  canAffordQA: boolean;
}) {
  return (
    <div className="space-y-2.5">
      {/* Credit info */}
      <div
        className="rounded-2xl px-4 py-3 flex items-center justify-between gap-3"
        style={{ background: "var(--paper)", border: "2px solid var(--outline)" }}
      >
        <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
          Each answer costs <strong className="font-bold" style={{ color: "var(--text)" }}>25 credits</strong>
        </span>
        <span className="text-[13px] font-bold tabular-nums" style={{ color: "var(--text)" }}>
          {credits} credits
        </span>
      </div>

      {poem.questions.map((qa, idx) => {
        const isRevealed = revealedQAs.has(idx);
        return (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
          >
            <button
              onClick={() => onToggle(idx)}
              aria-expanded={isRevealed}
              className="w-full min-h-[52px] px-4 py-4 text-left flex items-start gap-3 cursor-pointer transition-colors enabled:hover:bg-[var(--paper)] disabled:cursor-not-allowed"
              disabled={!isRevealed && !canAffordQA}
              style={{ opacity: !isRevealed && !canAffordQA ? 0.5 : 1 }}
            >
              <span
                className="text-xs font-bold mt-0.5 shrink-0 tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                Q{idx + 1}.
              </span>
              <span className="text-sm font-medium flex-1" style={{ color: "var(--text)" }}>
                {qa.question}
              </span>
              {isRevealed ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 ml-auto mt-0.5"
                  style={{ color: "var(--text)" }}
                >
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              ) : (
                <span
                  className="shrink-0 text-xs font-bold tabular-nums whitespace-nowrap mt-0.5"
                  style={{ color: canAffordQA ? "var(--text-muted)" : "var(--danger)" }}
                >
                  25 credits
                </span>
              )}
            </button>
            {isRevealed && (
              <div
                className="px-4 pb-4"
                style={{ borderTop: "1px solid var(--divider)" }}
              >
                <p className="text-sm leading-relaxed pt-3" style={{ color: "var(--text)" }}>
                  {qa.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Poem MCQ Quiz ───────────────────────────────────────────────────────── */

function PoemMCQQuiz({ poem }: { poem: PoemData }) {
  const { canAfford, deduct } = useCredits();
  const outOfCredits = !canAfford("mcq");

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(poem.mcqs.length).fill(null)
  );
  const [finished, setFinished] = useState(false);
  const [deducting, setDeducting] = useState(false);

  const total = poem.mcqs.length;
  const q = poem.mcqs[currentQ];

  const handleSubmit = async () => {
    if (selectedOption === null || deducting) return;
    setDeducting(true);
    const ok = await deduct("mcq");
    setDeducting(false);
    if (!ok) return;

    setSubmitted(true);
    const isCorrect = selectedOption === q.correctIndex;
    capture("poem_mcq_answered", {
      poem_id: poem.id,
      question_id: q.id,
      correct: isCorrect,
    });
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = selectedOption;
      return next;
    });
  };

  const handleNext = () => {
    if (currentQ === total - 1) {
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selectedOption;
      let finalScore = 0;
      for (let i = 0; i < finalAnswers.length; i++) {
        if (finalAnswers[i] === poem.mcqs[i]?.correctIndex) finalScore++;
      }
      capture("poem_mcq_completed", {
        poem_id: poem.id,
        score: finalScore,
        total,
        percentage: Math.round((finalScore / total) * 100),
      });
      setFinished(true);
    } else {
      setCurrentQ((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers(Array(total).fill(null));
    setFinished(false);
  };

  if (!q || total === 0) {
    return (
      <div
        className="rounded-[20px] p-6 text-center"
        style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          No MCQ questions for this poem yet. Try another study mode.
        </p>
      </div>
    );
  }

  if (finished) {
    let finalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === poem.mcqs[i]?.correctIndex) finalScore++;
    }
    const pct = Math.round((finalScore / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <Card>
          <div className="text-center py-6">
            <div className="flex justify-center mb-3">
              <StarSticker size={72} />
            </div>
            <div
              className="font-display text-[44px] leading-none font-extrabold tabular-nums mb-3"
              style={{
                color:
                  pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)",
              }}
            >
              {pct}%
            </div>
            <h3
              className="font-display text-[22px] font-extrabold tracking-[-0.01em] mb-1"
              style={{ color: "var(--text)" }}
            >
              Quiz complete
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
              You scored {finalScore} out of {total} on {poem.title}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {poem.mcqs.map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold tabular-nums"
                  style={{
                    background:
                      answers[i] === poem.mcqs[i]?.correctIndex
                        ? "var(--success-soft)"
                        : "var(--danger-soft)",
                    border: "2px solid var(--outline)",
                    color: "var(--text)",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <Button onClick={handleRetake}>Retake quiz</Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Question {currentQ + 1} of {total}
          </span>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
            {Math.round(((currentQ + 1) / total) * 100)}%
          </span>
        </div>
        <ProgressBar value={((currentQ + 1) / total) * 100} />
      </div>

      {/* Question: the one pop element on this screen */}
      <Card style={{ boxShadow: "4px 4px 0 var(--outline)" }}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <p
            className="text-base font-bold leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text)" }}
          >
            {q.question}
          </p>
          <span
            className="shrink-0 flex items-center gap-1 text-xs font-bold tabular-nums mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            {CREDIT_COSTS.mcq}
            <img src="/coin.svg" alt="credits" width={12} height={12} />
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = selectedOption === i;
            let stateClass = "bg-[var(--bg-card)] enabled:hover:bg-[var(--paper)]";

            if (submitted) {
              if (isCorrect) {
                stateClass = "bg-[var(--success-soft)]";
              } else if (isSelected && !isCorrect) {
                stateClass = "bg-[var(--danger-soft)]";
              }
            } else if (isSelected) {
              stateClass = "bg-[var(--primary-light)]";
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelectedOption(i)}
                disabled={submitted}
                className={`w-full min-h-[52px] text-left px-4 py-3 rounded-2xl text-sm font-medium flex items-center justify-between gap-3 border-2 border-[var(--outline)] text-[var(--text)] transition-colors cursor-pointer disabled:cursor-default ${stateClass}`}
              >
                <span>{opt}</span>
                {submitted && isCorrect && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-2xl p-4 text-sm leading-relaxed mb-4"
            style={{
              background:
                selectedOption === q.correctIndex
                  ? "var(--success-soft)"
                  : "var(--danger-soft)",
              border: "2px solid var(--outline)",
            }}
          >
            <span className="font-bold" style={{ color: "var(--text)" }}>
              {selectedOption === q.correctIndex ? "Correct" : "Incorrect"}
            </span>{" "}
            <span style={{ color: "var(--text)" }}>{q.explanation}</span>
          </motion.div>
        )}

        {outOfCredits && !submitted && (
          <div
            className="rounded-2xl px-4 py-3 text-sm font-medium mb-3"
            style={{ background: "var(--danger-soft)", border: "2px solid var(--outline)", color: "var(--text)" }}
          >
            Not enough credits. You need {CREDIT_COSTS.mcq} credits to submit an answer.
          </div>
        )}

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || outOfCredits || deducting}
          >
            {deducting ? "Submitting…" : "Submit answer"}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQ === total - 1 ? "Finish quiz" : "Next question"}
          </Button>
        )}
      </Card>
    </div>
  );
}
