"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sendChatCompletionSync } from "@/lib/ai-service";
import {
  GRAMMAR_CATEGORIES,
  getGrammarPrompt,
  parseGrammarResponse,
  type ParsedGrammarQuestion,
} from "@/lib/grammar-prompts";
import { getEffectiveAIKey } from "@/lib/utils";
import { CREDIT_COSTS } from "@/lib/credits";
import { useCredits } from "@/hooks/use-credits";

export function GrammarDrill() {
  const grokApiKey = useStore((s) => s.grokApiKey);
  const grammarDrillStats = useStore((s) => s.grammarDrillStats);
  const update = useStore((s) => s.update);
  const { credits, canAfford, deduct } = useCredits();
  const outOfCredits = !canAfford("mcq");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<ParsedGrammarQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [deducting, setDeducting] = useState(false);
  const recentGrammarQuestions = useStore((s) => s.recentGrammarQuestions);

  const generateQuestion = useCallback(
    async (categoryId: string) => {
      setLoading(true);
      setError(null);
      setQuestion(null);
      setSelectedOption(null);
      setSubmitted(false);

      try {
        const recent = recentGrammarQuestions[categoryId] || [];
        const prompt = getGrammarPrompt(categoryId, recent);
        const effectiveKey = getEffectiveAIKey(grokApiKey);
        const response = await sendChatCompletionSync(effectiveKey, [
          { role: "user", content: prompt },
        ], "grammar");
        const parsed = parseGrammarResponse(response);
        if (!parsed) {
          setError("Could not parse AI response. Try again.");
          return;
        }
        setQuestion(parsed);
        update((state) => {
          const prev = { ...state.recentGrammarQuestions };
          const list = prev[categoryId] || [];
          prev[categoryId] = [...list, parsed.question].slice(-10);
          return { recentGrammarQuestions: prev };
        });
        capture("grammar_question_generated", { category: categoryId });
      } catch (err) {
        setError((err as Error).message);
        capture("grammar_question_failed", { category: categoryId, error: (err as Error).message });
      } finally {
        setLoading(false);
      }
    },
    [grokApiKey, recentGrammarQuestions, update]
  );

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    capture("grammar_category_selected", { category: id });
    generateQuestion(id);
  };

  const handleSubmit = async () => {
    if (selectedOption === null || !question || !selectedCategory || deducting) return;
    setDeducting(true);

    const ok = await deduct("mcq");
    setDeducting(false);
    if (!ok) return;

    setSubmitted(true);

    const isCorrect = selectedOption === question.correctIndex;
    capture("grammar_question_answered", {
      category: selectedCategory,
      correct: isCorrect,
    });

    update((state) => {
      const stats = { ...state.grammarDrillStats };
      const prev = stats[selectedCategory] || { attempted: 0, correct: 0 };
      stats[selectedCategory] = {
        attempted: prev.attempted + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
      };
      return { grammarDrillStats: stats };
    });
  };

  return (
    <div className="space-y-4">
      {/* Free AI banner */}
      {!selectedCategory && (
        <div
          className="rounded-2xl px-4 py-3 text-sm font-medium"
          style={{
            background: "var(--success-soft)",
            border: "2px solid var(--outline)",
            color: "var(--text)",
          }}
        >
          AI grammar drills are free for the next 4 days. No API key needed.
        </div>
      )}

      {/* Category Selection */}
      {!selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {GRAMMAR_CATEGORIES.map((cat) => {
            const stats = grammarDrillStats[cat.id];
            const accuracy =
              stats && stats.attempted > 0
                ? Math.round((stats.correct / stats.attempted) * 100)
                : null;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="text-left rounded-[20px] p-4 bg-[var(--bg-card)] transition-colors duration-150 hover:bg-[var(--paper)] cursor-pointer"
                style={{ border: "2px solid var(--outline)" }}
              >
                <p
                  className="font-display text-lg font-extrabold tracking-[-0.01em] leading-tight mb-1"
                  style={{ color: "var(--text)" }}
                >
                  {cat.label}
                </p>
                <p
                  className="text-[13px] mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {cat.description}
                </p>
                {stats && (
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{
                        color:
                          accuracy !== null && accuracy >= 70
                            ? "var(--success)"
                            : "var(--danger)",
                      }}
                    >
                      {accuracy}% accuracy
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stats.attempted} attempted
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Active Drill */}
      {selectedCategory && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                capture("grammar_back_to_categories");
                setSelectedCategory(null);
                setQuestion(null);
                setSubmitted(false);
                setSelectedOption(null);
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to categories
            </Button>
            <span
              className="font-display text-[22px] font-extrabold tracking-[-0.01em] leading-tight"
              style={{ color: "var(--text)" }}
            >
              {GRAMMAR_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            </span>
          </div>

          {loading && (
            <Card>
              <div className="flex items-center justify-center py-12 gap-3">
                <div
                  className="w-5 h-5 border-2 rounded-full animate-spin"
                  style={{
                    borderColor: "var(--divider)",
                    borderTopColor: "var(--primary)",
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Generating question
                </span>
              </div>
            </Card>
          )}

          {error && (
            <Card>
              <div className="text-center py-6">
                <p className="text-sm font-medium mb-4" style={{ color: "var(--danger)" }}>{error}</p>
                <Button onClick={() => generateQuestion(selectedCategory)}>
                  Try again
                </Button>
              </div>
            </Card>
          )}

          <AnimatePresence mode="wait">
            {question && !loading && (
              <motion.div
                key={question.question}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="sm:p-6" style={{ boxShadow: "4px 4px 0 var(--outline)" }}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="text-base font-bold leading-relaxed" style={{ color: "var(--text)" }}>
                      {question.question}
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
                    {question.options.map((opt, i) => {
                      const isCorrect = i === question.correctIndex;
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
                          <span className="font-bold tabular-nums shrink-0">
                            {["A", "B", "C", "D"][i]}.
                          </span>
                          <span className="flex-1 min-w-0">{opt}</span>
                          {showCheck && <CheckGlyph />}
                        </button>
                      );
                    })}
                  </div>

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
                    <div className="space-y-4">
                      <div
                        className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                        style={{
                          background:
                            selectedOption === question.correctIndex
                              ? "var(--success-soft)"
                              : "var(--danger-soft)",
                          border: "2px solid var(--outline)",
                          color: "var(--text)",
                        }}
                      >
                        <span className="font-bold">
                          {selectedOption === question.correctIndex
                            ? "Correct."
                            : "Incorrect."}
                        </span>{" "}
                        <span>
                          {question.explanation}
                        </span>
                      </div>
                      <Button onClick={() => generateQuestion(selectedCategory)}>
                        Next question
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
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
