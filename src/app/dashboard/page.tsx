"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { FlameSticker } from "@/components/brand/sticker";
import { StatChip } from "@/components/ui/stat-chip";
import {
  getExams,
  getSubjectColors,
  getSubjectLabels,
  MOTIVATIONAL_QUOTES,
  TIMETABLE,
  EXAM_YEAR,
  examStart,
  examEnd,
} from "@/lib/constants";
import { today, daysBetween, dateStr, timeToMin } from "@/lib/utils";
import { clock, paperName, plural, signed } from "@/lib/exam-format";
import { HallTicket } from "@/components/exam/hall-ticket";
import { TimetableCard } from "@/components/exam/timetable-card";
import { getDayPlan, getRevisionDueChapters } from "@/lib/algorithms";
import { isNewStudent, pickFirstSession } from "@/lib/first-session";
import { useTimerStore } from "@/store/use-timer-store";
import { FirstSessionCard } from "@/components/dashboard/first-session-card";

export default function DashboardPage() {
  const data = useStore();
  const td = today();
  const [now, setNow] = useState(new Date());

  const lang = data.selectedLanguage || "kannada";
  const elective = data.selectedElective || "computer";
  const exams = useMemo(() => getExams(lang, elective), [lang, elective]);
  const subjectLabels = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);
  const subjectColors = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);

  // Live countdown ticks every second
  useEffect(() => {
    capture("dashboard_viewed");
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const todayLog = (data.studyLog || {})[td];
  const hoursToday = todayLog ? todayLog.hours : 0;
  const sessionsToday = todayLog ? todayLog.sessions : 0;
  const target = data.studyHours || 8;

  const chapsDone = useMemo(() => {
    let count = 0;
    Object.values(data.subjects || {}).forEach((chapters) => {
      chapters.forEach((ch) => { if (ch.status === "completed") count++; });
    });
    return count;
  }, [data.subjects]);

  const totalChapters = useMemo(() => {
    let count = 0;
    Object.values(data.subjects || {}).forEach((chapters) => { count += chapters.length; });
    return count;
  }, [data.subjects]);

  // Next paper: the first one whose writing time hasn't finished yet
  const nextExam = useMemo(
    () => exams.find((e) => examEnd(e).getTime() > now.getTime()),
    [exams, now]
  );
  const nextIndex = nextExam ? exams.indexOf(nextExam) : -1;
  const examDays = nextExam ? daysBetween(td, nextExam.date) : null;

  const countdown = useMemo(() => {
    if (!nextExam) return null;
    const diff = examStart(nextExam.date).getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [nextExam, now]);

  // Today's plan
  const plan = useMemo(() => getDayPlan(td, data), [td, data]);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Streak recovery
  const streakRecoveryAvailable = data.streakRecoveryAvailable;
  const streakBeforeReset = data.streakBeforeReset;
  const recoveryTarget = target * 2;
  const recoveryProgress = Math.min(100, (hoursToday / recoveryTarget) * 100);

  // This week vs last week, Monday to Sunday, local dates
  const weeklySummary = useMemo(() => {
    const getMonday = (d: Date) => {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.getFullYear(), d.getMonth(), diff);
    };
    const thisMonday = getMonday(new Date());
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(lastMonday.getDate() - 7);

    let thisHours = 0, thisSessions = 0, bestDay = "", bestHours = 0;
    let lastHours = 0, lastSessions = 0;
    const days: { key: string; label: string; hours: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const d1 = new Date(thisMonday);
      d1.setDate(d1.getDate() + i);
      const key1 = dateStr(d1);
      const log1 = (data.studyLog || {})[key1];
      const label = d1.toLocaleDateString("en-IN", { weekday: "short" });
      days.push({ key: key1, label, hours: log1?.hours || 0 });
      if (log1) {
        thisHours += log1.hours;
        thisSessions += log1.sessions;
        if (log1.hours > bestHours) {
          bestHours = log1.hours;
          bestDay = label;
        }
      }

      const d2 = new Date(lastMonday);
      d2.setDate(d2.getDate() + i);
      const log2 = (data.studyLog || {})[dateStr(d2)];
      if (log2) {
        lastHours += log2.hours;
        lastSessions += log2.sessions;
      }
    }

    return {
      days,
      thisHours, thisSessions, bestDay: bestDay || "—", bestHours,
      lastHours, lastSessions,
      hoursDiff: thisHours - lastHours,
      sessionsDiff: thisSessions - lastSessions,
    };
  }, [data.studyLog]);

  // Smart recommendations
  const smartRecs = useMemo(() => {
    const weak: { subject: string; color: string; detail: string; key: string }[] = [];
    const grammarWeak: { category: string; accuracy: number }[] = [];
    const revisionDue = getRevisionDueChapters(td, data.subjects);

    Object.keys(subjectLabels).forEach((key) => {
      const rating = (data.subjectRatings || {})[key] || "medium";
      const exam = exams.find((e) => e.key === key);
      const chapters = data.subjects[key] || [];
      const incomplete = chapters.filter((c) => c.status !== "completed").length;
      if (rating === "weak" && exam && exam.date >= td) {
        weak.push({
          subject: subjectLabels[key],
          color: subjectColors[key],
          detail: chapters.length > 0
            ? `${plural(daysBetween(td, exam.date), "day")} to the paper, ${plural(incomplete, "chapter")} left`
            : `${plural(daysBetween(td, exam.date), "day")} to the paper`,
          key,
        });
      }
    });

    if (data.grammarDrillStats) {
      Object.entries(data.grammarDrillStats).forEach(([cat, stats]) => {
        if (stats.attempted >= 3) {
          const accuracy = (stats.correct / stats.attempted) * 100;
          if (accuracy < 60) grammarWeak.push({ category: cat, accuracy: Math.round(accuracy) });
        }
      });
    }

    return { weak, grammarWeak, revisionDue: revisionDue.slice(0, 4) };
  }, [data.subjects, data.subjectRatings, data.grammarDrillStats, td, exams, subjectLabels, subjectColors]);

  const hasSmartRecs = smartRecs.weak.length > 0 || smartRecs.grammarWeak.length > 0 || smartRecs.revisionDue.length > 0;

  // Motivation line, changes every minute
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Date.now() / 60000) % MOTIVATIONAL_QUOTES.length];

  const firstExam = exams[0];
  const lastExam = exams[exams.length - 1];
  const pageTitle = new Date(td + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  // Today's plan from the current block onwards
  const upcomingBlocks = plan.filter((b) => timeToMin(b.end) > nowMin).slice(0, 6);
  const hoursPct = Math.min(100, (hoursToday / target) * 100);

  // A student who hasn't logged study time or marked a chapter done yet
  const workMinutes = useTimerStore((s) => s.workMinutes);
  const newStudent = isNewStudent(data);
  const firstSession = useMemo(
    () => (newStudent ? pickFirstSession({ plan, nowMin, subjects: data.subjects || {}, subjectRatings: data.subjectRatings, exams, td }) : null),
    [newStudent, plan, nowMin, data.subjects, data.subjectRatings, exams, td]
  );

  // Today's plan and what to work on: first for new students, beside the timetable for everyone else
  const planAndNext = (
    <>
      <section className="flex flex-col gap-2.5" aria-label="Today's plan">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>Today&apos;s plan</h2>
          <Link href="/dashboard/planner" className="text-sm font-bold underline underline-offset-4 decoration-2" style={{ color: "var(--text)" }}>
            Open planner
          </Link>
        </div>
        {upcomingBlocks.length === 0 ? (
          <p className="rounded-2xl px-4 py-4 text-sm" style={{ border: "2px solid var(--outline)", color: "var(--text-secondary)" }}>
            {plan.length === 0 ? "No study blocks planned. Set your daily routine in Settings to get a plan" : "That's today's plan done. Rest up for tomorrow"}
          </p>
        ) : (
          <ol className="flex flex-col gap-2">
            {upcomingBlocks.map((block, i) => {
              const isCurrent = nowMin >= timeToMin(block.start) && nowMin < timeToMin(block.end);
              const dotColor = block.type === "study" && block.subjectKey ? subjectColors[block.subjectKey] : undefined;
              return (
                <li
                  key={`${block.start}-${i}`}
                  className="flex items-center gap-3 min-h-[52px] rounded-2xl px-4"
                  style={{ border: "2px solid var(--outline)", background: isCurrent ? "var(--primary-light)" : "var(--bg-card)" }}
                  aria-current={isCurrent ? "time" : undefined}
                >
                  <span className={`w-[68px] shrink-0 text-[13px] tabular-nums ${isCurrent ? "font-bold" : ""}`} style={{ color: isCurrent ? "var(--text)" : "var(--text-muted)" }}>
                    {isCurrent ? "Now" : clock(block.start)}
                  </span>
                  {dotColor && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />}
                  <span className={`text-[15px] truncate ${isCurrent ? "font-bold" : ""}`} style={{ color: "var(--text)" }}>{block.label}</span>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section className="flex flex-col gap-2.5" aria-label="Recommendations">
        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>Work on next</h2>
        {!hasSmartRecs ? (
          <p className="rounded-2xl px-4 py-4 text-sm" style={{ border: "2px solid var(--outline)", color: "var(--text-secondary)" }}>
            Nothing needs attention right now. Weak subjects, grammar slips and revisions that fall due show up here
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {smartRecs.weak.map((item, i) => (
              <RecRow
                key={`weak-${i}`}
                href="/dashboard/timer"
                onClick={() => capture("weak_area_clicked", { type: "weak_subject", subject: item.key })}
                color={item.color}
                title={item.subject}
                detail={item.detail}
                tag="Weak subject"
                tagColor="var(--danger)"
              />
            ))}
            {smartRecs.grammarWeak.map((item, i) => (
              <RecRow
                key={`grammar-${i}`}
                href="/dashboard/english"
                onClick={() => capture("weak_area_clicked", { type: "grammar", category: item.category })}
                color={subjectColors.english_lang}
                title={`Grammar: ${item.category}`}
                detail={`${item.accuracy}% correct so far`}
                tag="Drill"
                tagColor="var(--danger)"
              />
            ))}
            {smartRecs.revisionDue.map((item, i) => (
              <RecRow
                key={`rev-${i}`}
                href="/dashboard/timer"
                onClick={() => capture("weak_area_clicked", { type: "revision", subject: item.subjectKey })}
                color={subjectColors[item.subjectKey] || "var(--warning)"}
                title={subjectLabels[item.subjectKey] || item.subjectKey}
                detail={item.chapterName}
                tag="Revision due"
                tagColor="var(--warning)"
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
      {/* Page header: the day, then where it sits in the exam season */}
      <header className="flex flex-col gap-2 pb-1">
        <h1 className="font-display text-[34px] sm:text-[42px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>
          {pageTitle}
        </h1>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          {nextExam && examDays !== null
            ? examDays === 0
              ? `${paperName(nextExam.subject)} is today. Be seated by ${clock(TIMETABLE.seatedBy)}`
              : `Your ${plural(exams.length, "paper")} for ICSE ${EXAM_YEAR} run from ${new Date(firstExam.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long" })} to ${new Date(lastExam.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long" })}`
            : `Your ICSE ${EXAM_YEAR} papers are done`}
        </p>
        <p className="text-sm max-w-[64ch]" style={{ color: "var(--text-muted)" }}>{quote}</p>
      </header>

      {/* Streak recovery */}
      {streakRecoveryAvailable && (
        <div className="rounded-[20px] p-5 flex flex-col gap-3" style={{ background: "var(--sun-soft)", border: "2px solid var(--outline)" }}>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h2 className="font-display text-xl font-extrabold" style={{ color: "var(--text)" }}>
              Save your {plural(streakBeforeReset, "day")} streak
            </h2>
            <span className="text-sm font-bold tabular-nums" style={{ color: "var(--text)" }}>
              {hoursToday.toFixed(1)}h of {recoveryTarget.toFixed(1)}h
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            You missed a day. Study {recoveryTarget.toFixed(1)}h today and the streak stays
          </p>
          <OutlinedBar pct={recoveryProgress} fill="var(--sun)" />
        </div>
      )}

      {/* New students: one thing to do, then today's plan, before the countdown */}
      {newStudent && firstSession && (
        <FirstSessionCard
          session={firstSession}
          subjectLabel={subjectLabels[firstSession.subjectKey] || firstSession.subjectKey}
          minutes={workMinutes}
        />
      )}
      {newStudent && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">{planAndNext}</div>}

      {/* Row 1: the countdown sticker card and the week */}
      <div className="flex flex-wrap gap-6 items-stretch">
        <div className="flex-[2_1_520px] min-w-0 flex flex-col">
          <HallTicket exam={nextExam} index={nextIndex} total={exams.length} examDays={examDays} countdown={countdown} />
        </div>
        {!newStudent && (
          <div className="flex-[1_1_300px] min-w-0 flex flex-col">
            <WeekCard summary={weeklySummary} target={target} td={td} />
          </div>
        )}
      </div>

      {/* Row 2: today in numbers, once there are numbers */}
      {!newStudent && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <StatChip label="Studied today" value={`${hoursToday.toFixed(1)}h`} sub={`of a ${target}h target`}>
            <OutlinedBar pct={hoursPct} fill="var(--mint)" />
          </StatChip>
          <StatChip label="Chapters done" value={chapsDone} sub={`of ${totalChapters} chapters`} />
          <StatChip
            label="Streak"
            value={`${data.streak || 0} ${(data.streak || 0) === 1 ? "day" : "days"}`}
            sub="in a row"
            tone="sun"
            sticker={(data.streak || 0) > 0 ? <FlameSticker size={56} /> : undefined}
          />
          <StatChip label="Sessions today" value={sessionsToday} sub={`${weeklySummary.thisSessions} this week`} />
        </div>
      )}

      {/* Row 3: the papers as tickets, then today's plan and what to work on */}
      <div className="flex flex-wrap gap-6 items-start">
        <div className="flex-[1_1_380px] min-w-0">
          <TimetableCard exams={exams} nextIndex={nextIndex} td={td} subjectColors={subjectColors} />
        </div>

        {!newStudent && <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-6">{planAndNext}</div>}
      </div>
    </div>
  );
}

/* ── An outlined progress bar, filled with a sticker colour ── */

function OutlinedBar({ pct, fill }: { pct: number; fill: string }) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <div
      className="h-3.5 rounded-full overflow-hidden mt-1"
      style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: "100%", transform: `scaleX(${value / 100})`, background: fill, boxShadow: value > 0 && value < 100 ? "inset -2px 0 0 var(--outline)" : undefined }}
      />
    </div>
  );
}

/* ── This week: chunky outlined bars, today in tomato ── */

function WeekCard({
  summary,
  target,
  td,
}: {
  summary: {
    days: { key: string; label: string; hours: number }[];
    thisHours: number;
    thisSessions: number;
    bestDay: string;
    bestHours: number;
    hoursDiff: number;
    sessionsDiff: number;
  };
  target: number;
  td: string;
}) {
  const max = Math.max(target, ...summary.days.map((d) => d.hours), 1) * 1.15;
  const chartH = 124;
  const targetY = chartH - (target / max) * chartH;
  const diff = summary.hoursDiff;
  const diffText = diff === 0 ? "Same as last week" : `${Math.abs(diff).toFixed(1)}h ${diff > 0 ? "more" : "less"} than last week`;

  return (
    <section className="h-full rounded-[28px] p-6 flex flex-col gap-4" style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }} aria-label="This week">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-[22px] font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>This week</h2>
        <span className="text-[13px] font-medium" style={{ color: "var(--text-muted)" }}>Hours per day</span>
      </div>

      <div className="relative" style={{ height: chartH + 22 }}>
        <div className="absolute left-0 right-0 border-t-2 border-dashed" style={{ top: targetY, borderColor: "var(--divider)" }} />
        <span className="absolute left-0 text-[11px] font-medium -translate-y-full pb-0.5 tabular-nums" style={{ top: targetY, color: "var(--text-muted)" }}>
          {target}h target
        </span>
        <div className="absolute inset-x-0 top-0 grid grid-cols-7 gap-2 items-end" style={{ height: chartH }}>
          {summary.days.map((d) => {
            const isToday = d.key === td;
            const isFuture = d.key > td;
            const h = (d.hours / max) * chartH;
            return (
              <div key={d.key} className="flex justify-center h-full items-end" title={`${d.label}: ${d.hours.toFixed(1)}h`}>
                {isFuture || d.hours === 0 ? (
                  <div className="w-full max-w-9 border-t-2 border-dashed" style={{ borderColor: "var(--outline)", opacity: 0.35 }} />
                ) : (
                  <div
                    className="w-full max-w-9"
                    style={{
                      height: Math.max(8, h),
                      background: isToday ? "var(--tomato)" : "var(--paper)",
                      border: "2px solid var(--outline)",
                      borderRadius: "8px 8px 4px 4px",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-7 gap-2">
          {summary.days.map((d) => (
            <span key={d.key} className={`text-center text-xs ${d.key === td ? "font-bold" : ""}`} style={{ color: d.key === td ? "var(--text)" : "var(--text-muted)" }}>
              {d.label.slice(0, 1)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[30px] font-extrabold tracking-[-0.02em] tabular-nums" style={{ color: "var(--text)" }}>
          {summary.thisHours.toFixed(1)}h
        </span>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{diffText}</span>
      </div>
      <p className="text-[13px] -mt-2 tabular-nums" style={{ color: "var(--text-muted)" }}>
        {summary.thisSessions} sessions, {signed(summary.sessionsDiff)} vs last week. Best day {summary.bestDay}
      </p>
    </section>
  );
}

/* ── One recommendation, as an outlined row ── */

function RecRow({
  href,
  onClick,
  color,
  title,
  detail,
  tag,
  tagColor,
}: {
  href: string;
  onClick: () => void;
  color: string;
  title: string;
  detail: string;
  tag: string;
  tagColor: string;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="grid grid-cols-[8px_1fr_auto] items-center gap-3 px-4 py-3 rounded-2xl transition-colors duration-150 hover:bg-[var(--paper)]"
        style={{ border: "2px solid var(--outline)" }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="min-w-0">
          <span className="block text-[15px] font-bold truncate" style={{ color: "var(--text)" }}>{title}</span>
          <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{detail}</span>
        </span>
        <span className="text-xs font-bold whitespace-nowrap" style={{ color: tagColor }}>{tag}</span>
      </Link>
    </li>
  );
}
