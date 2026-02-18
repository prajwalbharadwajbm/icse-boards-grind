"use client";

import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { StatChip } from "@/components/ui/stat-chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getExams, getSubjectColors, getSubjectLabels, MOTIVATIONAL_QUOTES } from "@/lib/constants";
import { today, daysBetween, formatDate, formatTime24, timeToMin } from "@/lib/utils";
import { getDayPlan, getRevisionDueChapters } from "@/lib/algorithms";

export default function DashboardPage() {
  const data = useStore();
  const td = today();
  const [now, setNow] = useState(new Date());

  const lang = data.selectedLanguage || "kannada";
  const elective = data.selectedElective || "computer";
  const exams = useMemo(() => getExams(lang, elective), [lang, elective]);
  const subjectLabels = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);
  const subjectColors = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);

  // F5: Auto-refresh every second for live countdown
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

  // Next exam countdown — skip exams whose end time (11AM + duration) has passed
  const nextExam = useMemo(() => {
    return exams.find((e) => {
      const durationHrs = parseFloat(e.duration) || 2;
      const examEnd = new Date(e.date + "T11:00:00");
      examEnd.setHours(examEnd.getHours() + durationHrs);
      return examEnd.getTime() > now.getTime();
    });
  }, [exams, now]);
  const examDays = nextExam ? daysBetween(td, nextExam.date) : null;

  // F5: Live countdown computation
  const countdown = useMemo(() => {
    if (!nextExam) return null;
    const examDate = new Date(nextExam.date + "T11:00:00");
    const diff = examDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds };
  }, [nextExam, now]);

  // Today's plan
  const plan = useMemo(() => getDayPlan(td, data), [td, data]);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Upcoming exams
  const upcomingExams = exams.filter((e) => e.date >= td).slice(0, 4);

  // F1: Streak Recovery
  const streakRecoveryAvailable = data.streakRecoveryAvailable;
  const streakBeforeReset = data.streakBeforeReset;
  const recoveryTarget = target * 2;
  const recoveryProgress = Math.min(100, (hoursToday / recoveryTarget) * 100);

  // F7: Weekly Summary
  const weeklySummary = useMemo(() => {
    const getMonday = (d: Date) => {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.getFullYear(), d.getMonth(), diff);
    };
    const nowDate = new Date();
    const thisMonday = getMonday(nowDate);
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(lastMonday.getDate() - 7);

    let thisHours = 0, thisSessions = 0, bestDay = "", bestHours = 0;
    let lastHours = 0, lastSessions = 0;

    for (let i = 0; i < 7; i++) {
      // This week
      const d1 = new Date(thisMonday);
      d1.setDate(d1.getDate() + i);
      const key1 = d1.toISOString().split("T")[0];
      const log1 = (data.studyLog || {})[key1];
      if (log1) {
        thisHours += log1.hours;
        thisSessions += log1.sessions;
        if (log1.hours > bestHours) {
          bestHours = log1.hours;
          bestDay = d1.toLocaleDateString("en-IN", { weekday: "short" });
        }
      }

      // Last week
      const d2 = new Date(lastMonday);
      d2.setDate(d2.getDate() + i);
      const key2 = d2.toISOString().split("T")[0];
      const log2 = (data.studyLog || {})[key2];
      if (log2) {
        lastHours += log2.hours;
        lastSessions += log2.sessions;
      }
    }

    return {
      thisHours, thisSessions, bestDay: bestDay || "—", bestHours,
      lastHours, lastSessions,
      hoursDiff: thisHours - lastHours,
      sessionsDiff: thisSessions - lastSessions,
    };
  }, [data.studyLog]);

  // F4: Smart Recommendations
  const smartRecs = useMemo(() => {
    const weak: { subject: string; color: string; detail: string; key: string }[] = [];
    const grammarWeak: { category: string; accuracy: number }[] = [];
    const revisionDue = getRevisionDueChapters(td, data.subjects);

    // Weak subjects
    Object.keys(subjectLabels).forEach((key) => {
      const rating = (data.subjectRatings || {})[key] || "medium";
      const exam = exams.find((e) => e.key === key);
      const chapters = data.subjects[key] || [];
      const incomplete = chapters.filter((c) => c.status !== "completed").length;
      if (rating === "weak" && exam && exam.date >= td) {
        weak.push({
          subject: subjectLabels[key],
          color: subjectColors[key],
          detail: `${daysBetween(td, exam.date)}d to exam, ${incomplete} chapters left`,
          key,
        });
      }
    });

    // Grammar weak spots
    if (data.grammarDrillStats) {
      Object.entries(data.grammarDrillStats).forEach(([cat, stats]) => {
        if (stats.attempted >= 3) {
          const accuracy = (stats.correct / stats.attempted) * 100;
          if (accuracy < 60) {
            grammarWeak.push({ category: cat, accuracy: Math.round(accuracy) });
          }
        }
      });
    }

    return { weak, grammarWeak, revisionDue: revisionDue.slice(0, 4) };
  }, [data.subjects, data.subjectRatings, data.grammarDrillStats, td, exams, subjectLabels, subjectColors]);

  const hasSmartRecs = smartRecs.weak.length > 0 || smartRecs.grammarWeak.length > 0 || smartRecs.revisionDue.length > 0;

  // Motivation quote
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Date.now() / 60000) % MOTIVATIONAL_QUOTES.length];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Motivation Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-4"
        style={{ background: "var(--primary-light)" }}
      >
        <p className="text-sm" style={{ color: "var(--text)" }}>{quote}</p>
      </motion.div>

      {/* F1: Streak Recovery Banner */}
      {streakRecoveryAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#fff" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            <span className="font-semibold text-sm">Streak Recovery Available!</span>
          </div>
          <p className="text-sm opacity-90 mb-3">
            You missed a day! Study {recoveryTarget.toFixed(1)}h today to recover your {streakBeforeReset}-day streak.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-white/30 overflow-hidden">
              <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${recoveryProgress}%` }} />
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">{hoursToday.toFixed(1)}h / {recoveryTarget.toFixed(1)}h</span>
          </div>
        </motion.div>
      )}

      {/* F5: Enhanced Exam Countdown */}
      {nextExam && countdown && (
        <Card
          className="!p-0 overflow-hidden"
          style={{
            background: examDays !== null && examDays <= 1
              ? "linear-gradient(135deg, #ef4444, #f97316)"
              : examDays !== null && examDays <= 3
              ? "linear-gradient(135deg, #f59e0b, #ef4444)"
              : undefined,
          }}
        >
          <div className="p-5">
            <p className="text-sm font-medium" style={{ color: examDays !== null && examDays <= 3 ? "#fff" : "var(--text-secondary)" }}>Next Exam</p>
            <p className="text-xl font-bold mt-1" style={{ color: examDays !== null && examDays <= 3 ? "#fff" : "var(--text)" }}>{nextExam.subject}</p>
            <div className="flex items-center gap-3 mt-3">
              {[
                { value: countdown.days, label: "days" },
                { value: countdown.hours, label: "hrs" },
                { value: countdown.minutes, label: "min" },
                { value: countdown.seconds, label: "sec" },
              ].map((unit) => (
                <div key={unit.label} className="text-center">
                  <div
                    className="text-2xl font-extrabold font-mono px-2.5 py-1 rounded-lg"
                    style={{
                      color: examDays !== null && examDays <= 3 ? "#fff" : "var(--primary)",
                      background: examDays !== null && examDays <= 3 ? "rgba(255,255,255,0.15)" : "var(--primary-light)",
                    }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <span
                    className="text-xs mt-1 block"
                    style={{ color: examDays !== null && examDays <= 3 ? "rgba(255,255,255,0.8)" : "var(--text-secondary)" }}
                  >
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm mt-2" style={{ color: examDays !== null && examDays <= 3 ? "rgba(255,255,255,0.8)" : "var(--text-secondary)" }}>
              {formatDate(nextExam.date)} · {nextExam.duration}
            </p>
          </div>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatChip
          label="Hours Today"
          value={`${hoursToday.toFixed(1)}h`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
        />
        <StatChip
          label="Chapters Done"
          value={`${chapsDone}/${totalChapters}`}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
          color="var(--success)"
        />
        <StatChip
          label="Day Streak"
          value={data.streak || 0}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
          color="var(--warning)"
        />
        <StatChip
          label="Sessions"
          value={sessionsToday}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>}
          color="#7b61ff"
        />
      </div>

      {/* Hours Progress */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>Study Progress Today</span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{hoursToday.toFixed(1)}h / {target}h</span>
        </div>
        <ProgressBar value={(hoursToday / target) * 100} />
      </Card>

      {/* F7: Weekly Summary */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>This Week</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{weeklySummary.thisHours.toFixed(1)}h</p>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Hours</span>
              {weeklySummary.hoursDiff !== 0 && (
                <span className="text-xs font-semibold" style={{ color: weeklySummary.hoursDiff > 0 ? "var(--success)" : "var(--danger)" }}>
                  {weeklySummary.hoursDiff > 0 ? "\u2191" : "\u2193"}{Math.abs(weeklySummary.hoursDiff).toFixed(1)}
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{weeklySummary.thisSessions}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Sessions</span>
              {weeklySummary.sessionsDiff !== 0 && (
                <span className="text-xs font-semibold" style={{ color: weeklySummary.sessionsDiff > 0 ? "var(--success)" : "var(--danger)" }}>
                  {weeklySummary.sessionsDiff > 0 ? "\u2191" : "\u2193"}{Math.abs(weeklySummary.sessionsDiff)}
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>{weeklySummary.bestDay}</p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Best day ({weeklySummary.bestHours.toFixed(1)}h)</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Today&apos;s Schedule</h3>
          <div className="space-y-1">
            {plan.slice(0, 10).map((block, i) => {
              const blockStart = timeToMin(block.start);
              const blockEnd = timeToMin(block.end);
              const isCurrent = nowMin >= blockStart && nowMin < blockEnd;
              const isPast = nowMin >= blockEnd;
              const dotColor = block.type === "study" && block.subjectKey ? subjectColors[block.subjectKey] : undefined;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-1.5 px-2 rounded-lg text-sm ${isCurrent ? "ring-1 ring-[var(--primary)]" : ""}`}
                  style={{
                    opacity: isPast ? 0.5 : 1,
                    background: isCurrent ? "var(--primary-light)" : "transparent",
                  }}
                >
                  <span className="text-xs font-mono w-16 shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {formatTime24(block.start)}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: dotColor || "var(--border)" }}
                  />
                  <span style={{ color: "var(--text)" }}>{block.label}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Upcoming Exams</h3>
            <div className="space-y-3">
              {upcomingExams.map((exam) => {
                const days = daysBetween(td, exam.date);
                return (
                  <div key={exam.key} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[exam.key] }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{exam.subject}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{formatDate(exam.date)} · {exam.duration}</p>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: days <= 3 ? "var(--danger)" : "var(--text-secondary)" }}
                    >
                      {days === 0 ? "TODAY" : `${days}d`}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* F4: Smart Recommendations (replaces Focus Areas) */}
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Smart Recommendations</h3>
            {!hasSmartRecs ? (
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No focus areas right now. Keep up the good work!</p>
            ) : (
              <div className="space-y-3">
                {/* Weak Subjects */}
                {smartRecs.weak.map((item, i) => (
                  <Link
                    key={`weak-${i}`}
                    href="/dashboard/timer"
                    onClick={() => capture("weak_area_clicked", { type: "weak_subject", subject: item.key })}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.subject}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.detail}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "var(--danger)" }}>weak</span>
                  </Link>
                ))}

                {/* Grammar Weak Spots */}
                {smartRecs.grammarWeak.map((item, i) => (
                  <Link
                    key={`grammar-${i}`}
                    href="/dashboard/english"
                    onClick={() => capture("weak_area_clicked", { type: "grammar", category: item.category })}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#7b61ff" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>Grammar: {item.category}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.accuracy}% accuracy — needs practice</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "var(--danger)" }}>drill</span>
                  </Link>
                ))}

                {/* Revision Due */}
                {smartRecs.revisionDue.map((item, i) => (
                  <Link
                    key={`rev-${i}`}
                    href="/dashboard/timer"
                    onClick={() => capture("weak_area_clicked", { type: "revision", subject: item.subjectKey })}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[item.subjectKey] || "var(--warning)" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{subjectLabels[item.subjectKey] || item.subjectKey}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.chapterName} — revision due</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#fffbeb", color: "var(--warning)" }}>revision</span>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
