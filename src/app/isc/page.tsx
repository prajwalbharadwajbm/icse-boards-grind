"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import type { Exam } from "@/lib/constants";
import { ISC_PAPERS, ISC_SEATED_BY, ISC_SUBJECTS, iscPaperStart, nextIscPaper, papersFor, type IscPaper } from "@/lib/isc-timetable";
import { daysBetween, today } from "@/lib/utils";
import { HallTicket } from "@/components/exam/hall-ticket";
import { TimetableCard } from "@/components/exam/timetable-card";
import { AskForIt } from "@/components/feedback/ask-for-it";
import { StickerMark, Wordmark } from "@/components/brand/sticker";

const STORAGE_KEY = "isc-subjects";
/** Subjects shown before "More subjects": English and the usual Science, Commerce and Humanities choices */
const SHOWN_FIRST = ISC_SUBJECTS.findIndex((s) => s.key === "language") + 1;
/** Wait for a burst of taps to settle before recording the picks */
const PICKS_SETTLE_MS = 2000;

/** The countdown card and the timetable list take the app's Exam shape. Only Art papers start in the morning */
function asExam(p: IscPaper): Exam {
  return { date: p.date, key: p.key, subject: p.start === "09:00" ? `${p.name}, 9 am` : p.name, duration: `${p.hours}hrs` };
}

/** Subjects picked on an earlier visit, or none when storage is blocked or unreadable */
function savedPicks(): string[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((k): k is string => typeof k === "string") : [];
  } catch {
    return [];
  }
}

/**
 * The public ISC 2027 timetable: every paper with a countdown, a subject picker saved on the device,
 * and an "ask for it" button for the full planner. No sign-in, so ISC students can use it and ask.
 */
export default function IscPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  // null until mounted: the countdown and "days left" render in the browser only, so the server HTML never disagrees
  const [now, setNow] = useState<Date | null>(null);
  const changedByStudent = useRef(false);

  useEffect(() => {
    capture("isc_page_viewed");
  }, []);

  // Saved picks load after the first paint, so the server HTML (nothing picked) always matches
  useEffect(() => {
    const id = requestAnimationFrame(() => setPicked(savedPicks()));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  // Save the student's own changes, and record them once they stop tapping
  useEffect(() => {
    if (!changedByStudent.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(picked));
    } catch {
      // Not saved: they pick again next visit
    }
    const id = setTimeout(() => {
      capture("isc_subjects_picked", { subjects: [...picked].sort().join(","), count: picked.length });
    }, PICKS_SETTLE_MS);
    return () => clearTimeout(id);
  }, [picked]);

  const toggle = (key: string) => {
    changedByStudent.current = true;
    setPicked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const mine = useMemo(() => papersFor(ISC_PAPERS, picked), [picked]);
  const hasPicks = ISC_PAPERS.some((p) => picked.includes(p.subject));
  const pickedHidden = ISC_SUBJECTS.slice(SHOWN_FIRST).some((s) => picked.includes(s.key));
  const subjects = showAll || pickedHidden ? ISC_SUBJECTS : ISC_SUBJECTS.slice(0, SHOWN_FIRST);

  const next = now ? nextIscPaper(ISC_PAPERS, picked, now) : null;
  const nextIndex = next ? mine.indexOf(next) : -1;
  const td = today();
  const countdown = useMemo(() => {
    if (!now || !next) return null;
    const diff = Math.max(0, iscPaperStart(next).getTime() - now.getTime());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [next, now]);

  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-[720px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-10">
        <header className="flex items-center gap-3">
          <StickerMark size={36} />
          <Wordmark size={20} />
        </header>

        <section className="flex flex-col gap-4">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em]" style={{ color: "var(--text-muted)" }}>
            CISCE ISC Year 2027, Class 12
          </p>
          <h1
            className="font-display font-extrabold text-[44px] sm:text-[64px] leading-[0.98] tracking-[-0.04em]"
            style={{ color: "var(--text)" }}
          >
            ISC 2027 timetable
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-[52ch]" style={{ color: "var(--text-secondary)" }}>
            All {ISC_PAPERS.length} theory papers, from 9 February to 8 April 2027, with a countdown to each. Tap your
            subjects to see only your papers. Free, and no sign-in.
          </p>
        </section>

        {now ? (
          <HallTicket
            exam={next ? asExam(next) : undefined}
            index={nextIndex}
            total={mine.length}
            examDays={next ? daysBetween(td, next.date) : null}
            countdown={countdown}
            board="ISC 2027"
            times={next ? { seatedBy: ISC_SEATED_BY[next.start], writingStart: next.start } : undefined}
          />
        ) : (
          <div className="h-[300px] rounded-[28px]" style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }} aria-hidden="true" />
        )}

        <fieldset>
          <legend className="font-display text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
            Your subjects
          </legend>
          <p className="text-[13px] mt-1 mb-3" style={{ color: "var(--text-muted)" }}>
            Tap the ones you&apos;re writing. They&apos;re saved on this device
          </p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => {
              const on = picked.includes(s.key);
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.key)}
                  className="min-h-10 px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors duration-150 text-left"
                  style={{
                    border: "2px solid var(--outline)",
                    background: on ? "var(--primary)" : "var(--bg-card)",
                    color: on ? "var(--on-primary)" : "var(--text)",
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
            {!pickedHidden && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="text-sm font-bold underline underline-offset-4 decoration-2"
                style={{ color: "var(--text)" }}
              >
                {showAll ? "Fewer subjects" : `${ISC_SUBJECTS.length - SHOWN_FIRST} more subjects`}
              </button>
            )}
            {picked.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  changedByStudent.current = true;
                  setPicked([]);
                }}
                className="text-sm font-bold underline underline-offset-4 decoration-2"
                style={{ color: "var(--text-muted)" }}
              >
                Clear my subjects
              </button>
            )}
          </div>
        </fieldset>

        {now ? (
          <TimetableCard
            exams={mine.map(asExam)}
            nextIndex={nextIndex}
            td={td}
            subjectColors={{}}
            title={hasPicks ? "Your papers" : `All ${ISC_PAPERS.length} papers`}
            footer={
              <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                Writing starts at 2:00 pm (Art at 9:00 am) after 15 minutes of reading time. Be seated 30 minutes before
              </p>
            }
          />
        ) : (
          <div className="h-[420px] rounded-2xl" style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }} aria-hidden="true" />
        )}

        <section
          className="rounded-[28px] p-6 sm:p-8 flex flex-col gap-3 items-start"
          style={{ background: "var(--paper)", border: "2px solid var(--outline)" }}
          aria-labelledby="isc-ask"
        >
          <h2 id="isc-ask" className="font-display text-[26px] font-extrabold tracking-[-0.02em] leading-tight" style={{ color: "var(--text)" }}>
            Want the full study planner for ISC?
          </h2>
          <p className="text-[15px] leading-[1.6] max-w-[52ch]" style={{ color: "var(--text-secondary)" }}>
            Boards Grind plans each day around your school hours, tracks every chapter and has an AI study coach. Right
            now it covers ICSE Class 10 only. If enough ISC students ask, ISC is next.
          </p>
          <AskForIt feature="isc" source="isc_page" label="Yes, build it for ISC" />
        </section>

        <footer className="flex flex-col gap-2 pb-4">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Dates from the CISCE ISC Year 2027 timetable, released 10 November 2026. Theory papers only: your school sets
            the practicals. Check cisce.org for any changes
          </p>
          <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
            In ICSE Class 10?{" "}
            <Link href="/login" className="font-bold underline underline-offset-4 decoration-2" style={{ color: "var(--text)" }}>
              Plan your boards here
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
