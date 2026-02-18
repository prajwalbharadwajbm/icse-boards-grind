"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { useCredits } from "@/hooks/use-credits";
import { POEMS_DATA, type PoemData } from "@/lib/poems-data";
import { CREDIT_COSTS } from "@/lib/credits";
import { Card } from "@/components/ui/card";

type StudyMode = "summary" | "line-by-line" | "word-meanings" | "literary-devices" | "qa" | "mcq-quiz";
type ReviewStatus = "needs_review" | "confident";

const STUDY_MODES: { id: StudyMode; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "line-by-line", label: "Line-by-Line" },
  { id: "word-meanings", label: "Word Meanings" },
  { id: "literary-devices", label: "Literary Devices" },
  { id: "qa", label: "Subjective Questions" },
  { id: "mcq-quiz", label: "MCQ Quiz" },
];

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
    <div className="space-y-4">
      {/* Poem selector */}
      <div className="flex flex-wrap gap-2">
        {POEMS_DATA.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => handlePoemChange(idx)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
            style={{
              background: selectedPoemIdx === idx ? "var(--primary)" : "var(--bg-card)",
              color: selectedPoemIdx === idx ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${selectedPoemIdx === idx ? "transparent" : "var(--border)"}`,
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Poem title + poet */}
      <div
        className="rounded-xl px-4 py-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>
          {poem.title}
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          by {poem.poet}
        </p>
      </div>

      {/* Study mode tabs */}
      <div className="flex flex-wrap gap-2">
        {STUDY_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
            style={{
              background:
                studyMode === mode.id ? "rgba(123,97,255,0.15)" : "var(--bg-card)",
              color: studyMode === mode.id ? "#7b61ff" : "var(--text-secondary)",
              border: `1px solid ${
                studyMode === mode.id ? "rgba(123,97,255,0.3)" : "var(--border)"
              }`,
            }}
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
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
          Summary
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          {poem.summary}
        </p>
      </div>

      <div
        className="rounded-xl p-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-sm font-bold mb-3" style={{ color: "var(--text)" }}>
          Themes
        </h3>
        <div className="flex flex-wrap gap-2">
          {poem.themes.map((theme) => (
            <span
              key={theme}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(123,97,255,0.1)",
                color: "#7b61ff",
                border: "1px solid rgba(123,97,255,0.2)",
              }}
            >
              {theme}
            </span>
          ))}
        </div>
      </div>
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
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Stanza {currentIndex + 1} of {total}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "rgba(52,168,83,0.12)", color: "#34a853" }}
        >
          {progress.confident}/{total} confident
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div className="h-full flex">
          <div
            className="h-full transition-all"
            style={{
              width: `${(progress.confident / total) * 100}%`,
              background: "#34a853",
            }}
          />
          <div
            className="h-full transition-all"
            style={{
              width: `${(progress.needsReview / total) * 100}%`,
              background: "#ea4335",
            }}
          />
        </div>
      </div>

      {/* Flashcard with 3D flip */}
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front — Poem text */}
          <div
            className="absolute inset-0 rounded-xl p-6 flex flex-col items-center justify-center text-center"
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${
                status === "needs_review"
                  ? "rgba(234,67,53,0.4)"
                  : status === "confident"
                  ? "rgba(52,168,83,0.4)"
                  : "var(--border)"
              }`,
              backfaceVisibility: "hidden",
            }}
          >
            {status && (
              <span
                className="absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background:
                    status === "needs_review"
                      ? "rgba(234,67,53,0.1)"
                      : "rgba(52,168,83,0.1)",
                  color: status === "needs_review" ? "#ea4335" : "#34a853",
                }}
              >
                {status === "needs_review" ? "Needs Review" : "Confident"}
              </span>
            )}
            <span
              className="text-xs font-bold uppercase tracking-wide mb-3"
              style={{ color: "var(--primary)" }}
            >
              Stanza {currentIndex + 1}
            </span>
            <p
              className="text-base font-serif italic leading-relaxed whitespace-pre-line mb-4"
              style={{ color: "var(--text)" }}
            >
              {stanza.lines}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Tap to reveal explanation
            </p>
          </div>

          {/* Back — Explanation */}
          <div
            className="absolute inset-0 rounded-xl p-6 flex flex-col justify-center"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--primary)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="space-y-3">
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Stanza {currentIndex + 1}
                </span>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Poem
                </span>
                <p
                  className="text-sm italic leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text)" }}
                >
                  {stanza.lines}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
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
      <div className="flex justify-center gap-3">
        <button
          onClick={() => onToggleStatus(currentIndex, "needs_review")}
          className="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
          style={{
            background:
              status === "needs_review" ? "rgba(234,67,53,0.15)" : "transparent",
            color: status === "needs_review" ? "#ea4335" : "var(--text-secondary)",
            border: `1px solid ${
              status === "needs_review" ? "rgba(234,67,53,0.3)" : "var(--border)"
            }`,
          }}
        >
          Needs Review
        </button>
        <button
          onClick={() => onToggleStatus(currentIndex, "confident")}
          className="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
          style={{
            background:
              status === "confident" ? "rgba(52,168,83,0.15)" : "transparent",
            color: status === "confident" ? "#34a853" : "var(--text-secondary)",
            border: `1px solid ${
              status === "confident" ? "rgba(52,168,83,0.3)" : "var(--border)"
            }`,
          }}
        >
          Confident
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex gap-1">
          {poem.stanzas.map((_, i) => {
            const dotKey = stanzaKey(poem.id, i);
            const dotStatus = poemReviewStatus[dotKey];
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background:
                    i === currentIndex
                      ? "var(--primary)"
                      : dotStatus === "confident"
                      ? "#34a853"
                      : dotStatus === "needs_review"
                      ? "#ea4335"
                      : "var(--border)",
                  transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigate(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2">
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
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="px-4 py-3">
        <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
          Word Meanings
        </h3>
      </div>
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {poem.wordMeanings.map((wm, idx) => (
          <div
            key={idx}
            className="px-4 py-2.5 flex gap-3"
            style={{
              borderBottom:
                idx < poem.wordMeanings.length - 1 ? "1px solid var(--border)" : undefined,
            }}
          >
            <span
              className="text-sm font-semibold shrink-0"
              style={{ color: "var(--primary)", minWidth: "140px" }}
            >
              {wm.word}
            </span>
            <span className="text-sm" style={{ color: "var(--text)" }}>
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
        <div
          key={idx}
          className="rounded-xl p-4"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
            style={{
              background: "rgba(123,97,255,0.1)",
              color: "#7b61ff",
              border: "1px solid rgba(123,97,255,0.2)",
            }}
          >
            {ld.device}
          </span>
          <p
            className="text-sm italic mb-2 leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            &ldquo;{ld.example}&rdquo;
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {ld.explanation}
          </p>
        </div>
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
    <div className="space-y-3">
      {/* Credit info */}
      <div
        className="rounded-xl px-4 py-2.5 flex items-center justify-between"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Each answer costs <strong style={{ color: "var(--text)" }}>25 credits</strong>
        </span>
        <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
          {credits} credits
        </span>
      </div>

      {poem.questions.map((qa, idx) => {
        const isRevealed = revealedQAs.has(idx);
        return (
          <div
            key={idx}
            className="rounded-xl overflow-hidden"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <button
              onClick={() => onToggle(idx)}
              className="w-full px-4 py-3 text-left flex items-start gap-3 cursor-pointer"
              disabled={!isRevealed && !canAffordQA}
              style={{ opacity: !isRevealed && !canAffordQA ? 0.5 : 1 }}
            >
              <span
                className="text-xs font-bold mt-0.5 shrink-0"
                style={{ color: "var(--primary)" }}
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
                  style={{ color: "var(--text-secondary)" }}
                >
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              ) : (
                <span
                  className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: canAffordQA ? "rgba(123,97,255,0.1)" : "rgba(234,67,53,0.1)",
                    color: canAffordQA ? "#7b61ff" : "#ea4335",
                    border: `1px solid ${canAffordQA ? "rgba(123,97,255,0.2)" : "rgba(234,67,53,0.2)"}`,
                  }}
                >
                  25 credits
                </span>
              )}
            </button>
            {isRevealed && (
              <div
                className="px-4 pb-3"
                style={{ borderTop: "1px solid var(--border)" }}
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

  if (!q || total === 0) {
    return (
      <div
        className="rounded-xl p-6 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          No MCQ questions available for this poem yet.
        </p>
      </div>
    );
  }

  const score = useMemo(() => {
    let s = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === poem.mcqs[i]?.correctIndex) s++;
    }
    return s;
  }, [answers, poem.mcqs]);

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

  if (finished) {
    let finalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === poem.mcqs[i]?.correctIndex) finalScore++;
    }
    const pct = Math.round((finalScore / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <div className="text-center py-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{
                background:
                  pct >= 70
                    ? "rgba(52,168,83,0.12)"
                    : pct >= 40
                    ? "rgba(249,171,0,0.12)"
                    : "rgba(234,67,53,0.12)",
                color:
                  pct >= 70 ? "#34a853" : pct >= 40 ? "#f9ab00" : "#ea4335",
              }}
            >
              {pct}%
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text)" }}
            >
              Quiz Complete!
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              You scored {finalScore} out of {total} — {poem.title}
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
              {poem.mcqs.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{
                    background:
                      answers[i] === poem.mcqs[i]?.correctIndex
                        ? "rgba(52,168,83,0.12)"
                        : "rgba(234,67,53,0.12)",
                    color:
                      answers[i] === poem.mcqs[i]?.correctIndex
                        ? "#34a853"
                        : "#ea4335",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <button
              onClick={handleRetake}
              className="px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              Retake Quiz
            </button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Question {currentQ + 1} of {total}
          </span>
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {Math.round(((currentQ + 1) / total) * 100)}%
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--primary)" }}
            animate={{ width: `${((currentQ + 1) / total) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <Card>
        <div className="flex items-start justify-between gap-3 mb-4">
          <p
            className="font-medium text-sm leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text)" }}
          >
            {q.question}
          </p>
          <span
            className="shrink-0 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(251,191,36,0.12)", color: "#d97706" }}
          >
            {CREDIT_COSTS.mcq}
            <img src="/coin.svg" alt="credits" width={12} height={12} />
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = selectedOption === i;
            let bg = "transparent";
            let border = "var(--border)";
            let color = "var(--text)";

            if (submitted) {
              if (isCorrect) {
                bg = "rgba(52,168,83,0.1)";
                border = "#34a853";
                color = "#34a853";
              } else if (isSelected && !isCorrect) {
                bg = "rgba(234,67,53,0.1)";
                border = "#ea4335";
                color = "#ea4335";
              }
            } else if (isSelected) {
              bg = "rgba(123,97,255,0.1)";
              border = "var(--primary)";
              color = "var(--primary)";
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelectedOption(i)}
                disabled={submitted}
                className="w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer disabled:cursor-default"
                style={{ background: bg, border: `1px solid ${border}`, color }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-3 text-sm mb-4"
            style={{
              background:
                selectedOption === q.correctIndex
                  ? "rgba(52,168,83,0.08)"
                  : "rgba(234,67,53,0.08)",
            }}
          >
            <span
              style={{
                color:
                  selectedOption === q.correctIndex ? "#34a853" : "#ea4335",
              }}
            >
              {selectedOption === q.correctIndex ? "Correct!" : "Incorrect."}
            </span>{" "}
            <span style={{ color: "var(--text)" }}>{q.explanation}</span>
          </motion.div>
        )}

        {outOfCredits && !submitted && (
          <div
            className="rounded-lg px-4 py-3 text-sm mb-3"
            style={{ background: "rgba(234,67,53,0.08)", color: "#ea4335" }}
          >
            Not enough credits — you need {CREDIT_COSTS.mcq} credits to submit an answer.
          </div>
        )}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || outOfCredits || deducting}
            className="px-5 py-2 rounded-lg text-sm font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            {deducting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            {currentQ === total - 1 ? "Finish Quiz" : "Next Question"}
          </button>
        )}
      </Card>
    </div>
  );
}
