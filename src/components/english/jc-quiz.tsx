"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarSticker } from "@/components/brand/sticker";
import { JC_MCQ_QUESTIONS } from "@/lib/julius-caesar-data";
import { CREDIT_COSTS } from "@/lib/credits";
import { useCredits } from "@/hooks/use-credits";

const QUIZ_SIZE = 10;

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function JCQuiz() {
  const jcQuizScores = useStore((s) => s.jcQuizScores);
  const update = useStore((s) => s.update);
  const { credits, canAfford, deduct } = useCredits();
  const outOfCredits = !canAfford("mcq");

  const [questions, setQuestions] = useState(() =>
    pickRandom(JC_MCQ_QUESTIONS, QUIZ_SIZE)
  );
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUIZ_SIZE).fill(null)
  );
  const [finished, setFinished] = useState(false);
  const [deducting, setDeducting] = useState(false);

  const q = questions[currentQ];

  const score = useMemo(() => {
    let s = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i]?.correctIndex) s++;
    }
    return s;
  }, [answers, questions]);

  const handleSubmit = async () => {
    if (selectedOption === null || deducting) return;
    setDeducting(true);

    const ok = await deduct("mcq");
    setDeducting(false);
    if (!ok) return;

    setSubmitted(true);
    const isCorrect = selectedOption === q.correctIndex;
    capture("jc_quiz_question_answered", {
      question_id: q.id,
      question_number: currentQ + 1,
      correct: isCorrect,
    });
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = selectedOption;
      return next;
    });
  };

  const handleNext = () => {
    if (currentQ === QUIZ_SIZE - 1) {
      // Finish quiz
      const finalAnswers = [...answers];
      finalAnswers[currentQ] = selectedOption;
      let finalScore = 0;
      for (let i = 0; i < finalAnswers.length; i++) {
        if (finalAnswers[i] === questions[i]?.correctIndex) finalScore++;
      }
      update((state) => ({
        jcQuizScores: [
          ...state.jcQuizScores,
          { score: finalScore, total: QUIZ_SIZE, timestamp: Date.now() },
        ],
      }));
      capture("jc_quiz_completed", {
        score: finalScore,
        total: QUIZ_SIZE,
        percentage: Math.round((finalScore / QUIZ_SIZE) * 100),
      });
      setFinished(true);
    } else {
      setCurrentQ((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    }
  };

  const handleRetake = () => {
    capture("jc_quiz_retake");
    setQuestions(pickRandom(JC_MCQ_QUESTIONS, QUIZ_SIZE));
    setCurrentQ(0);
    setSelectedOption(null);
    setSubmitted(false);
    setAnswers(Array(QUIZ_SIZE).fill(null));
    setFinished(false);
  };

  if (finished) {
    let finalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i]?.correctIndex) finalScore++;
    }
    const pct = Math.round((finalScore / QUIZ_SIZE) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="sm:p-6">
          <div className="flex flex-col items-center text-center py-4">
            <StarSticker size={72} />
            <p
              className="font-display text-[56px] leading-none font-extrabold tracking-[-0.02em] tabular-nums mt-3 mb-2"
              style={{
                color:
                  pct >= 70
                    ? "var(--success)"
                    : pct >= 40
                    ? "var(--warning)"
                    : "var(--danger)",
              }}
            >
              {pct}%
            </p>
            <h3
              className="font-display text-[22px] font-extrabold tracking-[-0.01em] mb-1"
              style={{ color: "var(--text)" }}
            >
              Quiz complete
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
              You scored {finalScore} out of {QUIZ_SIZE}
            </p>

            {/* Breakdown */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold tabular-nums"
                  style={{
                    background:
                      answers[i] === questions[i]?.correctIndex
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

            {jcQuizScores.length > 0 && (
              <p
                className="text-xs font-bold mb-4 tabular-nums"
                style={{ color: "var(--text-muted)" }}
              >
                Previous attempts: {jcQuizScores.length}. Best: {Math.max(...jcQuizScores.map((s) => Math.round((s.score / s.total) * 100)))}%
              </p>
            )}

            <Button onClick={handleRetake}>
              Retake quiz
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>
            Question {currentQ + 1} of {QUIZ_SIZE}
          </span>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
            {Math.round(((currentQ + 1) / QUIZ_SIZE) * 100)}%
          </span>
        </div>
        <div
          className="h-3.5 rounded-full overflow-hidden"
          style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
        >
          <motion.div
            className="h-full"
            style={{ background: "var(--primary)", boxShadow: currentQ + 1 < QUIZ_SIZE ? "inset -2px 0 0 var(--outline)" : undefined }}
            animate={{ width: `${((currentQ + 1) / QUIZ_SIZE) * 100}%` }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="sm:p-6" style={{ boxShadow: "4px 4px 0 var(--outline)" }}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <p className="text-base font-bold leading-relaxed" style={{ color: "var(--text)" }}>
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

        <div className="flex flex-col gap-2 mb-4">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = selectedOption === i;
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
                key={i}
                onClick={() => !submitted && setSelectedOption(i)}
                disabled={submitted}
                className={`w-full text-left flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-2xl text-[15px] transition-colors duration-150 cursor-pointer disabled:cursor-default ${
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
            className="rounded-2xl px-4 py-3 text-sm leading-relaxed mb-4"
            style={{
              background:
                selectedOption === q.correctIndex
                  ? "var(--success-soft)"
                  : "var(--danger-soft)",
              border: "2px solid var(--outline)",
              color: "var(--text)",
            }}
          >
            <span className="font-bold">
              {selectedOption === q.correctIndex ? "Correct." : "Incorrect."}
            </span>{" "}
            <span>{q.explanation}</span>
          </motion.div>
        )}

        {outOfCredits && !submitted && (
          <div
            className="rounded-2xl px-4 py-3 text-sm mb-4"
            style={{
              background: "var(--danger-soft)",
              border: "2px solid var(--outline)",
              color: "var(--text)",
            }}
          >
            Not enough credits. You need {CREDIT_COSTS.mcq} credits to submit an answer.
          </div>
        )}

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || outOfCredits || deducting}
          >
            {deducting ? "Checking" : "Check answer"}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {currentQ === QUIZ_SIZE - 1 ? "Finish quiz" : "Next question"}
          </Button>
        )}
      </Card>
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
