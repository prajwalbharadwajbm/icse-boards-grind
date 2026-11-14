"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useStore } from "@/store/use-store";
import { capture } from "@/lib/analytics";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { useGenerateNotifications } from "@/hooks/use-generate-notifications";
import { WhatsNewModal } from "@/components/whats-new-modal";
import { StudyProgressBar } from "@/components/layout/study-progress-bar";
import { CoachBanner } from "@/components/layout/coach-banner";
import { useMilestoneDetector } from "@/hooks/use-milestone-detector";
import { useDailyGoalDetector } from "@/hooks/use-daily-goal-detector";
import { useTimerEngine } from "@/hooks/use-timer-engine";
import { getLatestWhatsNewVersion, getUnseenUpdates } from "@/lib/whats-new";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const onboarded = useStore((s) => s.onboarded);
  const hydrated = useStore((s) => s._hydrated);
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Initialize push notifications
  usePushNotifications();

  // Generate in-app notifications on mount
  useGenerateNotifications();

  // Milestone confetti detector
  useMilestoneDetector();

  // Daily goal detector
  useDailyGoalDetector();

  // Global timer engine (persists across page navigation)
  useTimerEngine();

  // What's New modal
  const lastSeenVersion = useStore((s) => s.lastSeenWhatsNewVersion);
  const setField = useStore((s) => s.setField);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);

  const whatsNewUpdates = useMemo(() => {
    if (!hydrated || !onboarded) return [];
    return getUnseenUpdates(lastSeenVersion);
  }, [hydrated, onboarded, lastSeenVersion]);

  useEffect(() => {
    if (whatsNewUpdates.length === 0) return;
    const timer = setTimeout(() => setWhatsNewOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [whatsNewUpdates]);

  const showCoachBanner = pathname !== "/dashboard/coach" && pathname !== "/dashboard/settings";

  useEffect(() => {
    if (loading || !hydrated) return;
    if (!user) router.replace("/login");
    else if (!onboarded) router.replace("/onboarding");
  }, [user, loading, onboarded, hydrated, router]);

  if (loading || !hydrated || !user || !onboarded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="w-10 h-10 border-3 border-solid rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <StudyProgressBar />
        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
          {showCoachBanner && (
            <CoachBanner href="/dashboard/coach" onClick={() => capture("coach_banner_clicked", { page: pathname })} />
          )}
          {children}
        </main>
      </div>
      <WhatsNewModal
        open={whatsNewOpen}
        updates={whatsNewUpdates}
        onClose={() => {
          setWhatsNewOpen(false);
          setField("lastSeenWhatsNewVersion", getLatestWhatsNewVersion());
          capture("whats_new_dismissed", { updates_shown: whatsNewUpdates.length });
        }}
      />
    </div>
  );
}
