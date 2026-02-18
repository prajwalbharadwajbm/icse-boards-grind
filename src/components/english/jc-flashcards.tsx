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
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Card {currentIndex + 1} of {total}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "rgba(52,168,83,0.12)", color: "#34a853" }}
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Front */}
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
            <p
              className="text-lg font-serif italic leading-relaxed mb-4"
              style={{ color: "var(--text)" }}
            >
              &ldquo;{card.quote}&rdquo;
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Tap to reveal
            </p>
          </div>

          {/* Back */}
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
                  Speaker
                </span>
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  {card.speaker}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Location
                </span>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  Act {card.act}, Scene {card.scene}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Context
                </span>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {card.context}
                </p>
              </div>
              <div>
                <span
                  className="text-xs font-semibold uppercase"
                  style={{ color: "var(--text-secondary)" }}
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
      <div className="flex justify-center gap-3">
        <button
          onClick={() => toggleStatus("needs_review")}
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
          onClick={() => toggleStatus("confident")}
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
          {JC_FLASHCARDS.map((c, i) => {
            const dotStatus = jcFlashcardReviewStatus[c.id];
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
                      : jcFlashcardsReviewed.includes(c.id)
                      ? "var(--text-secondary)"
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
