"use client";

export interface PreboardPaperOption {
  key: string;
  label: string;
  color: string;
}

const DATE_FIELD_CLASS =
  "h-10 w-[128px] shrink-0 px-2 rounded-xl text-[13px] tabular-nums outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]";

const inputId = (key: string) => `preboard-${key}`;

/**
 * One preboard date per paper. A cleared paper is saved as "" rather than removed: cloud sync merges
 * maps, so a removed key would come back from Firestore on the next sign-in. Dates outside `range`
 * are kept but flagged, and the planner ignores them.
 */
export function PreboardDates({
  papers,
  value,
  range,
  onChange,
}: {
  papers: PreboardPaperOption[];
  value: Record<string, string>;
  range: { min: string; max: string };
  onChange: (next: Record<string, string>) => void;
}) {
  const set = (key: string, date: string) => onChange({ ...value, [key]: date });
  const outOfRange = papers.filter((p) => value[p.key] && (value[p.key] < range.min || value[p.key] > range.max));
  const lastDay = new Date(range.max + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <fieldset>
      <legend className="sr-only">Preboard date for each paper</legend>
      {papers.map((p) => {
        const date = value[p.key] || "";
        return (
          <div
            key={p.key}
            className="flex items-center gap-2 py-2 border-b last:border-b-0 first:pt-0 last:pb-0"
            style={{ borderColor: "var(--divider)" }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} aria-hidden="true" />
            <label htmlFor={inputId(p.key)} className="text-[15px] font-medium leading-snug flex-1 min-w-0" style={{ color: "var(--text)" }}>
              {p.label}
            </label>
            <input
              id={inputId(p.key)}
              type="date"
              value={date}
              min={range.min}
              max={range.max}
              onChange={(e) => set(p.key, e.target.value)}
              className={DATE_FIELD_CLASS}
              style={{ background: "var(--bg-card)", color: date ? "var(--text)" : "var(--text-muted)" }}
            />
            {/* Hidden rather than disabled when empty, and focus goes back to the date, so keyboard users keep their place */}
            <button
              type="button"
              onClick={() => {
                set(p.key, "");
                document.getElementById(inputId(p.key))?.focus();
              }}
              tabIndex={date ? 0 : -1}
              aria-hidden={!date}
              aria-label={`Clear the ${p.label} preboard date`}
              className={`w-7 h-7 shrink-0 rounded-full text-lg leading-none cursor-pointer hover:bg-[var(--paper)] ${date ? "" : "invisible"}`}
              style={{ color: "var(--text-muted)" }}
            >
              ×
            </button>
          </div>
        );
      })}
      {outOfRange.length > 0 && (
        <p role="alert" className="text-[13px] font-bold mt-3" style={{ color: "var(--danger)" }}>
          {outOfRange.map((p) => p.label).join(", ")}: preboards come before the boards, so pick a date up to {lastDay}
        </p>
      )}
    </fieldset>
  );
}
