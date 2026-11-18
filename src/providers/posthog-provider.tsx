"use client";

import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/providers/auth-provider";
import { useStore } from "@/store/use-store";
import { initPostHog, identify, reset, setAnalyticsContext } from "@/lib/analytics";

export function PostHogProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const onboarded = useStore((s) => s.onboarded);
  const language = useStore((s) => s.selectedLanguage);
  const elective = useStore((s) => s.selectedElective);
  const groupTwo = useStore((s) => s.groupTwo);
  const hydrated = useStore((s) => s._hydrated);

  useEffect(() => {
    initPostHog();
  }, []);

  // Wait for Firebase to settle: resetting while auth is still loading would give
  // every page load a fresh anonymous id.
  useEffect(() => {
    if (loading) return;
    if (user) {
      identify(
        user.uid,
        {
          email: user.email ?? undefined,
          name: user.displayName ?? undefined,
        },
        {
          signed_up_at: user.metadata.creationTime
            ? new Date(user.metadata.creationTime).toISOString()
            : undefined,
        }
      );
    } else {
      reset();
    }
  }, [user, loading]);

  useEffect(() => {
    if (!hydrated) return;
    setAnalyticsContext({ onboarded, language, elective, groupTwo });
  }, [hydrated, onboarded, language, elective, groupTwo]);

  return <>{children}</>;
}
