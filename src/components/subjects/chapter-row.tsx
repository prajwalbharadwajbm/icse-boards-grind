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

  const statusColor: Record<string, string> = {
    not_started: "var(--border)",
    in_progress: "var(--warning)",
    completed: "var(--success)",
    needs_revision: "var(--danger)",
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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 4px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Status cycle button */}
        <button
          onClick={cycleStatus}
          style={{
            width: 36,
            height: 36,
            minWidth: 36,
            borderRadius: 8,
            border: `2px solid ${statusColor[chapter.status]}`,
            background: chapter.status === "completed" ? "var(--success)" : "transparent",
            color: chapter.status === "completed" ? "#fff" : statusColor[chapter.status],
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          title={`Status: ${chapter.status.replace("_", " ")}`}
        >
          {STATUS_LABELS[chapter.status]}
        </button>

        {/* Chapter name + revision badge */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              color: "var(--text)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: chapter.status === "completed" ? "line-through" : "none",
              opacity: chapter.status === "completed" ? 0.7 : 1,
            }}
          >
            {chapter.name}
          </span>
          {revisionBadge && (
            <span
              style={{
                marginLeft: 8,
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 99,
                background: revisionBadge.urgent ? "var(--danger)" : "var(--warning)",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {revisionBadge.text}
            </span>
          )}
        </div>

        {/* Notes button */}
        <button
          onClick={() => setNoteOpen(!noteOpen)}
          style={{
            width: 28,
            height: 28,
            minWidth: 28,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            color: hasNote ? "var(--primary)" : "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hasNote ? 1 : 0.5,
            transition: "opacity 0.15s ease",
          }}
          title={hasNote ? "Edit note" : "Add note"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={hasNote ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </button>

        {/* Difficulty stars */}
        <div
          style={{
            display: "flex",
            gap: 2,
            fontSize: 12,
            color: "var(--warning)",
            flexShrink: 0,
          }}
          title={`Difficulty: ${chapter.difficulty}/5`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ opacity: i < chapter.difficulty ? 1 : 0.25 }}>
              ★
            </span>
          ))}
        </div>

        {/* Delete button */}
        <button
          onClick={deleteChapter}
          style={{
            width: 28,
            height: 28,
            minWidth: 28,
            borderRadius: 6,
            border: "none",
            background: "transparent",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--danger)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          title="Delete chapter"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div style={{ padding: "8px 4px 8px 50px" }}>
              <textarea
                value={noteText}
                onChange={(e) => {
                  setNoteText(e.target.value);
                  saveNote(e.target.value);
                }}
                placeholder="Add revision notes for this chapter..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: 13,
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
