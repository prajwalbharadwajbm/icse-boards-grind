"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { JC_FLASHCARDS } from "@/lib/julius-caesar-data";

type ReviewStatus = "needs_review" | "confident";

export function JCFlashcards() {
  const jcFlashcardsReviewed = useStore((s) => s.jcFlashcardsReviewed);
  const jcFlashcardReviewStatus = useStore((s) => s.jcFlashcardReviewStatus);
  const update = useStore((s) => s.update);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = JC_FLASHCARDS[currentIndex];
  const total = JC_FLASHCARDS.length;
  const status = jcFlashcardReviewStatus[card.id];

  const handleFlip = () => {
    setFlipped((f) => !f);
    if (!flipped) {
      capture("jc_flashcard_flipped", { card_id: card.id, act: card.act, scene: card.scene });
      if (!jcFlashcardsReviewed.includes(card.id)) {
        update((state) => ({
          jcFlashcardsReviewed: [...state.jcFlashcardsReviewed, card.id],
        }));
      }
    }
  };

  const navigate = (dir: -1 | 1) => {
    setFlipped(false);
    setCurrentIndex((i) => {
      const next = i + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  };

  const toggleStatus = (newStatus: ReviewStatus) => {
    const current = jcFlashcardReviewStatus[card.id];
    const value = current === newStatus ? undefined : newStatus;

    capture("jc_flashcard_review_changed", {
      card_id: card.id,
      act: card.act,
      scene: card.scene,
      status: value ?? "unmarked",
    });

    update((s) => {
      const next = { ...s.jcFlashcardReviewStatus };
      if (value) {
        next[card.id] = value;
      } else {
        delete next[card.id];
      }
      return { jcFlashcardReviewStatus: next };
    });
  };

  const confidentCount = Object.values(jcFlashcardReviewStatus).filter(
    (s) => s === "confident"
  ).length;

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>
          Card {currentIndex + 1} of {total}
        </span>
        <span
          className="text-xs font-bold tabular-nums"
          style={{ color: "var(--text-muted)" }}
        >
          {confidentCount}/{total} confident
        </span>
      </div>

      {/* Flashcard */}
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
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
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
            <p
              className="text-lg font-serif italic leading-relaxed mb-4"
              style={{ color: "var(--text)" }}
            >
              &ldquo;{card.quote}&rdquo;
            </p>
            <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              Tap to reveal
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-center"
            style={{
              background: "var(--bg-card)",
              border: "2px solid var(--outline)",
              boxShadow: "4px 4px 0 var(--outline)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="space-y-3">
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Speaker
                </span>
                <p
                  className="font-display text-lg font-extrabold tracking-[-0.01em] leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {card.speaker}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Location
                </span>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
                  Act {card.act}, Scene {card.scene}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Context
                </span>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {card.context}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Significance
                </span>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {card.significance}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Review buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => toggleStatus("needs_review")}
          aria-pressed={status === "needs_review"}
          className={`h-9 px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
            status === "needs_review" ? "font-bold" : "font-medium bg-[var(--bg-card)] hover:bg-[var(--paper)]"
          }`}
          style={{
            background: status === "needs_review" ? "var(--danger-soft)" : undefined,
            color: "var(--text)",
            border: "2px solid var(--outline)",
          }}
        >
          Needs review
        </button>
        <button
          onClick={() => toggleStatus("confident")}
          aria-pressed={status === "confident"}
          className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
            status === "confident" ? "font-bold" : "font-medium bg-[var(--bg-card)] hover:bg-[var(--paper)]"
          }`}
          style={{
            background: status === "confident" ? "var(--success-soft)" : undefined,
            color: "var(--text)",
            border: "2px solid var(--outline)",
          }}
        >
          {status === "confident" && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          Confident
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous card"
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-[var(--bg-card)] transition-colors duration-150 cursor-pointer hover:bg-[var(--paper)]"
          style={{ border: "2px solid var(--outline)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex flex-wrap justify-center gap-1">
          {JC_FLASHCARDS.map((c, i) => {
            const dotStatus = jcFlashcardReviewStatus[c.id];
            return (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{
                  background:
                    i === currentIndex
                      ? "var(--primary)"
                      : dotStatus === "confident"
                      ? "var(--success)"
                      : dotStatus === "needs_review"
                      ? "var(--danger)"
                      : jcFlashcardsReviewed.includes(c.id)
                      ? "var(--text-muted)"
                      : "var(--divider)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigate(1)}
          aria-label="Next card"
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-[var(--bg-card)] transition-colors duration-150 cursor-pointer hover:bg-[var(--paper)]"
          style={{ border: "2px solid var(--outline)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
