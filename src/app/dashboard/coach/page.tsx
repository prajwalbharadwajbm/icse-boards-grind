"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";
import { DailyBriefing } from "@/components/coach/daily-briefing";
import { CoachChat } from "@/components/coach/coach-chat";

export default function CoachPage() {
  useEffect(() => {
    capture("coach_page_viewed");
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Free trial banner */}
      <div
        className="rounded-2xl px-4 py-3.5"
        style={{
          background: "var(--paper)",
          border: "2px solid var(--outline)",
        }}
      >
        <div>
          <p className="text-[15px] font-bold" style={{ color: "var(--text)" }}>
            The AI coach is free to try right now
          </p>
          <p className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
            We&apos;re improving this feature over the next 2-3 days. Try it out and let us know what you think.
          </p>
        </div>
      </div>
      <DailyBriefing />
      <CoachChat />
    </div>
  );
}
