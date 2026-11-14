"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { getExams, getSubjectColors, getSubjectLabels, type Block } from "@/lib/constants";
import { today, formatDate, formatTime24, timeToMin, daysBetween } from "@/lib/utils";
import { getDayPlan } from "@/lib/algorithms";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarGrid } from "@/components/calendar/calendar-grid";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPage() {
  const data = useStore();
  const td = today();

  const lang = data.selectedLanguage || "kannada";
  const elective = data.selectedElective || "computer";
  const EXAMS = useMemo(() => getExams(lang, elective), [lang, elective]);
  const SUBJECT_COLORS = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);
  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);

  const now = new Date();
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentNow, setCurrentNow] = useState(new Date());

  // Auto-refresh every minute
  useEffect(() => {
    capture("calendar_page_viewed");
    const interval = setInterval(() => setCurrentNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const nowMin = currentNow.getHours() * 60 + currentNow.getMinutes();

  // Navigation
  const goToPrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const goToToday = () => {
    const t = new Date();
    setCalMonth(t.getMonth());
    setCalYear(t.getFullYear());
    setSelectedDate(td);
  };

  const isCurrentMonth = calMonth === now.getMonth() && calYear === now.getFullYear();

  // Day click handler
  const handleDayClick = (dateString: string) => {
    setSelectedDate(dateString === selectedDate ? null : dateString);
  };

  // Selected day detail
  const selectedDayPlan = useMemo(() => {
    if (!selectedDate) return null;
    return getDayPlan(selectedDate, data);
  }, [selectedDate, data]);

  const selectedDayExam = useMemo(() => {
    if (!selectedDate) return null;
    return EXAMS.find((e) => e.date === selectedDate) || null;
  }, [selectedDate, EXAMS]);

  const selectedDayStudyMin = useMemo(() => {
    if (!selectedDayPlan) return 0;
    return selectedDayPlan.reduce((sum, b) => {
      if (b.type === "study") return sum + (timeToMin(b.end) - timeToMin(b.start));
      return sum;
    }, 0);
  }, [selectedDayPlan]);

  // Exams this month
  const monthExams = useMemo(() => {
    return EXAMS.filter((e) => {
      const d = new Date(e.date + "T00:00:00");
      return d.getMonth() === calMonth && d.getFullYear() === calYear;
    });
  }, [calMonth, calYear, EXAMS]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Month Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevMonth}
            aria-label="Previous month"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 bg-[var(--bg-card)] hover:bg-[var(--paper)]"
            style={{ border: "2px solid var(--outline)", color: "var(--text)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] min-w-[200px] sm:min-w-[260px] text-center" style={{ color: "var(--text)" }}>
            {MONTH_NAMES[calMonth]} {calYear}
          </h2>
          <button
            onClick={goToNextMonth}
            aria-label="Next month"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 bg-[var(--bg-card)] hover:bg-[var(--paper)]"
            style={{ border: "2px solid var(--outline)", color: "var(--text)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {!isCurrentMonth && (
          <Button variant="secondary" size="md" onClick={goToToday}>
            Today
          </Button>
        )}
      </motion.div>

      {/* Exams this month */}
      {monthExams.length > 0 && (
        <Card>
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-3" style={{ color: "var(--text)" }}>
            Exams this month
          </h3>
          <div className="flex flex-wrap gap-2">
            {monthExams.map((exam) => {
              const days = daysBetween(td, exam.date);
              const active = selectedDate === exam.date;
              return (
                <button
                  key={exam.key}
                  onClick={() => setSelectedDate(exam.date)}
                  className={`flex items-center gap-2 h-9 px-4 rounded-full text-sm border-2 border-[var(--outline)] transition-colors duration-150 cursor-pointer ${
                    active
                      ? "bg-[var(--text)] text-[var(--bg)] font-bold"
                      : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: SUBJECT_COLORS[exam.key] }}
                  />
                  <span>{exam.subject}</span>
                  <span className="text-xs font-bold tabular-nums" style={{ color: active ? "var(--bg)" : "var(--text-muted)" }}>
                    {days === 0 ? "Today" : days > 0 ? `${days}d` : `${Math.abs(days)}d ago`}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Calendar Grid */}
      <Card>
        <CalendarGrid
          month={calMonth}
          year={calYear}
          studyLog={data.studyLog || {}}
          onDayClick={handleDayClick}
          selectedDate={selectedDate}
        />
      </Card>

      {/* Selected Day Detail Panel */}
      {selectedDate && selectedDayPlan && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card>
            {/* Detail Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
                  {formatDate(selectedDate)}
                </h3>
                {selectedDayExam && (
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: SUBJECT_COLORS[selectedDayExam.key] }}
                    />
                    <span className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
                      Exam: {selectedDayExam.subject} ({selectedDayExam.duration})
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.01em] tabular-nums" style={{ color: "var(--text)" }}>
                  {Math.floor(selectedDayStudyMin / 60)}h {selectedDayStudyMin % 60}m
                </span>
                <p className="text-xs font-medium mt-1" style={{ color: "var(--text-muted)" }}>study time</p>
              </div>
            </div>

            {/* Blocks list: plain rows on soft dividers, the current block on sunshine */}
            <div>
              {selectedDayPlan.map((block, i) => {
                const startMin = timeToMin(block.start);
                const endMin = timeToMin(block.end);
                const duration = endMin - startMin;
                const isCurrent = selectedDate === td && nowMin >= startMin && nowMin < endMin;
                const isPast = selectedDate === td && nowMin >= endMin;
                const isStudy = block.type === "study";
                const dotColor = isStudy && block.subjectKey ? SUBJECT_COLORS[block.subjectKey] : undefined;

                return (
                  <div
                    key={`${block.start}-${i}`}
                    className={`flex items-center gap-3 min-h-[44px] py-2 px-3 ${isCurrent ? "rounded-xl" : ""}`}
                    style={{
                      opacity: isPast ? 0.5 : 1,
                      background: isCurrent ? "var(--sun)" : "transparent",
                      borderTop: i > 0 && !isCurrent ? "1px solid var(--divider)" : "1px solid transparent",
                    }}
                    aria-current={isCurrent ? "time" : undefined}
                  >
                    <span className={`text-xs tabular-nums w-24 sm:w-[140px] shrink-0 ${isCurrent ? "font-bold" : ""}`} style={{ color: isCurrent ? "#000" : "var(--text-secondary)" }}>
                      {formatTime24(block.start)} to {formatTime24(block.end)}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: dotColor || "var(--divider)" }}
                    />
                    <span className={`text-sm flex-1 min-w-0 truncate ${isCurrent ? "font-bold" : ""}`} style={{ color: isCurrent ? "#000" : "var(--text)" }}>
                      {block.label}
                    </span>
                    <span className="text-xs shrink-0 tabular-nums" style={{ color: isCurrent ? "#000" : "var(--text-muted)" }}>
                      {duration}m
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Study subjects breakdown */}
            {(() => {
              const subjectBreakdown: Record<string, number> = {};
              selectedDayPlan.forEach((b) => {
                if (b.type === "study" && b.subjectKey) {
                  const mins = timeToMin(b.end) - timeToMin(b.start);
                  subjectBreakdown[b.subjectKey] = (subjectBreakdown[b.subjectKey] || 0) + mins;
                }
              });
              const entries = Object.entries(subjectBreakdown);
              if (entries.length === 0) return null;

              return (
                <div className="mt-3 pt-4" style={{ borderTop: "1px solid var(--divider)" }}>
                  <p className="text-sm font-bold mb-2.5" style={{ color: "var(--text)" }}>
                    Subject breakdown
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {entries.map(([key, mins]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: SUBJECT_COLORS[key] }}
                        />
                        <span className="text-[13px] font-medium" style={{ color: "var(--text)" }}>
                          {SUBJECT_LABELS[key]}
                        </span>
                        <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
                          {Math.floor(mins / 60)}h {mins % 60}m
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
