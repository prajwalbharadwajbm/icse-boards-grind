"use client";

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  className?: string;
}

export function ProgressBar({ value, color = "var(--primary)", height = 6, className = "" }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`rounded-full overflow-hidden ${className}`}
      style={{ height, background: "var(--bg-raised)" }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full w-full rounded-full origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `scaleX(${pct / 100})`, background: color }}
      />
    </div>
  );
}
