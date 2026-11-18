"use client";

import { useEffect, useState } from "react";
import { capture } from "@/lib/analytics";
import type { EventProperties } from "@/lib/analytics-events";
import { Button } from "@/components/ui/button";

type FeatureRequest = EventProperties<"feature_requested">;
export type RequestedFeature = FeatureRequest["feature"];

/** What each button says, and the thanks that replaces it */
const COPY: Record<RequestedFeature, { label: string; thanks: string }> = {
  class_9: { label: "I'm in Class 9", thanks: "Noted: Class 9 is next if enough of you ask" },
  isc: { label: "I'm in ISC (Class 11/12)", thanks: "Noted: ISC is next if enough of you ask" },
  phone_reminders: { label: "Want reminders even when the app is closed?", thanks: "Noted: we'll add them if enough students ask" },
};

const storageKey = (feature: RequestedFeature) => `ask-for-it:${feature}`;

/**
 * "Ask for it": a feature we haven't built, or one that only half works, gets a button that counts
 * requests in PostHog (feature_requested). We build it once enough students ask. A request is
 * remembered on this device only once it was really sent, so a tap in /preview, or by someone
 * analytics ignores, doesn't hide the button later.
 */
export function AskForIt({ feature, source }: { feature: RequestedFeature; source: FeatureRequest["source"] }) {
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
        {COPY[feature].thanks}
      </p>
    );
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      className="h-auto min-h-9 py-1.5 text-left whitespace-normal"
      onClick={() => {
        if (capture("feature_requested", { feature, source })) {
          try {
            localStorage.setItem(storageKey(feature), "1");
          } catch {
            // Counted anyway; it may just be asked again on this device
          }
        }
        setAsked(true);
      }}
    >
      {COPY[feature].label}
    </Button>
  );
}
