"use client";

import { TIMETABLE, EXAM_YEAR, type Exam } from "@/lib/constants";
import { clock, paperName, plural } from "@/lib/exam-format";
import { Starburst } from "@/components/brand/sticker";

/** Fixed sticker colours: the countdown card is cobalt in both themes */
const COBALT = "#2F5BFF";

/**
 * The countdown to the next paper: a cobalt card with the paper's date on a starburst sticker.
 * This is the one sticker on the dashboard.
 */
export function HallTicket({
  exam,
  index,
  total,
  examDays,
  countdown,
}: {
  exam: Exam | undefined;
  index: number;
  total: number;
  examDays: number | null;
  countdown: { days: number; hours: number; minutes: number; seconds: number } | null;
}) {
  const shell: React.CSSProperties = {
    background: COBALT,
    color: "#FFFFFF",
    border: "2px solid var(--outline)",
    boxShadow: "6px 6px 0 var(--outline)",
  };

  if (!exam || !countdown) {
    return (
      <section className="rounded-[28px] p-7 sm:p-8 flex flex-col gap-2" style={shell}>
        <p className="text-[15px] font-medium">ICSE {EXAM_YEAR}</p>
        <h2 className="font-display text-[48px] sm:text-[64px] font-extrabold leading-[0.95] tracking-[-0.04em]">All papers written</h2>
        <p className="text-[15px] mt-2 max-w-[48ch]">CISCE expects to declare results in April or May {EXAM_YEAR}</p>
      </section>
    );
  }

  const soon = examDays !== null && examDays <= 3;
  const date = new Date(exam.date + "T00:00:00");
  const label = examDays === 0 ? "Today's paper" : `Next paper, ${index + 1} of ${total}`;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative rounded-[28px] p-7 sm:p-8 pt-24 sm:pt-8 flex flex-col gap-1.5 min-w-0" style={shell} aria-label="Next paper">
      <p className="text-[15px] font-medium">{label}</p>
      {/* Live time differs between the server render and the browser by design */}
      <p className="font-display text-[64px] sm:text-[112px] font-extrabold leading-[0.9] tracking-[-0.05em] tabular-nums" suppressHydrationWarning>
        {countdown.days} {countdown.days === 1 ? "day" : "days"}
      </p>
      <p className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.01em] mt-2 sm:pr-40">
        till {paperName(exam.subject)}
      </p>
      <p className="text-[15px] tabular-nums" aria-live="off" suppressHydrationWarning>
        {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s more. Be seated by {clock(TIMETABLE.seatedBy)}, writing from {clock(TIMETABLE.writingStart)}
      </p>

      <div className="absolute -top-4 right-4 sm:-top-5 sm:right-7 scale-[0.8] sm:scale-100 origin-top-right">
        <Starburst size={136} rotate={10}>
          <span className="font-display text-[26px] font-extrabold leading-none">
            {date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
          </span>
          <span className="text-[13px] font-bold mt-1">{date.toLocaleDateString("en-IN", { weekday: "short" })}, {clock(TIMETABLE.writingStart)}</span>
        </Starburst>
      </div>
      {soon && examDays !== 0 && (
        <p className="text-[15px] font-bold mt-1">{plural(examDays!, "day")} to go. Pack your admit card</p>
      )}
    </section>
  );
}
