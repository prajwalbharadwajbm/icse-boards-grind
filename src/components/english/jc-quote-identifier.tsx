"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capture } from "@/lib/analytics";
import { JC_QUOTES } from "@/lib/julius-caesar-data";
import { Button } from "@/components/ui/button";

export function JCQuoteIdentifier() {
  const shuffledQuotes = useMemo(() => {
    const arr = [...JC_QUOTES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // eslint-disable-line react-hooks/purity -- intentional shuffle on mount
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const quote = shuffledQuotes[currentIndex];

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    setTotalAnswered((t) => t + 1);
    const isCorrect = selectedOption === quote.correctSpeaker;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    capture("jc_quote_answered", {
      quote_id: quote.id,
      correct: isCorrect,
      act: quote.act,
      scene: quote.scene,
    });
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setCurrentIndex((i) => (i + 1) % shuffledQuotes.length);
  };

  const handleReset = () => {
    capture("jc_quote_reset", { score, total: totalAnswered });
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setTotalAnswered(0);
  };

  return (
    <div className="space-y-4">
      {/* Score */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>
          Quote {currentIndex + 1} of {shuffledQuotes.length}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: "var(--text-muted)" }}
          >
            Score {score}/{totalAnswered}
          </span>
          {totalAnswered > 0 && (
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={quote.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[24px] p-5 sm:p-6"
          style={{
            background: "var(--bg-card)",
            border: "2px solid var(--outline)",
            boxShadow: "4px 4px 0 var(--outline)",
          }}
        >
          <p
            className="text-lg font-serif italic leading-relaxed mb-2"
            style={{ color: "var(--text)" }}
          >
            &ldquo;{quote.quote}&rdquo;
          </p>
          <p className="text-sm font-bold mb-4" style={{ color: "var(--text-secondary)" }}>
            Who said this?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {quote.options.map((opt) => {
              const isCorrect = opt === quote.correctSpeaker;
              const isSelected = selectedOption === opt;
              let bg: string | undefined;

              if (submitted) {
                if (isCorrect) {
                  bg = "var(--success-soft)";
                } else if (isSelected && !isCorrect) {
                  bg = "var(--danger-soft)";
                }
              } else if (isSelected) {
                bg = "var(--primary-light)";
              }
              const showCheck = submitted && isCorrect;

              return (
                <button
                  key={opt}
                  onClick={() => !submitted && setSelectedOption(opt)}
                  disabled={submitted}
                  className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-2xl text-[15px] transition-colors duration-150 cursor-pointer disabled:cursor-default text-left ${
                    bg ? "" : "bg-[var(--bg-card)] enabled:hover:bg-[var(--paper)]"
                  } ${isSelected || showCheck ? "font-bold" : ""}`}
                  style={{ background: bg, border: "2px solid var(--outline)", color: "var(--text)" }}
                >
                  <span className="flex-1 min-w-0">{opt}</span>
                  {showCheck && <CheckGlyph />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-bold mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Act {quote.act}, Scene {quote.scene}
            </motion.div>
          )}

          {!submitted ? (
            <Button onClick={handleSubmit} disabled={!selectedOption}>
              Check answer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next quote
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Marks the right answer once it is checked */
function CheckGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-label="Correct answer" role="img">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
