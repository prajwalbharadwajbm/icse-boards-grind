"use client";

import { useMemo } from "react";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { getSubjectLabels, getSubjectColors } from "@/lib/constants";
import { today } from "@/lib/utils";

export function TimerStats() {
  const data = useStore();
  const td = today();
  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(data.selectedLanguage || "kannada", data.selectedElective || "computer"), [data.selectedLanguage, data.selectedElective]);
  const SUBJECT_COLORS = useMemo(() => getSubjectColors(data.selectedLanguage || "kannada", data.selectedElective || "computer"), [data.selectedLanguage, data.selectedElective]);

  const todayLog = (data.studyLog || {})[td];
  const hoursToday = todayLog ? todayLog.hours : 0;
  const sessionsToday = todayLog ? todayLog.sessions : 0;
  const streak = data.streak || 0;

  // Recent sessions for today (last 5)
  const recentSessions = useMemo(() => {
    return (data.timerSessions || [])
      .filter((s) => s.date === td)
      .slice(-5)
      .reverse();
  }, [data.timerSessions, td]);

  // Subject breakdown for today
  const subjectBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    (data.timerSessions || [])
      .filter((s) => s.date === td)
      .forEach((s) => {
        map[s.subject] = (map[s.subject] || 0) + s.minutes;
      });
    return Object.entries(map)
      .map(([key, mins]) => ({
        key,
        label: SUBJECT_LABELS[key] || key,
        color: SUBJECT_COLORS[key] || "var(--text-secondary)",
        minutes: mins,
      }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [data.timerSessions, td, SUBJECT_LABELS, SUBJECT_COLORS]);

  const totalMinutesToday = subjectBreakdown.reduce((sum, s) => sum + s.minutes, 0);

  return (
    <div className="flex flex-col gap-4">
      {/* Today's summary */}
      <Card>
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em] mb-4"
          style={{ color: "var(--text)" }}
        >
          Today
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p
              className="font-display text-[30px] leading-none font-extrabold tracking-[-0.02em] tabular-nums"
              style={{ color: "var(--text)" }}
            >
              {hoursToday.toFixed(1)}
            </p>
            <p
              className="text-[13px] font-medium mt-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Hours
            </p>
          </div>
          <div>
            <p
              className="font-display text-[30px] leading-none font-extrabold tracking-[-0.02em] tabular-nums"
              style={{ color: "var(--text)" }}
            >
              {sessionsToday}
            </p>
            <p
              className="text-[13px] font-medium mt-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Sessions
            </p>
          </div>
          <div>
            <p
              className="font-display text-[30px] leading-none font-extrabold tracking-[-0.02em] tabular-nums"
              style={{ color: "var(--text)" }}
            >
              {streak}
            </p>
            <p
              className="text-[13px] font-medium mt-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Day streak
            </p>
          </div>
        </div>
      </Card>

      {/* By subject */}
      <Card>
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em] mb-3"
          style={{ color: "var(--text)" }}
        >
          By subject
        </h3>
        {subjectBreakdown.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            No sessions yet today. Start the timer to log one.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {subjectBreakdown.map((item) => {
              const pct =
                totalMinutesToday > 0
                  ? (item.minutes / totalMinutesToday) * 100
                  : 0;
              return (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: item.color }}
                      />
                      <span
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold tabular-nums shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.minutes} min
                    </span>
                  </div>
                  <ProgressBar value={pct} color={item.color} />
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Recent sessions: a quiet list, rows split by soft dividers */}
      <Card>
        <h3
          className="font-display text-lg font-extrabold tracking-[-0.01em] mb-1"
          style={{ color: "var(--text)" }}
        >
          Recent sessions
        </h3>
        {recentSessions.length === 0 ? (
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            No sessions recorded today.
          </p>
        ) : (
          <div className="flex flex-col">
            {recentSessions.map((session, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5"
                style={{ borderTop: i > 0 ? "1px solid var(--divider)" : undefined }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background:
                      SUBJECT_COLORS[session.subject] || "var(--text-secondary)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-bold truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {SUBJECT_LABELS[session.subject] || session.subject}
                  </p>
                  {session.chapter && (
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {session.chapter}
                    </p>
                  )}
                </div>
                <span
                  className="text-xs font-bold tabular-nums shrink-0"
                  style={{ color: "var(--text-muted)" }}
                >
                  {session.minutes} min
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
