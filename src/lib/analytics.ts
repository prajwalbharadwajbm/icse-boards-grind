import posthog from "posthog-js";
import type { AnalyticsEvent, EventProperties } from "./analytics-events";

/** Emails whose activity should never be sent to PostHog. */
export const INTERNAL_EMAILS = [
  "prajwalbm40@gmail.com",
  "rameshprajwal2001@gmail.com",
  "harshithsaiv2306@gmail.com",
];

let initialized = false;
let _currentEmail: string | null = null;

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
}

function isInternalUser(): boolean {
  return !!_currentEmail && INTERNAL_EMAILS.includes(_currentEmail);
}

export function capture<E extends AnalyticsEvent>(
  event: E,
  ...args: Record<string, never> extends EventProperties<E>
    ? [properties?: EventProperties<E>]
    : [properties: EventProperties<E>]
) {
  if (typeof window === "undefined") return;
  if (!initialized) initPostHog();
  if (isInternalUser()) return;
  posthog.capture(event, args[0] as Record<string, unknown>);
}

export function identify(uid: string, traits?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!initialized) initPostHog();
  _currentEmail = (traits?.email as string) ?? null;
  if (isInternalUser()) {
    posthog.opt_out_capturing();
    return;
  }
  posthog.opt_in_capturing();
  posthog.identify(uid, traits);
}

export function reset() {
  if (typeof window === "undefined") return;
  _currentEmail = null;
  posthog.reset();
}

/** Used only by PostHogProvider — not for general use. */
export function getPostHogInstance() {
  return posthog;
}

export function getCurrentEmail() {
  return _currentEmail;
}
