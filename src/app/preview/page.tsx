"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store/use-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StudyProgressBar } from "@/components/layout/study-progress-bar";
import DashboardPage from "@/app/dashboard/page";
import { getDefaultChapters } from "@/lib/constants";
import type { StoreState } from "@/store/use-store";

/** Build realistic demo data for the preview */
function buildDemoData(): Partial<StoreState> {
  const lang = "kannada";
  const elective = "computer";
  const subjects = getDefaultChapters(lang, elective);

  // Mark some chapters as completed / in_progress for realism
  const markChapters = (key: string, completedCount: number, inProgressCount: number) => {
    const chs = subjects[key];
    if (!chs) return;
    chs.forEach((ch, i) => {
      if (i < completedCount) ch.status = "completed";
      else if (i < completedCount + inProgressCount) ch.status = "in_progress";
    });
  };

  markChapters("physics", 6, 2);
  markChapters("chemistry", 5, 2);
  markChapters("biology", 7, 3);
  markChapters("geography", 8, 2);
  markChapters("math", 4, 2);
  markChapters("english_lang", 3, 1);
  markChapters("english_lit", 2, 1);
  markChapters(lang, 2, 1);
  markChapters(elective, 3, 1);
  markChapters("history", 5, 2);

  // Study log for the last 7 days
  const studyLog: Record<string, { hours: number; sessions: number }> = {};
  const todayDate = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const hours = +(3 + Math.random() * 3).toFixed(1); // 3–6 hours
    studyLog[key] = { hours, sessions: Math.floor(hours / 1.2) };
  }

  // Make today's study time visible in the progress bar
  const todayKey = todayDate.toISOString().split("T")[0];
  studyLog[todayKey] = { hours: 3.5, sessions: 3 };

  return {
    onboarded: true,
    name: "Arjun Sharma",
    learningStyle: "mixed",
    studyHours: 6,
    targetPercent: 90,
    prepLevel: "somewhat",
    selectedLanguage: lang,
    selectedElective: elective,
    streak: 12,
    lastStudyDate: todayKey,
    subjects,
    studyLog,
    subjectRatings: {
      physics: "strong",
      chemistry: "medium",
      biology: "strong",
      math: "weak",
      english_lang: "medium",
      english_lit: "medium",
      geography: "strong",
      history: "medium",
      [lang]: "medium",
      [elective]: "strong",
    },
    routine: {
      wake: "06:00",
      breakfast: "07:30",
      lunch: "13:00",
      snack: "16:30",
      dinner: "20:00",
      sleep: "22:30",
    },
    theme: "dark",
    timerSessions: [],
    planCache: {},
    customPlans: {},
    examAssessments: {},
    coachMessages: {},
    dailyBriefingCache: {},
    solvedPapers: [],
    grammarDrillStats: {},
    recentGrammarQuestions: {},
    jcFlashcardsReviewed: [],
    jcQuizScores: [],
    leaderboardOptIn: true,
    shareReportEnabled: false,
    streakRecoveryAvailable: false,
    streakBeforeReset: 0,
    revisionNotes: {},
  };
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [ready, setReady] = useState(false);
  const cleanupRef = useRef(false);

  useEffect(() => {
    if (!uid) return;

    // Populate store with demo data
    const store = useStore.getState();
    store.setAll(buildDemoData());
    store.markHydrated();
    setReady(true);

    // Cleanup on unmount — reset store so demo data doesn't persist
    return () => {
      if (!cleanupRef.current) {
        cleanupRef.current = true;
        useStore.getState().resetStore();
      }
    };
  }, [uid]);

  // Apply dark theme CSS vars
  useEffect(() => {
    if (!ready) return;
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [ready]);

  if (!uid) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f", color: "#fff" }}>
        <div className="text-center space-y-3 p-6">
          <h1 className="text-2xl font-bold">Preview Unavailable</h1>
          <p className="text-sm" style={{ color: "#999" }}>
            A valid <code className="px-1.5 py-0.5 rounded text-xs" style={{ background: "#222" }}>uid</code> parameter is required.
          </p>
          <p className="text-xs" style={{ color: "#666" }}>
            Example: <code style={{ background: "#222" }} className="px-1.5 py-0.5 rounded">/preview?uid=test123</code>
          </p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
        <div
          className="w-10 h-10 border-3 border-solid rounded-full animate-spin"
          style={{ borderColor: "#7b61ff", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <PreviewShell>
      <DashboardPage />
    </PreviewShell>
  );
}

/** Dashboard layout shell — mirrors dashboard/layout.tsx without auth hooks */
function PreviewShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Preview banner */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] text-center py-1.5 text-xs font-semibold tracking-wide"
        style={{ background: "linear-gradient(90deg, #7b61ff, #1a73e8)", color: "#fff" }}
      >
        Preview Mode &mdash; For Razorpay verification
      </div>

      <div className="flex w-full h-full pt-7">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onCloseMobile={() => setMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <StudyProgressBar />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

/** Top-level page wrapped in Suspense (required for useSearchParams in static export) */
export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
          <div
            className="w-10 h-10 border-3 border-solid rounded-full animate-spin"
            style={{ borderColor: "#7b61ff", borderTopColor: "transparent" }}
          />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
