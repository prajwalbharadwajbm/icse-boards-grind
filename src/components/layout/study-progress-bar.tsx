"use client";

import { useStore } from "@/store/use-store";
import { today } from "@/lib/utils";

/** Hairline under the top bar: today's study hours against the daily target */
export function StudyProgressBar() {
  const studyLog = useStore((s) => s.studyLog);
  const target = useStore((s) => s.studyHours) || 8;
  const td = today();
  const hoursToday = (studyLog || {})[td]?.hours || 0;
  const pct = Math.min(100, (hoursToday / target) * 100);

  return (
    <div
      className="w-full shrink-0"
      style={{ height: 3, background: "transparent" }}
      role="progressbar"
      aria-label="Study hours today"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      title={`${hoursToday.toFixed(1)}h of ${target}h today`}
    >
      <div
        className="h-full w-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ background: pct >= 100 ? "var(--mint)" : "var(--primary)", transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}
