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
  const ringColor = phase === "work" ? "var(--primary)" : "var(--success)";

  if (collapsed) {
    return (
      <Link href="/dashboard/timer" className="block px-3 py-2">
        <div className="flex flex-col items-center gap-1">
          <ProgressRing radius={18} stroke={3} progress={progress} color={ringColor}>
            <span className="text-[9px] font-medium tabular-nums" style={{ color: "var(--text)" }}>{mins}m</span>
          </ProgressRing>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/dashboard/timer" className="block px-3 py-2">
      <div
        className="rounded-2xl p-2.5 flex items-center gap-2.5 transition-colors hover:bg-[var(--paper)]"
        style={{
          background: "var(--sun-soft)",
          border: "2px solid var(--outline)",
        }}
      >
        <ProgressRing radius={18} stroke={3} progress={progress} color={ringColor}>
          {running ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: ringColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: ringColor }} />
            </span>
          ) : (
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-muted)" }}>
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </ProgressRing>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium tabular-nums" style={{ color: "var(--text)" }}>{timeDisplay}</span>
            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {phase === "work" ? "Focus" : "Break"}
            </span>
          </div>
          {subject && (
            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{subject}</p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            running ? pause() : start();
          }}
          aria-label={running ? "Pause timer" : "Resume timer"}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:brightness-125"
          style={{ background: "var(--bg-card)", border: "2px solid var(--outline)", color: "var(--text)" }}
        >
          {running ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>
    </Link>
  );
}
