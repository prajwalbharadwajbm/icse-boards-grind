"use client";

import { Suspense, useEffect, useState, useRef, type ComponentType } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useStore } from "@/store/use-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { StudyProgressBar } from "@/components/layout/study-progress-bar";
import { CoachBanner } from "@/components/layout/coach-banner";
import { useAuth } from "@/providers/auth-provider";
import { useTimerEngine } from "@/hooks/use-timer-engine";
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
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

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
    avatar: "samosa",
    studyVibe: "night_owl",
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
    theme: "light",
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
  // AuthProvider resets the store once Firebase reports a signed-out visitor,
  // so load the demo data only after auth has settled.
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!uid || authLoading) return;

    const store = useStore.getState();
    store.setAll(buildDemoData());
    store.markHydrated();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init after store hydration
    setReady(true);

    return () => {
      if (!cleanupRef.current) {
        cleanupRef.current = true;
        useStore.getState().resetStore();
      }
    };
  }, [uid, authLoading]);

  useEffect(() => {
    if (!ready) return;
    // Sticker brand previews in its light theme
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [ready]);

  if (!uid) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0b0d14", color: "#eef0f5" }}>
        <div className="text-center space-y-3 p-6">
          <h1 className="text-2xl font-medium">Preview unavailable</h1>
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0b0d14" }}>
        <div
          className="w-10 h-10 border-3 border-solid rounded-full animate-spin"
          style={{ borderColor: "#6b84f2", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  // Resolve which page to render: /preview → "", /preview/subjects → "subjects"
  const slug = pathname.replace(/^\/preview\/?/, "").split("/")[0] || "";
  // Onboarding is full screen, without the dashboard shell
  if (slug === "onboarding") return <OnboardingFlow preview />;
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

  // Same global timer engine as dashboard/layout.tsx, so the timer ticks in previews too
  useTimerEngine();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="flex w-full h-full">
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
          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
            {showCoachBanner && (
              <CoachBanner href={`/preview/coach?uid=${uid}`} />
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
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#0b0d14" }}>
          <div
            className="w-10 h-10 border-3 border-solid rounded-full animate-spin"
            style={{ borderColor: "#6b84f2", borderTopColor: "transparent" }}
          />
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
