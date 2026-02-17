"use client";

import { Suspense, useEffect, useState, useRef, type ComponentType } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/use-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StudyProgressBar } from "@/components/layout/study-progress-bar";
import { getDefaultChapters } from "@/lib/constants";
import type { StoreState } from "@/store/use-store";

// Import all dashboard page components
import DashboardPage from "@/app/dashboard/page";
import SubjectsPage from "@/app/dashboard/subjects/page";
import NotesPage from "@/app/dashboard/notes/page";
import PapersPage from "@/app/dashboard/papers/page";
import PlannerPage from "@/app/dashboard/planner/page";
import CoachPage from "@/app/dashboard/coach/page";
import TimerPage from "@/app/dashboard/timer/page";
import CalendarPage from "@/app/dashboard/calendar/page";
import ProgressPage from "@/app/dashboard/progress/page";
import LeaderboardPage from "@/app/dashboard/leaderboard/page";
import ParentReportPage from "@/app/dashboard/parent-report/page";
import SettingsPage from "@/app/dashboard/settings/page";
import EnglishPage from "@/app/dashboard/english/page";

/** Map slug to page component */
const PAGE_MAP: Record<string, ComponentType> = {
  "": DashboardPage,
  subjects: SubjectsPage,
  notes: NotesPage,
  papers: PapersPage,
  planner: PlannerPage,
  coach: CoachPage,
  timer: TimerPage,
  calendar: CalendarPage,
  progress: ProgressPage,
  leaderboard: LeaderboardPage,
  "parent-report": ParentReportPage,
  settings: SettingsPage,
  english: EnglishPage,
};

/** Build realistic demo data for the preview */
function buildDemoData(): Partial<StoreState> {
  const lang = "kannada";
  const elective = "computer";
  const subjects = getDefaultChapters(lang, elective);

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

  const studyLog: Record<string, { hours: number; sessions: number }> = {};
  const todayDate = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const hours = +(3 + Math.random() * 3).toFixed(1);
    studyLog[key] = { hours, sessions: Math.floor(hours / 1.2) };
  }

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
  const pathname = usePathname();
  const uid = searchParams.get("uid");
  const [ready, setReady] = useState(false);
  const cleanupRef = useRef(false);

  useEffect(() => {
    if (!uid) return;

    const store = useStore.getState();
    store.setAll(buildDemoData());
    store.markHydrated();
    setReady(true);

    return () => {
      if (!cleanupRef.current) {
        cleanupRef.current = true;
        useStore.getState().resetStore();
      }
    };
  }, [uid]);

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

  // Resolve which page to render: /preview → "", /preview/subjects → "subjects"
  const slug = pathname.replace(/^\/preview\/?/, "").split("/")[0] || "";
  const PageComponent = PAGE_MAP[slug] || DashboardPage;

  return (
    <PreviewShell currentSlug={slug} uid={uid}>
      <PageComponent />
    </PreviewShell>
  );
}

/** Dashboard layout shell — mirrors dashboard/layout.tsx without auth hooks */
function PreviewShell({ children, currentSlug, uid }: { children: React.ReactNode; currentSlug: string; uid: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const showCoachBanner = currentSlug !== "coach" && currentSlug !== "settings";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="flex w-full h-full pt-7">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onCloseMobile={() => setMobileOpen(false)}
          linkPrefix="/preview"
          linkSuffix={`?uid=${uid}`}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <StudyProgressBar />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {showCoachBanner && (
              <Link href={`/preview/coach?uid=${uid}`}>
                <div
                  className="mb-4 rounded-lg px-4 py-2.5 flex items-center gap-3 cursor-pointer transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #7b61ff, #1a73e8)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" className="shrink-0">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-xs font-semibold text-white">AI Study Coach — Get personalized help free!</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" className="shrink-0 ml-auto">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            )}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function PreviewClient() {
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
