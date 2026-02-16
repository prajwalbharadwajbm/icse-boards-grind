"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useTimerStore } from "@/store/use-timer-store";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TimerDisplayProps {
  subject: string;
  chapter: string;
}

export function TimerDisplay({ subject, chapter }: TimerDisplayProps) {
  const preset = useTimerStore((s) => s.preset);
  const seconds = useTimerStore((s) => s.seconds);
  const totalSeconds = useTimerStore((s) => s.totalSeconds);
  const running = useTimerStore((s) => s.running);
  const phase = useTimerStore((s) => s.phase);
  const customWork = useTimerStore((s) => s.customWork);
  const customBreak = useTimerStore((s) => s.customBreak);
  const workMinutes = useTimerStore((s) => s.workMinutes);

  const setPreset = useTimerStore((s) => s.setPreset);
  const setCustomWork = useTimerStore((s) => s.setCustomWork);
  const setCustomBreak = useTimerStore((s) => s.setCustomBreak);
  const applyCustom = useTimerStore((s) => s.applyCustom);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const reset = useTimerStore((s) => s.reset);

  // Sync subject/chapter to global store
  useEffect(() => {
    useTimerStore.getState().setSubject(subject);
  }, [subject]);

  useEffect(() => {
    useTimerStore.getState().setChapter(chapter);
  }, [chapter]);

  const handleStart = () => {
    capture("timer_started", {
      subject: subject || "general",
      chapter: chapter || "",
      duration_minutes: workMinutes,
      preset,
    });
    start();
  };

  const handleReset = () => reset();

  // Format time
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const progress = totalSeconds > 0 ? seconds / totalSeconds : 0;
  const ringColor = phase === "work" ? "var(--primary)" : "#16a34a";

  return (
    <Card>
      {/* Preset selector */}
      <div className="flex gap-2 mb-6">
        {(
          [
            { key: "pomodoro", label: "25/5 Pomodoro" },
            { key: "deep", label: "50/10 Deep Focus" },
            { key: "custom", label: "Custom" },
          ] as const
        ).map((p) => (
          <button
            key={p.key}
            onClick={() => setPreset(p.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: preset === p.key ? "var(--primary)" : "var(--bg)",
              color: preset === p.key ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${preset === p.key ? "var(--primary)" : "var(--border)"}`,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Custom inputs */}
      {preset === "custom" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex gap-3 mb-6"
        >
          <div className="flex-1">
            <Input
              label="Work (min)"
              type="number"
              min={1}
              max={120}
              value={customWork}
              onChange={(e) => setCustomWork(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Break (min)"
              type="number"
              min={1}
              max={60}
              value={customBreak}
              onChange={(e) => setCustomBreak(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="flex items-end">
            <Button size="sm" onClick={applyCustom}>
              Apply
            </Button>
          </div>
        </motion.div>
      )}

      {/* Timer ring */}
      <div className="flex flex-col items-center">
        <div className={running ? "timer-active" : ""}>
          <ProgressRing
            radius={90}
            stroke={8}
            progress={progress}
            color={ringColor}
          >
            <div className="flex flex-col items-center">
              <span
                className="text-4xl font-bold font-mono tracking-wider"
                style={{ color: "var(--text)" }}
              >
                {timeDisplay}
              </span>
              <span
                className="text-sm font-medium mt-1"
                style={{
                  color: phase === "work" ? "var(--primary)" : "#16a34a",
                }}
              >
                {phase === "work" ? "Work" : "Break"}
              </span>
            </div>
          </ProgressRing>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-6">
          {!running ? (
            <Button onClick={handleStart} size="lg">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Start
              </span>
            </Button>
          ) : (
            <Button onClick={pause} variant="secondary" size="lg">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                Pause
              </span>
            </Button>
          )}
          <Button onClick={handleReset} variant="ghost" size="lg">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
              Reset
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
