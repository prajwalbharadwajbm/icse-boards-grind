"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { capture } from "@/lib/analytics";

export function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      const params = searchParams.toString();
      if (params) {
        url += "?" + params;
      }
      capture("$pageview", { $current_url: url });

      // The service worker opens notification links with ?from=notification (see showNotification)
      if (searchParams.get("from") === "notification") {
        capture("notification_clicked", {
          type: searchParams.get("notification_type") || "unknown",
          via: "service_worker",
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
