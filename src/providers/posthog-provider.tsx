"use client";

import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/providers/auth-provider";
import { initPostHog, identify, reset } from "@/lib/analytics";

export function PostHogProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (user) {
      identify(user.uid, {
        email: user.email ?? undefined,
        name: user.displayName ?? undefined,
      });
    } else {
      reset();
    }
  }, [user]);

  return <>{children}</>;
}
