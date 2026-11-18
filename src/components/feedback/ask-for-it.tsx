"use client";

import { useEffect, useState } from "react";
import { capture } from "@/lib/analytics";
import type { EventProperties } from "@/lib/analytics-events";

export type RequestedFeature = EventProperties<"feature_requested">["feature"];

const storageKey = (feature: RequestedFeature) => `bg-asked-${feature}`;

/**
 * "Ask for it": a feature we haven't built (or that only half works) gets a button that counts
 * requests in PostHog (feature_requested). It's built once enough students ask. One tap per
 * feature per device; the thanks line replaces the button.
 */
export function AskForIt({
  feature,
  source,
  label,
  thanks,
}: {
  feature: RequestedFeature;
  source: EventProperties<"feature_requested">["source"];
  label: string;
  thanks: string;
}) {
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    try {
      setAsked(localStorage.getItem(storageKey(feature)) === "1");
    } catch {
      // Storage blocked: the button just shows again
    }
  }, [feature]);

  if (asked) {
    return (
      <p className="text-[13px] font-bold" style={{ color: "var(--text-secondary)" }} role="status">
        {thanks}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        capture("feature_requested", { feature, source });
        try {
          localStorage.setItem(storageKey(feature), "1");
        } catch {
          // Counted anyway; it just may be asked again on this device
        }
        setAsked(true);
      }}
      className="min-h-10 px-4 py-2 rounded-full text-[13px] font-bold transition-[transform,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-left"
      style={{ background: "var(--bg-card)", color: "var(--text)", border: "2px solid var(--outline)", boxShadow: "2px 2px 0 var(--outline)" }}
    >
      {label}
    </button>
  );
}
