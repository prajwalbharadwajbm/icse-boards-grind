"use client";

import { useMemo, useState, useEffect } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { getSubjectLabels, getSubjectColors } from "@/lib/constants";

export default function NotesPage() {
  const revisionNotes = useStore((s) => s.revisionNotes) || {};
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const subjectLabels = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);
  const subjectColors = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    capture("notes_page_viewed");
  }, []);

  // Flatten all notes grouped by subject
  const allNotes = useMemo(() => {
    const notes: { subjectKey: string; chapter: string; note: string }[] = [];
    for (const [subjectKey, chapters] of Object.entries(revisionNotes)) {
      for (const [chapter, note] of Object.entries(chapters)) {
        if (note.trim()) {
          notes.push({ subjectKey, chapter, note });
        }
      }
    }
    return notes;
  }, [revisionNotes]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allNotes;
    const q = search.toLowerCase();
    return allNotes.filter(
      (n) =>
        (subjectLabels[n.subjectKey] || n.subjectKey).toLowerCase().includes(q) ||
        n.chapter.toLowerCase().includes(q) ||
        n.note.toLowerCase().includes(q)
    );
  }, [allNotes, search, subjectLabels]);

  // Group by subject
  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const n of filtered) {
      if (!map[n.subjectKey]) map[n.subjectKey] = [];
      map[n.subjectKey].push(n);
    }
    return map;
  }, [filtered]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>
          Revision notes
        </h2>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          All your chapter notes in one place.
        </p>
      </header>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by subject, chapter or note"
        aria-label="Search notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-11 px-4 rounded-xl text-sm outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
        style={{ background: "var(--bg-card)", color: "var(--text)" }}
      />

      {allNotes.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3" aria-hidden="true">
              <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <p className="font-display text-lg font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>No notes yet</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Open a chapter on the Subjects page to add a note.</p>
          </div>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-center py-4" style={{ color: "var(--text-secondary)" }}>No notes match your search.</p>
        </Card>
      ) : (
        Object.entries(grouped).map(([subjectKey, notes]) => (
          <Card key={subjectKey}>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[subjectKey] || "var(--primary)" }} />
              <h3 className="font-display text-lg font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
                {subjectLabels[subjectKey] || subjectKey}
              </h3>
            </div>
            <div>
              {notes.map((n, i) => (
                <div key={i} className="py-3" style={{ borderTop: i > 0 ? "1px solid var(--divider)" : undefined }}>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{n.chapter}</p>
                  <p className="text-sm mt-1 whitespace-pre-wrap" style={{ color: "var(--text)" }}>{n.note}</p>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
