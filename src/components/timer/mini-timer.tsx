"use client";

import Link from "next/link";
import { useTimerStore } from "@/store/use-timer-store";
import { ProgressRing } from "@/components/ui/progress-ring";

interface MiniTimerProps {
  collapsed: boolean;
}

export function MiniTimer({ collapsed }: MiniTimerProps) {
  const seconds = useTimerStore((s) => s.seconds);
  const totalSeconds = useTimerStore((s) => s.totalSeconds);
  const running = useTimerStore((s) => s.running);
  const phase = useTimerStore((s) => s.phase);
  const subject = useTimerStore((s) => s.subject);

  const pause = useTimerStore((s) => s.pause);
  const start = useTimerStore((s) => s.start);

  // Only show when timer has been started (running or paused mid-session)
  const isActive = running || (seconds > 0 && seconds < totalSeconds);
  if (!isActive) return null;

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeDisplay = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const progress = totalSeconds > 0 ? seconds / totalSeconds : 0;
  const ringColor = phase === "work" ? "var(--primary)" : "#16a34a";

  if (collapsed) {
    return (
      <Link href="/dashboard/timer" className="block px-3 py-2">
        <div className="flex flex-col items-center gap-1">
          <ProgressRing radius={18} stroke={3} progress={progress} color={ringColor}>
            <span className="text-[8px] font-bold font-mono text-white">{mins}m</span>
          </ProgressRing>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/dashboard/timer" className="block px-3 py-2">
      <div
        className="rounded-lg p-2.5 flex items-center gap-2.5 transition-all hover:opacity-90"
        style={{
          background: running
            ? "linear-gradient(135deg, rgba(26,115,232,0.2), rgba(26,115,232,0.1))"
            : "rgba(255,255,255,0.05)",
          border: `1px solid ${running ? "rgba(26,115,232,0.3)" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <ProgressRing radius={18} stroke={3} progress={progress} color={ringColor}>
          {running ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: ringColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ringColor }} />
            </span>
          ) : (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white" opacity={0.6}>
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </ProgressRing>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold font-mono text-white">{timeDisplay}</span>
            <span
              className="text-[10px] font-semibold uppercase px-1 rounded"
              style={{
                color: phase === "work" ? "var(--primary)" : "#16a34a",
                background: phase === "work" ? "rgba(26,115,232,0.15)" : "rgba(22,163,74,0.15)",
              }}
            >
              {phase}
            </span>
          </div>
          {subject && (
            <p className="text-[10px] text-white/40 truncate">{subject}</p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            running ? pause() : start();
          }}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {running ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>
    </Link>
  );
}
