"use client";

import Link from "next/link";
import { EXAM_YEAR, type Exam } from "@/lib/constants";
import { daysBetween } from "@/lib/utils";
import { paperName, plural } from "@/lib/exam-format";

/**
 * The student's papers as ticket stubs: date on a torn-off stub, the next paper on sunshine.
 */
export function TimetableCard({
  exams,
  nextIndex,
  td,
  subjectColors,
  title = `Your ${EXAM_YEAR} papers`,
  footer,
}: {
  exams: Exam[];
  nextIndex: number;
  td: string;
  subjectColors: Record<string, string>;
  title?: string;
  /** Replaces the calendar link at the bottom */
  footer?: React.ReactNode;
}) {
  const left = exams.filter((e) => e.date >= td).length;

  return (
    <section className="flex flex-col gap-2.5 min-w-0" aria-label={title}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>{title}</h2>
        <span className="text-[13px] font-medium tabular-nums" style={{ color: "var(--text-muted)" }}>
          {left === 0 ? "All done" : `${left} to go`}
        </span>
      </div>

      <ol className="flex flex-col gap-2.5">
        {exams.map((exam, i) => {
          const d = new Date(exam.date + "T00:00:00");
          const isNext = i === nextIndex;
          const isPast = nextIndex === -1 ? true : i < nextIndex;
          const days = daysBetween(td, exam.date);
          const gap = i > 0 ? daysBetween(exams[i - 1].date, exam.date) - 1 : null;
          const gapText = gap === null ? "First paper" : gap <= 0 ? "Same day as the last one" : `${plural(gap, "free day")} before`;
          const ink = isNext ? "#000" : isPast ? "var(--text-muted)" : "var(--text)";

          return (
            <li
              key={exam.key}
              className="flex rounded-2xl overflow-hidden min-h-[56px]"
              style={{
                border: "2px solid var(--outline)",
                background: isNext ? "var(--sun)" : isPast ? "var(--paper)" : "var(--bg-card)",
              }}
              aria-current={isNext ? "true" : undefined}
            >
              <span
                className="w-[78px] shrink-0 flex flex-col items-center justify-center leading-tight"
                style={{ borderRight: "2px dashed var(--outline)", color: ink }}
              >
                <span className="font-display text-base font-extrabold">{d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                <span className="text-[11px] font-medium">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
              </span>
              <span className="flex-1 min-w-0 px-4 py-2 flex flex-col justify-center">
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[exam.key] || "var(--text-muted)", opacity: isPast ? 0.5 : 1 }} />
                  <span className={`text-[15px] truncate ${isNext ? "font-bold" : ""}`} style={{ color: ink }}>{paperName(exam.subject)}</span>
                </span>
                <span className="text-xs pl-4" style={{ color: isNext ? "#000" : "var(--text-muted)" }}>{gapText}</span>
              </span>
              <span className="px-4 flex items-center text-[13px] font-bold tabular-nums" style={{ color: isNext ? "#000" : "var(--text-muted)" }}>
                {isPast ? "Done" : isNext ? (days === 0 ? "Today" : "Next up") : `${days}d`}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="pt-1">
        {footer ?? (
          <Link href="/dashboard/calendar" className="text-sm font-bold underline underline-offset-4 decoration-2" style={{ color: "var(--text)" }}>
            See it on the calendar
          </Link>
        )}
      </div>
    </section>
  );
}
