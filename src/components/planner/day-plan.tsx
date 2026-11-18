"use client";

import { useMemo } from "react";
import { getSubjectColors, getSubjectLabels, type Block } from "@/lib/constants";
import { useStore } from "@/store/use-store";
import { formatTime24, timeToMin } from "@/lib/utils";

interface DayPlanProps {
  blocks: Block[];
  nowMin: number;
  isPlanToday: boolean;
  onBlockClick: (block: Block, index: number) => void;
}

export function DayPlan({ blocks, nowMin, isPlanToday, onBlockClick }: DayPlanProps) {
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const SUBJECT_COLORS = useMemo(() => getSubjectColors(lang, elective), [lang, elective]);
  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(lang, elective), [lang, elective]);

  const renderedBlocks = useMemo(() => {
    return blocks.map((block, i) => {
      const startMin = timeToMin(block.start);
      // A block that runs past midnight (sleep ends at "00:00") ends the next day
      let endMin = timeToMin(block.end);
      if (endMin <= startMin) endMin += 1440;
      const duration = endMin - startMin;
      const isCurrent = isPlanToday && nowMin >= startMin && nowMin < endMin;
      const isPast = isPlanToday && nowMin >= endMin;
      const isStudy = block.type === "study";
      const dotColor = isStudy && block.subjectKey ? SUBJECT_COLORS[block.subjectKey] : undefined;
      // The current block sits on sunshine with black ink; the rest are plain outlined rows
      const ink = isCurrent ? "#000" : "var(--text)";
      const quiet = isCurrent ? "#000" : "var(--text-muted)";

      return (
        <div
          key={`${block.start}-${i}`}
          onClick={() => onBlockClick(block, i)}
          className={`flex items-center gap-3 min-h-[52px] px-4 py-3 rounded-2xl cursor-pointer transition-colors duration-150 ${
            isCurrent ? "bg-[var(--sun)]" : "bg-[var(--bg-card)] hover:bg-[var(--paper)]"
          }`}
          style={{
            opacity: isPast ? 0.5 : 1,
            border: "2px solid var(--outline)",
          }}
          aria-current={isCurrent ? "time" : undefined}
        >
          {/* Time column */}
          <div className="flex flex-col items-end justify-center shrink-0 w-20 leading-tight">
            <span className="text-[13px] font-bold tabular-nums" style={{ color: ink }}>
              {formatTime24(block.start)}
            </span>
            <span className="text-xs tabular-nums" style={{ color: quiet }}>
              {formatTime24(block.end)}
            </span>
          </div>

          {/* Dot */}
          <div className="flex items-center shrink-0">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: dotColor || "var(--divider)" }}
            />
          </div>

          {/* Label + meta */}
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold truncate" style={{ color: ink }}>
              {block.label}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              {block.subjectKey && (
                <span className="text-xs font-medium" style={{ color: isCurrent ? "#000" : "var(--text-secondary)" }}>
                  {SUBJECT_LABELS[block.subjectKey]}
                </span>
              )}
              <span className="text-xs tabular-nums" style={{ color: quiet }}>
                {duration} min
              </span>
            </div>
          </div>

          {/* Current indicator */}
          {isCurrent && (
            <span className="shrink-0 text-xs font-bold" style={{ color: "#000" }}>
              Now
            </span>
          )}
        </div>
      );
    });
  }, [blocks, nowMin, isPlanToday, onBlockClick, SUBJECT_COLORS, SUBJECT_LABELS]);

  if (blocks.length === 0) {
    return (
      <div className="rounded-2xl px-4 py-10 text-center" style={{ border: "2px solid var(--outline)", color: "var(--text-secondary)" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <p className="text-sm">No blocks for this day. Add a block to start planning.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {renderedBlocks}
    </div>
  );
}
