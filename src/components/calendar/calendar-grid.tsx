"use client";

import { useMemo } from "react";
import { getExams, getSubjectColors, type Exam } from "@/lib/constants";
import { useStore } from "@/store/use-store";
import { today, dateStr, daysBetween } from "@/lib/utils";
import type { StudyLogEntry } from "@/store/use-store";

interface CalendarGridProps {
  month: number;
  year: number;
  studyLog: Record<string, StudyLogEntry>;
  onDayClick: (dateString: string) => void;
  selectedDate?: string | null;
}

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGrid({ month, year, studyLog, onDayClick, selectedDate }: CalendarGridProps) {
  const td = today();
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const exams = useMemo(() => getExams(lang, elective), [lang, elective]);
  const subjectColors = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);

  const { cells } = useMemo(() => {
    const dim = new Date(year, month + 1, 0).getDate();
    const fdo = new Date(year, month, 1).getDay();

    const cellData: {
      day: number;
      dateString: string;
      isToday: boolean;
      isExamDay: boolean;
      isRevisionDay: boolean;
      examColor: string | null;
      hasStudy: boolean;
      isCurrentMonth: boolean;
    }[] = [];

    // Empty cells for offset
    for (let i = 0; i < fdo; i++) {
      cellData.push({
        day: 0,
        dateString: "",
        isToday: false,
        isExamDay: false,
        isRevisionDay: false,
        examColor: null,
        hasStudy: false,
        isCurrentMonth: false,
      });
    }

    for (let d = 1; d <= dim; d++) {
      const dateObj = new Date(year, month, d);
      const ds = dateStr(dateObj);
      const isToday = ds === td;

      // Check exam day
      const exam = exams.find((e) => e.date === ds);
      const isExamDay = !!exam;
      const examColor = exam ? subjectColors[exam.key] || "var(--primary)" : null;

      // Check revision day (1-2 days before any exam)
      const isRevisionDay = !isExamDay && exams.some((e) => {
        const diff = daysBetween(ds, e.date);
        return diff >= 1 && diff <= 2;
      });

      // Check study activity
      const logEntry = studyLog[ds];
      const hasStudy = !!(logEntry && logEntry.hours > 0);

      cellData.push({
        day: d,
        dateString: ds,
        isToday,
        isExamDay,
        isRevisionDay,
        examColor,
        hasStudy,
        isCurrentMonth: true,
      });
    }

    return { cells: cellData, daysInMonth: dim, firstDayOffset: fdo };
  }, [month, year, studyLog, td, exams, subjectColors]);

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1">
        {DAY_HEADERS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-2"
            style={{ color: "var(--text-muted)" }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar cells: today ringed in cobalt, exam days outlined, the selected day on primary-light */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((cell, i) => {
          if (!cell.isCurrentMonth) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }

          const isSelected = selectedDate === cell.dateString;

          return (
            <button
              key={cell.dateString}
              onClick={() => onDayClick(cell.dateString)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-colors duration-150 relative cursor-pointer ${
                isSelected ? "bg-[var(--primary-light)]" : "bg-transparent hover:bg-[var(--paper)]"
              }`}
              style={{
                border: cell.isToday
                  ? "2px solid var(--primary)"
                  : isSelected
                  ? "2px solid var(--outline)"
                  : cell.isExamDay
                  ? "2px solid var(--outline)"
                  : "2px solid transparent",
              }}
              aria-current={cell.isToday ? "date" : undefined}
              aria-pressed={isSelected}
            >
              <span
                className={`text-sm tabular-nums ${cell.isToday || cell.isExamDay || isSelected ? "font-bold" : ""}`}
                style={{
                  color: cell.isToday ? "var(--primary)" : "var(--text)",
                }}
              >
                {cell.day}
              </span>

              {/* Indicators row */}
              <div className="flex items-center gap-0.5">
                {cell.isExamDay && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: cell.examColor || "var(--danger)" }}
                  />
                )}
                {cell.isRevisionDay && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--warning)" }}
                  />
                )}
                {cell.hasStudy && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--success)" }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-x-5 gap-y-2 mt-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-[5px]" style={{ border: "2px solid var(--primary)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-[5px] flex items-center justify-center" style={{ border: "2px solid var(--outline)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--danger)" }} />
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Exam</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--warning)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Revision</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: "var(--success)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Studied</span>
        </div>
      </div>
    </div>
  );
}
