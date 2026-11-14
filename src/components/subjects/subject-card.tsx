"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/use-store";
import { getSubjectColors, getSubjectLabels, type Chapter } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChapterRow } from "@/components/subjects/chapter-row";

interface SubjectCardProps {
  subjectKey: string;
}

const NO_CHAPTERS: Chapter[] = [];

export function SubjectCard({ subjectKey }: SubjectCardProps) {
  const chapters: Chapter[] = useStore((s) => s.subjects[subjectKey] ?? NO_CHAPTERS);
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(3);

  const labels = getSubjectLabels(lang, elective);
  const colors = getSubjectColors(lang, elective);
  const label = labels[subjectKey] || subjectKey;
  const color = colors[subjectKey] || "var(--primary)";

  const completed = chapters.filter((ch) => ch.status === "completed").length;
  const total = chapters.length;
  const pct = total > 0 ? (completed / total) * 100 : 0;

  function addChapter() {
    if (!newChapterName.trim()) return;

    useStore.getState().update((state) => {
      const existing = state.subjects[subjectKey] || [];
      const newChapter: Chapter = {
        name: newChapterName.trim(),
        status: "not_started",
        difficulty: newDifficulty,
      };
      return {
        subjects: { ...state.subjects, [subjectKey]: [...existing, newChapter] },
      };
    });

    setNewChapterName("");
    setNewDifficulty(3);
    setModalOpen(false);
  }

  return (
    <>
      <Card className="!p-0 overflow-hidden">
        {/* Header - click to expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="w-full flex items-center gap-3 min-h-[64px] px-5 py-4 text-left cursor-pointer transition-colors duration-150 hover:bg-[var(--paper)]"
        >
          {/* Subject dot */}
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />

          {/* Label + count */}
          <span className="flex-1 min-w-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="font-display text-lg font-extrabold tracking-[-0.01em] truncate" style={{ color: "var(--text)" }}>
              {label}
            </span>
            <span className="text-xs font-bold tabular-nums whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
              {completed}/{total} done
            </span>
          </span>

          {/* Progress */}
          <span className="w-20 sm:w-[140px] shrink-0">
            <OutlinedBar pct={pct} fill="var(--mint)" />
          </span>

          {/* Chevron */}
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--divider)" }}>
                {/* Chapter list */}
                {chapters.length === 0 ? (
                  <p className="text-sm pt-4 pb-1" style={{ color: "var(--text-secondary)" }}>
                    No chapters added yet. Add your first chapter to start tracking.
                  </p>
                ) : (
                  <div className="pt-1">
                    {chapters.map((ch, i) => (
                      <ChapterRow
                        key={`${subjectKey}-${i}`}
                        chapter={ch}
                        subjectKey={subjectKey}
                        index={i}
                      />
                    ))}
                  </div>
                )}

                {/* Add Chapter button */}
                <div className="pt-4">
                  <Button variant="secondary" size="md" onClick={() => setModalOpen(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add chapter
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Add Chapter Modal */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNewChapterName("");
          setNewDifficulty(3);
        }}
        title={`Add chapter: ${label}`}
      >
        <div className="flex flex-col gap-4">
          {/* Chapter name */}
          <Input
            label="Chapter name"
            type="text"
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            placeholder="e.g. Refraction of Light"
            onKeyDown={(e) => { if (e.key === "Enter") addChapter(); }}
          />

          {/* Difficulty stars */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
              Difficulty
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewDifficulty(star)}
                  aria-label={`Difficulty ${star} of 5`}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base cursor-pointer transition-colors duration-150 bg-[var(--bg-card)] hover:bg-[var(--paper)]"
                  style={{
                    border: "2px solid var(--outline)",
                    color: star <= newDifficulty ? "var(--warning)" : "var(--text-muted)",
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 justify-end pt-1">
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setModalOpen(false);
                setNewChapterName("");
                setNewDifficulty(3);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={addChapter}
              disabled={!newChapterName.trim()}
            >
              Save chapter
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

/* ── A subject's progress as an outlined bar ── */

function OutlinedBar({ pct, fill }: { pct: number; fill: string }) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <span
      className="block h-3.5 rounded-full overflow-hidden"
      style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className="block h-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: "100%", transform: `scaleX(${value / 100})`, background: fill, boxShadow: value > 0 && value < 100 ? "inset -2px 0 0 var(--outline)" : undefined }}
      />
    </span>
  );
}
