"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { STATUS_CYCLE, STATUS_LABELS, type Chapter } from "@/lib/constants";
import { today, daysBetween } from "@/lib/utils";

interface ChapterRowProps {
  chapter: Chapter;
  subjectKey: string;
  index: number;
}

export function ChapterRow({ chapter, subjectKey, index }: ChapterRowProps) {
  const td = today();
  const existingNote = useStore((s) => (s.revisionNotes || {})[subjectKey]?.[chapter.name]) || "";
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState(existingNote);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveNote = useCallback((text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      useStore.getState().update((s) => {
        const notes = { ...s.revisionNotes };
        if (!notes[subjectKey]) notes[subjectKey] = {};
        notes[subjectKey] = { ...notes[subjectKey], [chapter.name]: text };
        return { revisionNotes: notes };
      });
    }, 500);
  }, [subjectKey, chapter.name]);

  // Status control fills: done is mint with a check, revision is tomato, in progress is sunshine
  const statusFill: Record<string, string> = {
    not_started: "var(--bg-card)",
    in_progress: "var(--warning-soft)",
    completed: "var(--success-soft)",
    needs_revision: "var(--danger-soft)",
  };

  function cycleStatus() {
    const currentIdx = STATUS_CYCLE.indexOf(chapter.status);
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length];

    useStore.getState().update((state) => {
      const chapters = [...state.subjects[subjectKey]];
      const updated = { ...chapters[index], status: nextStatus };

      if (nextStatus === "needs_revision") {
        updated.revisionDate = today();
        updated.revisionIntervals = [1, 3, 7];
        updated.revisionsCompleted = 0;
      }

      chapters[index] = updated;
      return { subjects: { ...state.subjects, [subjectKey]: chapters } };
    });
    capture("chapter_status_changed", {
      subject: subjectKey,
      chapter: chapter.name,
      from_status: chapter.status,
      to_status: nextStatus,
    });
  }

  function deleteChapter() {
    useStore.getState().update((state) => {
      const chapters = state.subjects[subjectKey].filter((_, i) => i !== index);
      return { subjects: { ...state.subjects, [subjectKey]: chapters } };
    });
  }

  // Revision badge info
  let revisionBadge: { text: string; urgent: boolean } | null = null;
  if (chapter.status === "needs_revision" && chapter.revisionDate && chapter.revisionIntervals) {
    const completed = chapter.revisionsCompleted || 0;
    if (completed < chapter.revisionIntervals.length) {
      const nextInterval = chapter.revisionIntervals[completed];
      const dueDate = new Date(chapter.revisionDate + "T00:00:00");
      dueDate.setDate(dueDate.getDate() + nextInterval);
      const dueDateStr = dueDate.toISOString().split("T")[0];
      const daysUntil = daysBetween(td, dueDateStr);

      if (daysUntil <= 0) {
        revisionBadge = { text: "Due today", urgent: true };
      } else if (daysUntil === 1) {
        revisionBadge = { text: "Due tomorrow", urgent: false };
      } else {
        revisionBadge = { text: `Due in ${daysUntil}d`, urgent: false };
      }
    } else {
      revisionBadge = { text: "All revisions done", urgent: false };
    }
  }

  const hasNote = !!existingNote.trim();

  return (
    <div style={{ borderBottom: "1px solid var(--divider)" }}>
      <div className="flex items-center gap-2 min-h-[56px] py-2">
        {/* Status cycle button */}
        <button
          onClick={cycleStatus}
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-base font-bold cursor-pointer transition-colors duration-150"
          style={{
            border: "2px solid var(--outline)",
            background: statusFill[chapter.status],
            color: "var(--text)",
          }}
          title={`Status: ${chapter.status.replace("_", " ")}`}
          aria-label={`Status: ${chapter.status.replace("_", " ")}. Click to change`}
        >
          {STATUS_LABELS[chapter.status]}
        </button>

        {/* Chapter name + revision badge */}
        <div className="flex-1 min-w-0 pl-1">
          <span
            className="text-[15px] font-medium"
            style={{
              color: chapter.status === "completed" ? "var(--text-muted)" : "var(--text)",
              textDecoration: chapter.status === "completed" ? "line-through" : "none",
            }}
          >
            {chapter.name}
          </span>
          {revisionBadge && (
            <span
              className="ml-2 text-xs font-bold whitespace-nowrap"
              style={{ color: revisionBadge.urgent ? "var(--danger)" : "var(--text-muted)" }}
            >
              {revisionBadge.text}
            </span>
          )}
        </div>

        {/* Notes button */}
        <button
          onClick={() => setNoteOpen(!noteOpen)}
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 hover:bg-[var(--paper)]"
          style={{ color: hasNote ? "var(--primary)" : "var(--text-muted)" }}
          title={hasNote ? "Edit note" : "Add note"}
          aria-label={hasNote ? "Edit note" : "Add note"}
          aria-expanded={noteOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={hasNote ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </button>

        {/* Difficulty stars */}
        <div
          className="flex gap-0.5 text-xs shrink-0"
          style={{ color: "var(--text)" }}
          title={`Difficulty: ${chapter.difficulty}/5`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ opacity: i < chapter.difficulty ? 1 : 0.2 }}>
              ★
            </span>
          ))}
        </div>

        {/* Delete button */}
        <button
          onClick={deleteChapter}
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--paper)]"
          title="Delete chapter"
          aria-label="Delete chapter"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>

      {/* F6: Expandable note textarea */}
      <AnimatePresence initial={false}>
        {noteOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-3 pl-[52px]">
              <textarea
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  saveNote(e.target.value);
                }}
                placeholder="Add revision notes for this chapter..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm resize-y outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
