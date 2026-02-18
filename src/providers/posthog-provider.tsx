"use client";

import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/providers/auth-provider";
import {
  initPostHog,
  identify,
  reset,
  getPostHogInstance,
  INTERNAL_EMAILS,
} from "@/lib/analytics";

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

      const ph = getPostHogInstance();
      if (user.email && INTERNAL_EMAILS.includes(user.email)) {
        ph.opt_out_capturing();
      } else {
        ph.opt_in_capturing();
      }
    } else {
      reset();
    }
  }, [user]);

  return <>{children}</>;
}
