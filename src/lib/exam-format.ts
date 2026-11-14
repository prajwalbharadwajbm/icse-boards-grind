import { formatTime24 } from "./utils";

/* Formatting for exam dates and times, one format across the app */

export function longDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function clock(hhmm: string) {
  return formatTime24(hhmm).replace("AM", "am").replace("PM", "pm");
}

export function hoursLabel(duration: string) {
  const h = parseFloat(duration) || 2;
  return `${h} ${h === 1 ? "hour" : "hours"}`;
}

export function paperName(subject: string) {
  return subject.replace(/ Paper \d$/, "");
}

export function plural(n: number, one: string, many = `${one}s`) {
  return `${n} ${n === 1 ? one : many}`;
}

export function signed(n: number, digits = 0) {
  const v = Math.abs(n).toFixed(digits);
  return n > 0 ? `+${v}` : n < 0 ? `−${v}` : v;
}
