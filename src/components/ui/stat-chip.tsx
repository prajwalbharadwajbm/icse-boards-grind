"use client";

interface StatChipProps {
  label: string;
  value: string | number;
  /** Optional line under the figure, e.g. "of 6h target" or "21 this week" */
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  /** Kept for older callers; ignored in the Sticker brand */
  color?: string;
  /** A tinted background for the one tile that carries a sticker */
  tone?: "plain" | "sun";
  /** A sticker shown at the right of the tile */
  sticker?: React.ReactNode;
  children?: React.ReactNode;
}

/** A number tile: label, big display figure, optional context line */
export function StatChip({ label, value, sub, icon, tone = "plain", sticker, children }: StatChipProps) {
  return (
    <div
      className="rounded-[20px] p-4 flex items-center justify-between gap-3 min-w-0"
      style={{ background: tone === "sun" ? "var(--sun-soft)" : "var(--bg-card)", border: "2px solid var(--outline)" }}
    >
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text)" }}>
          {icon && (
            <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4" style={{ color: "var(--text-muted)" }}>
              {icon}
            </span>
          )}
          <span className="truncate">{label}</span>
        </div>
        <p className="font-display text-[34px] leading-none font-extrabold tracking-[-0.02em] tabular-nums" style={{ color: "var(--text)" }}>
          {value}
        </p>
        {sub && (
          <div className="text-[13px] tabular-nums" style={{ color: "var(--text-muted)" }}>
            {sub}
          </div>
        )}
        {children}
      </div>
      {sticker}
    </div>
  );
}
