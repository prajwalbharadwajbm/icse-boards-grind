import posthog from "posthog-js";
import type { AnalyticsEvent, EventProperties } from "./analytics-events";
// No imports from ./utils: utils imports this module (sendNotification), so keep the graph acyclic.
import { CORE_EXAMS, EXAM_YEAR, getExams } from "./constants";

/** Emails whose activity should never be sent to PostHog. */
export const INTERNAL_EMAILS = [
  "prajwalbm40@gmail.com",
  "rameshprajwal2001@gmail.com",
  "harshithsaiv2306@gmail.com",
];

/** Routes that render the app with demo data. Nothing captured there is real usage. */
const UNTRACKED_PATH_PREFIXES = ["/preview"];

let initialized = false;
let _currentEmail: string | null = null;
let _identifiedUid: string | null = null;

/** Study profile shared by every event. Set from the store by PostHogProvider. */
interface AnalyticsContext {
  onboarded: boolean;
  language: string | null;
  elective: string | null;
  groupTwo?: string[] | null;
}

let _context: AnalyticsContext = { onboarded: false, language: null, elective: null };
let _lastPersonPropsKey = "";

export function initPostHog() {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || key === "phc_placeholder") return;

  posthog.init(key, {
    api_host: host || "https://eu.i.posthog.com",
    capture_pageview: false,
    capture_pageleave: false,
    autocapture: false,
    disable_session_recording: false,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
  initialized = true;
  registerSuperProperties();
}

function isInternalUser(): boolean {
  return !!_currentEmail && INTERNAL_EMAILS.includes(_currentEmail);
}

function isUntrackedPath(): boolean {
  const path = window.location.pathname;
  return UNTRACKED_PATH_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

function isStandalone(): boolean {
  try {
    return window.matchMedia("(display-mode: standalone)").matches;
  } catch {
    return false;
  }
}

/** Local date as YYYY-MM-DD (same format as the timetable). */
function localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The user's next board paper, based on their language and elective once onboarded. */
function nextPaper(): { key: string; days: number } | null {
  const exams = _context.onboarded && _context.language && _context.elective
    ? getExams(_context.language, _context.elective, _context.groupTwo)
    : [...CORE_EXAMS].sort((a, b) => a.date.localeCompare(b.date));
  const td = localDate(new Date());
  const next = exams.find((e) => e.date >= td);
  if (!next) return null;
  const days = Math.round((new Date(next.date + "T00:00:00").getTime() - new Date(td + "T00:00:00").getTime()) / 86400000);
  return { key: next.key, days };
}

/** Properties attached to every event. */
function contextProperties() {
  const next = nextPaper();
  return {
    exam_year: EXAM_YEAR,
    onboarded: _context.onboarded,
    language: _context.language,
    elective: _context.elective,
    days_to_next_paper: next?.days ?? null,
    next_paper: next?.key ?? null,
    is_pwa: isStandalone(),
  };
}

/** Super properties also reach events PostHog captures itself, such as $exception. */
function registerSuperProperties() {
  if (!initialized) return;
  posthog.register({
    exam_year: EXAM_YEAR,
    onboarded: _context.onboarded,
    language: _context.language,
    elective: _context.elective,
  });
}

function syncPersonProperties() {
  if (!initialized || !_identifiedUid || isInternalUser()) return;
  const props = {
    exam_year: EXAM_YEAR,
    onboarded: _context.onboarded,
    language: _context.language,
    elective: _context.elective,
  };
  const key = JSON.stringify([_identifiedUid, props]);
  if (key === _lastPersonPropsKey) return;
  _lastPersonPropsKey = key;
  posthog.setPersonProperties(props);
}

/** Called by PostHogProvider whenever the student's language, elective or onboarding state changes. */
export function setAnalyticsContext(context: AnalyticsContext) {
  _context = {
    onboarded: context.onboarded,
    language: context.onboarded ? context.language : null,
    elective: context.onboarded ? context.elective : null,
    groupTwo: context.onboarded ? context.groupTwo : null,
  };
  if (typeof window === "undefined") return;
  if (!initialized) initPostHog();
  registerSuperProperties();
  syncPersonProperties();
}

export function capture<E extends AnalyticsEvent>(
  event: E,
  ...args: Record<string, never> extends EventProperties<E>
    ? [properties?: EventProperties<E>]
    : [properties: EventProperties<E>]
) {
  if (typeof window === "undefined") return;
  if (!initialized) initPostHog();
  if (isInternalUser() || isUntrackedPath()) return;
  posthog.capture(event, { ...contextProperties(), ...(args[0] as Record<string, unknown> | undefined) });
}

/**
 * Link this browser to the Firebase uid.
 * `traits` are $set on every call; `traitsOnce` are $set_once (kept from the first call).
 */
export function identify(uid: string, traits?: Record<string, unknown>, traitsOnce?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!initialized) initPostHog();
  _currentEmail = (traits?.email as string) ?? null;
  if (isInternalUser()) {
    _identifiedUid = null;
    if (initialized) posthog.opt_out_capturing();
    return;
  }
  if (!initialized) return;
  posthog.opt_in_capturing();
  posthog.identify(uid, traits, traitsOnce);
  _identifiedUid = uid;
  syncPersonProperties();
}

/**
 * Forget the signed-in user. Only resets PostHog when this browser is still identified,
 * so signed-out visitors keep one anonymous id across page loads.
 */
export function reset() {
  if (typeof window === "undefined") return;
  _currentEmail = null;
  _identifiedUid = null;
  _lastPersonPropsKey = "";
  if (!initialized) return;
  if (posthog.get_property("$user_state") !== "identified") return;
  posthog.reset();
  registerSuperProperties();
}

// Longest prefix first: "streak-risk" before "streak".
const NOTIFICATION_TAG_TYPES = [
  "timer-work-done", "timer-break-done", "daily-goal", "exam-countdown",
  "morning-kickoff", "evening-nudge", "streak-risk", "chapter", "streak", "grammar",
];

/** Turn a notification tag such as "exam-countdown-2027-02-15-Maths" into a type such as "exam_countdown". */
export function notificationTypeFromTag(tag?: string): string {
  const match = tag ? NOTIFICATION_TAG_TYPES.find((p) => tag.startsWith(p)) : undefined;
  return match ? match.replace(/-/g, "_") : "other";
}

/** Record a shown notification. Pass the page Notification to also record its click. */
export function trackNotification(type: string, notification?: Notification) {
  capture("notification_shown", { type });
  if (notification) {
    notification.onclick = () => {
      capture("notification_clicked", { type, via: "page" });
      window.focus();
    };
  }
}

/** Used only by PostHogProvider — not for general use. */
export function getPostHogInstance() {
  return posthog;
}

export function getCurrentEmail() {
  return _currentEmail;
}
