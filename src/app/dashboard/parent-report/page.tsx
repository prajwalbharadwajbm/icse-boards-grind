"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { useAuth } from "@/providers/auth-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXAM_YEAR } from "@/lib/constants";

export default function ParentReportPage() {
  const { user } = useAuth();
  const shareReportEnabled = useStore((s) => s.shareReportEnabled);
  const setField = useStore((s) => s.setField);

  useEffect(() => {
    capture("parent_report_page_viewed");
  }, []);

  const reportUrl =
    typeof window !== "undefined" && user
      ? `${window.location.origin}/report?uid=${user.uid}`
      : "";

  const copyLink = () => {
    if (!reportUrl) return;
    navigator.clipboard.writeText(reportUrl);
    capture("parent_report_shared", { method: "copy_link" });
  };

  const shareViaWhatsApp = () => {
    if (!reportUrl) return;
    const text = encodeURIComponent(
      `Here's my ICSE ${EXAM_YEAR} study progress report:\n${reportUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    capture("parent_report_shared", { method: "whatsapp" });
  };

  const shareViaEmail = () => {
    if (!reportUrl) return;
    const subject = encodeURIComponent(`My ICSE ${EXAM_YEAR} progress report`);
    const body = encodeURIComponent(
      `Hi,\n\nHere's my latest ICSE ${EXAM_YEAR} study progress report:\n${reportUrl}\n\nYou can view my subjects, study hours, streak, and exam schedule — all in one page.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    capture("parent_report_shared", { method: "email" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="pb-1">
        <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>
          Parent progress report
        </h2>
        <p className="text-base mt-2" style={{ color: "var(--text-secondary)" }}>
          Share a read-only report of your study progress with your parents.
        </p>
      </div>

      {/* Enable/Disable */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-lg font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
              {shareReportEnabled ? "Sharing is enabled" : "Enable report sharing"}
            </p>
            <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {shareReportEnabled
                ? "Anyone with the link can view your progress."
                : "Turn this on to generate a shareable link."}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={!!shareReportEnabled}
            aria-label="Report sharing"
            onClick={() => {
              setField("shareReportEnabled", !shareReportEnabled);
              capture("parent_report_toggle", { enabled: !shareReportEnabled });
            }}
            className="w-11 h-6 rounded-full border-2 border-[var(--outline)] transition-colors duration-150 relative shrink-0 cursor-pointer"
            style={{ background: shareReportEnabled ? "var(--primary)" : "var(--paper)" }}
          >
            <span
              className="w-4 h-4 rounded-full absolute top-[2px] transition-[left] duration-150"
              style={{ left: shareReportEnabled ? 22 : 2, background: "#ffffff", border: "2px solid var(--outline)" }}
            />
          </button>
        </div>
      </Card>

      {/* Link & sharing */}
      {shareReportEnabled && user && (
        <>
          <Card>
            <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-3" style={{ color: "var(--text)" }}>
              Report link
            </h3>
            <div className="flex gap-2">
              <input
                readOnly
                value={reportUrl}
                className="flex-1 min-w-0 h-11 px-4 rounded-xl text-xs outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
                style={{
                  background: "var(--paper)",
                  color: "var(--text)",
                }}
              />
              <Button variant="secondary" className="h-11 shrink-0" onClick={copyLink}>
                Copy
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-3" style={{ color: "var(--text)" }}>
              Share with parents
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={shareViaWhatsApp} className="w-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </Button>
              <Button onClick={shareViaEmail} className="w-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Email
              </Button>
            </div>
          </Card>

          {/* Preview link */}
          <Card>
            <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-1" style={{ color: "var(--text)" }}>
              Preview
            </h3>
            <p className="text-[13px] mb-4" style={{ color: "var(--text-secondary)" }}>
              See what your parents will see when they open the link.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => window.open(reportUrl, "_blank")}
            >
              Open report preview
            </Button>
          </Card>
        </>
      )}

      {/* Info */}
      <Card>
        <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-2" style={{ color: "var(--text)" }}>
          What parents can see
        </h3>
        <ul>
          {[
            "Overall syllabus completion percentage",
            "Study hours (this week + total)",
            "Current study streak",
            "Subject-by-subject progress bars",
            "Upcoming exam schedule with days remaining",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 py-2.5 border-b last:border-b-0" style={{ borderColor: "var(--divider)" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5"
                style={{ color: "var(--success)" }}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[15px]" style={{ color: "var(--text)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
