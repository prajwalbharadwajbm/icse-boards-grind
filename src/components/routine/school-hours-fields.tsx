"use client";

import type { SchoolHours } from "@/store/use-store";
import { DEFAULT_SCHOOL_HOURS, usableSchoolHours } from "@/lib/school-hours";

// Monday first, as students read a school week
const DAYS = [
  { day: 1, short: "Mon" },
  { day: 2, short: "Tue" },
  { day: 3, short: "Wed" },
  { day: 4, short: "Thu" },
  { day: 5, short: "Fri" },
  { day: 6, short: "Sat" },
  { day: 0, short: "Sun" },
];

const FIELD =
  "w-full h-11 px-3 rounded-xl text-sm tabular-nums outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]";

/**
 * School time and days, so the planner leaves them free. `value` null means the student
 * isn't going to school (holidays, study leave) and the whole day is planned.
 */
export function SchoolHoursFields({
  value,
  onChange,
}: {
  value: SchoolHours | null | undefined;
  onChange: (value: SchoolHours | null) => void;
}) {
  const hasSchool = !!value;
  const hours = value ?? DEFAULT_SCHOOL_HOURS;
  const problem = !hasSchool || usableSchoolHours(hours)
    ? null
    : hours.days.length === 0
      ? "Pick at least one school day"
      : "Home by has to be after school starts";

  const toggleDay = (day: number) => {
    const days = hours.days.includes(day) ? hours.days.filter((d) => d !== day) : [...hours.days, day];
    onChange({ ...hours, days });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={hasSchool}
        onClick={() => onChange(hasSchool ? null : DEFAULT_SCHOOL_HOURS)}
        className="flex items-center justify-between gap-3 text-left"
      >
        <span>
          <span className="block text-sm font-bold" style={{ color: "var(--text)" }}>I have school</span>
          <span className="block text-[13px]" style={{ color: "var(--text-muted)" }}>
            {hasSchool ? "No study is planned during school on school days" : "Your whole day is planned, e.g. during holidays or study leave"}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="relative shrink-0 w-12 h-7 rounded-full transition-colors duration-150"
          style={{ background: hasSchool ? "var(--primary)" : "var(--paper)", border: "2px solid var(--outline)" }}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full transition-[left] duration-150"
            style={{ left: hasSchool ? "calc(100% - 22px)" : "2px", background: hasSchool ? "#fff" : "var(--outline)" }}
          />
        </span>
      </button>

      {hasSchool && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="school-start" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>School starts</label>
              <input
                id="school-start"
                type="time"
                value={hours.start}
                onChange={(e) => onChange({ ...hours, start: e.target.value })}
                className={FIELD}
                style={{ background: "var(--bg-card)", color: "var(--text)" }}
              />
            </div>
            <div>
              <label htmlFor="school-end" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Home by</label>
              <input
                id="school-end"
                type="time"
                value={hours.end}
                onChange={(e) => onChange({ ...hours, end: e.target.value })}
                className={FIELD}
                style={{ background: "var(--bg-card)", color: "var(--text)" }}
              />
            </div>
          </div>
          <fieldset>
            <legend className="text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>School days</legend>
            <div className="flex flex-wrap gap-2">
              {DAYS.map(({ day, short }) => {
                const pressed = hours.days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => toggleDay(day)}
                    className="h-9 min-w-[48px] px-3 rounded-full text-[13px] font-bold transition-colors duration-150"
                    style={{
                      border: "2px solid var(--outline)",
                      background: pressed ? "var(--primary)" : "var(--bg-card)",
                      color: pressed ? "var(--on-primary)" : "var(--text)",
                    }}
                  >
                    {short}
                  </button>
                );
              })}
            </div>
          </fieldset>
          {problem && (
            <p role="alert" className="text-[13px] font-bold" style={{ color: "var(--danger)" }}>
              {problem}. Until then your whole day is planned
            </p>
          )}
        </>
      )}
    </div>
  );
}
