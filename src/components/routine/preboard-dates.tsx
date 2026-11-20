"use client";

export interface PreboardPaperOption {
  key: string;
  label: string;
  color: string;
}

const DATE_FIELD_CLASS =
  "h-10 w-[128px] shrink-0 px-2 rounded-xl text-[13px] tabular-nums outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]";

/**
 * One preboard date per paper. A cleared paper is saved as "" rather than removed: cloud sync merges
 * maps, so a removed key would come back from Firestore on the next sign-in.
 */
export function PreboardDates({
  papers,
  value,
  onChange,
}: {
  papers: PreboardPaperOption[];
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
}) {
  const set = (key: string, date: string) => onChange({ ...value, [key]: date });

  return (
    <div>
      {papers.map((p) => {
        const date = value[p.key] || "";
        return (
          <div
            key={p.key}
            className="flex items-center gap-2 py-2 border-b last:border-b-0 first:pt-0 last:pb-0"
            style={{ borderColor: "var(--divider)" }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} aria-hidden="true" />
            <label htmlFor={`preboard-${p.key}`} className="text-[15px] font-medium leading-snug flex-1 min-w-0" style={{ color: "var(--text)" }}>
              {p.label}
            </label>
            <input
              id={`preboard-${p.key}`}
              type="date"
              value={date}
              onChange={(e) => set(p.key, e.target.value)}
              className={DATE_FIELD_CLASS}
              style={{ background: "var(--bg-card)", color: date ? "var(--text)" : "var(--text-muted)" }}
            />
            <button
              type="button"
              onClick={() => set(p.key, "")}
              disabled={!date}
              aria-label={`Clear the ${p.label} preboard date`}
              className="w-7 h-7 shrink-0 rounded-full text-lg leading-none cursor-pointer disabled:opacity-0 disabled:cursor-default hover:bg-[var(--paper)]"
              style={{ color: "var(--text-muted)" }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
