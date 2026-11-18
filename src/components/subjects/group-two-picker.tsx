"use client";

import { GROUP_TWO_OPTIONS } from "@/lib/constants";

export const GROUP_TWO_MIN = 2;
export const GROUP_TWO_MAX = 3;

/** ICSE Group II: pick any two or three. Science counts as one subject (three papers) */
export function GroupTwoPicker({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  const toggle = (key: string) => {
    if (value.includes(key)) {
      onChange(value.filter((k) => k !== key));
    } else if (value.length < GROUP_TWO_MAX) {
      onChange([...value, key]);
    }
  };
  const tooFew = value.length < GROUP_TWO_MIN;

  return (
    <fieldset>
      <legend className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>Group II subjects</legend>
      <p className="text-[13px] mb-2.5" style={{ color: "var(--text-muted)" }}>Pick 2 or 3, as on your ICSE registration</p>
      <div className="flex flex-wrap gap-2">
        {GROUP_TWO_OPTIONS.map((option) => {
          const on = value.includes(option.key);
          const full = !on && value.length >= GROUP_TWO_MAX;
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={on}
              disabled={full}
              onClick={() => toggle(option.key)}
              className="min-h-10 px-3.5 py-1.5 rounded-full text-[13px] font-bold transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed text-left"
              style={{
                border: "2px solid var(--outline)",
                background: on ? "var(--primary)" : "var(--bg-card)",
                color: on ? "var(--on-primary)" : "var(--text)",
              }}
            >
              {option.name}
              {"detail" in option && <span className="font-medium opacity-80"> ({option.detail})</span>}
            </button>
          );
        })}
      </div>
      {tooFew && (
        <p role="alert" className="text-[13px] font-bold mt-2" style={{ color: "var(--danger)" }}>
          Pick at least {GROUP_TWO_MIN}
        </p>
      )}
    </fieldset>
  );
}
