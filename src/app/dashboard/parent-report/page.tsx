"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { useStore } from "@/store/use-store";
import { useAuth } from "@/providers/auth-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ParentReportPage() {
  const { user } = useAuth();
  const shareReportEnabled = useStore((s) => s.shareReportEnabled);
  const setField = useStore((s) => s.setField);

  useEffect(() => {
    posthog.capture("parent_report_page_viewed");
  }, []);

  const reportUrl =
    typeof window !== "undefined" && user
      ? `${window.location.origin}/report?uid=${user.uid}`
      : "";

  const copyLink = () => {
    if (!reportUrl) return;
    navigator.clipboard.writeText(reportUrl);
  };

  const shareViaWhatsApp = () => {
    if (!reportUrl) return;
    const text = encodeURIComponent(
      `Here's my ICSE 2026 study progress report:\n${reportUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    posthog.capture("parent_report_shared", { method: "whatsapp" });
  };

  const shareViaEmail = () => {
    if (!reportUrl) return;
    const subject = encodeURIComponent("My ICSE 2026 Progress Report");
    const body = encodeURIComponent(
      `Hi,\n\nHere's my latest ICSE 2026 study progress report:\n${reportUrl}\n\nYou can view my subjects, study hours, streak, and exam schedule — all in one page.`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
    posthog.capture("parent_report_shared", { method: "email" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Parent Progress Report
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Share a read-only report of your study progress with your parents.
        </p>
      </div>

      {/* Enable/Disable */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
              {shareReportEnabled ? "Sharing is enabled" : "Enable report sharing"}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              {shareReportEnabled
                ? "Anyone with the link can view your progress."
                : "Turn this on to generate a shareable link."}
            </p>
          </div>
          <button
            onClick={() => {
              setField("shareReportEnabled", !shareReportEnabled);
              posthog.capture("parent_report_toggle", { enabled: !shareReportEnabled });
            }}
            className="w-11 h-6 rounded-full transition-all relative shrink-0"
            style={{ background: shareReportEnabled ? "var(--primary)" : "var(--border)" }}
          >
            <div
              className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
              style={{ left: shareReportEnabled ? 22 : 2 }}
            />
          </button>
        </div>
      </Card>

      {/* Link & sharing */}
      {shareReportEnabled && user && (
        <>
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
              Report Link
            </h3>
            <div className="flex gap-2">
              <input
                readOnly
                value={reportUrl}
                className="flex-1 px-3 py-2 rounded-lg text-xs"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              />
              <Button size="sm" variant="secondary" onClick={copyLink}>
                Copy
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
              Share with Parents
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                style={{ background: "var(--primary)", color: "#fff" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Email
              </button>
            </div>
          </Card>

          {/* Preview link */}
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
              Preview
            </h3>
            <p className="text-xs mb-3" style={{ color: "var(--text-secondary)" }}>
              See what your parents will see when they open the link.
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => window.open(reportUrl, "_blank")}
            >
              Open Report Preview
            </Button>
          </Card>
        </>
      )}

      {/* Info */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>
          What parents can see
        </h3>
        <ul className="space-y-2">
          {[
            "Overall syllabus completion percentage",
            "Study hours (this week + total)",
            "Current study streak",
            "Subject-by-subject progress bars",
            "Upcoming exam schedule with days remaining",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--success)"
                strokeWidth="2"
                className="shrink-0 mt-0.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
