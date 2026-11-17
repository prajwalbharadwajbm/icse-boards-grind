"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { clock } from "@/lib/exam-format";
import type { FirstSession } from "@/lib/first-session";
import { StarSticker } from "@/components/brand/sticker";

const REASON_TEXT = (s: FirstSession) => {
  switch (s.reason) {
    case "plan_now":
      return "It's on your plan right now";
    case "plan_next":
      return `It's next on your plan, at ${clock(s.at || "")}`;
    case "weak":
      return "You picked it as your toughest subject";
    case "next_paper":
      return "It's your first paper";
  }
};

/**
 * The first thing a new student sees: one subject, one chapter, one button.
 * Shown until they log a study session or mark a chapter done.
 */
export function FirstSessionCard({
  session,
  subjectLabel,
  minutes,
}: {
  session: FirstSession;
  subjectLabel: string;
  minutes: number;
}) {
  // Once per visit: the suggestion can change as the clock moves through today's plan
  const viewedSent = useRef(false);
  useEffect(() => {
    if (viewedSent.current) return;
    viewedSent.current = true;
    capture("first_session_card_viewed", { subject: session.subjectKey, reason: session.reason });
  }, [session.subjectKey, session.reason]);

  const params = new URLSearchParams({ subject: session.subjectKey });
  if (session.chapter) params.set("chapter", session.chapter);
  const timerHref = `/dashboard/timer?${params.toString()}`;

  return (
    <section
      aria-label="Start here"
      className="relative rounded-[28px] p-6 sm:p-7 flex flex-col gap-4"
      style={{ background: "var(--sun)", color: "#000", border: "2px solid var(--outline)", boxShadow: "6px 6px 0 var(--outline)" }}
    >
      <div className="absolute -top-5 right-5 rotate-12" aria-hidden="true">
        <StarSticker size={52} />
      </div>
      <p className="text-[13px] font-bold uppercase tracking-[0.08em]">Start here</p>
      <div className="flex flex-col gap-1.5 pr-10">
        <h2 className="font-display text-[28px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]">
          Your first {minutes} minutes: {subjectLabel}
        </h2>
        <p className="text-[15px] leading-relaxed">
          {session.chapter ? <><strong>{session.chapter}</strong>. </> : null}
          {REASON_TEXT(session)}. One session today starts your streak
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Link
          href={timerHref}
          onClick={() => capture("first_session_card_clicked", { action: "timer", subject: session.subjectKey, reason: session.reason })}
          className="inline-flex items-center justify-center h-12 px-6 rounded-full text-[15px] font-bold transition-[transform,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          style={{ background: "#000", color: "#fff", border: "2px solid #000", boxShadow: "3px 3px 0 #fff" }}
        >
          Start the timer
        </Link>
        <Link
          href="/dashboard/subjects"
          onClick={() => capture("first_session_card_clicked", { action: "chapters", subject: session.subjectKey, reason: session.reason })}
          className="text-sm font-bold underline underline-offset-4 decoration-2 text-center sm:text-left"
        >
          Studied some chapters already? Mark them done
        </Link>
      </div>
    </section>
  );
}
