"use client";

import { useState, useEffect } from "react";
import { AskForIt } from "@/components/feedback/ask-for-it";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capture } from "@/lib/analytics";
import {
  isPushSupported,
  getNotificationPermission,
  requestNotificationPermission,
  registerServiceWorker,
  showNotification,
} from "@/lib/push-notifications";

interface NotificationPrefs {
  studyReminders: boolean;
  examAlerts: boolean;
  revisionDue: boolean;
  breakReminders: boolean;
  milestones: boolean;
  dailyGoalAlerts: boolean;
  reminderMinutes: number;
}

interface NotificationSettingsProps {
  onClose?: () => void;
}

export function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() => {
    if (typeof window === "undefined") return "default";
    return isPushSupported() ? getNotificationPermission() : "unsupported";
  });
  const [isSupported] = useState(() => {
    if (typeof window === "undefined") return false;
    return isPushSupported();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [swRegistered, setSwRegistered] = useState(false);

  // Notification preferences
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => {
    const defaultPrefs: NotificationPrefs = {
      studyReminders: true,
      examAlerts: true,
      revisionDue: true,
      breakReminders: true,
      milestones: true,
      dailyGoalAlerts: true,
      reminderMinutes: 5,
    };
    if (typeof localStorage === "undefined") {
      return defaultPrefs;
    }
    const saved = localStorage.getItem("notification-prefs");
    if (saved) {
      try {
        return JSON.parse(saved) as NotificationPrefs;
      } catch {
        // ignore
      }
    }
    return defaultPrefs;
  });

  useEffect(() => {
    // Check if SW is registered
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        setSwRegistered(!!reg);
      });
    }
  }, []);

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    
    // Register service worker first
    const registration = await registerServiceWorker();
    setSwRegistered(!!registration);
    
    // Request permission
    const perm = await requestNotificationPermission();
    capture("notification_permission_result", { result: perm, source: "settings" });
    setPermission(perm);
    
    if (perm === "granted") {
      // Show a test notification
      await showNotification("Notifications enabled", {
        body: "Study and exam reminders will show while the dashboard is open in a tab.",
        tag: "setup-complete",
      });
    }
    
    setIsLoading(false);
  };

  const [testStatus, setTestStatus] = useState<string | null>(null);

  const handleTestNotification = async () => {
    setTestStatus("Sending...");
    try {
      // Direct Notification API call for maximum reliability
      if ("Notification" in window && Notification.permission === "granted") {
        const n = new Notification("Test Notification", {
          body: "This is how your study reminders will look!",
          icon: "/icon1.png",
        });
        n.onshow = () => setTestStatus("Sent. Check your notifications.");
        n.onerror = () => setTestStatus("Failed. Check your system notification settings for this browser");
        // Clear status after 3s
        setTimeout(() => setTestStatus(null), 3000);
      } else {
        setTestStatus(`Permission: ${Notification.permission}`);
        setTimeout(() => setTestStatus(null), 3000);
      }
    } catch (err) {
      setTestStatus(`Error: ${err}`);
      setTimeout(() => setTestStatus(null), 5000);
    }
  };

  const handleSavePrefs = () => {
    localStorage.setItem("notification-prefs", JSON.stringify(prefs));
    capture("notification_prefs_saved", {
      study_reminders: prefs.studyReminders,
      exam_alerts: prefs.examAlerts,
      revision_due: prefs.revisionDue,
      break_reminders: prefs.breakReminders,
      milestones: prefs.milestones,
      daily_goal_alerts: prefs.dailyGoalAlerts,
      reminder_minutes: prefs.reminderMinutes,
    });
    onClose?.();
  };

  const updatePref = <K extends keyof typeof prefs>(key: K, value: typeof prefs[K]) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  if (!isSupported) {
    return (
      <Card>
        <div className="text-center">
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-2" style={{ color: "var(--text)" }}>
            Study reminders not supported
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            This browser can&apos;t show reminders. Try Chrome, Edge or Firefox on a computer.
          </p>
          <div className="mt-3 flex justify-center">
            <AskForIt feature="phone_reminders" source="settings" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-5">
      <div>
        <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-1" style={{ color: "var(--text)" }}>
          Study reminders
        </h3>
        <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>
          Reminders for study sessions and exams show while the dashboard is open in a browser tab
        </p>
        <div className="mt-3">
          <AskForIt feature="phone_reminders" source="settings" />
        </div>
      </div>

      {/* Permission Status */}
      <div
        className="px-4 py-3.5 rounded-2xl flex items-center gap-3"
        style={{
          background:
            permission === "granted"
              ? "var(--success-soft)"
              : permission === "denied"
              ? "var(--danger-soft)"
              : "var(--paper)",
          border: "2px solid var(--outline)",
        }}
      >
        {permission === "granted" && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" style={{ color: "var(--text)" }} aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold" style={{ color: "var(--text)" }}>
            {permission === "granted"
              ? "Notifications enabled"
              : permission === "denied"
              ? "Notifications blocked"
              : "Notifications not enabled"}
          </p>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
            {permission === "granted"
              ? "Reminders show while the dashboard is open"
              : permission === "denied"
              ? "Please enable in browser settings"
              : "Enable to get study reminders"}
          </p>
        </div>
        {permission !== "granted" && permission !== "denied" && (
          <Button onClick={handleEnableNotifications} disabled={isLoading} className="shrink-0">
            {isLoading ? "Enabling..." : "Enable"}
          </Button>
        )}
        {permission === "granted" && (
          <Button variant="secondary" onClick={handleTestNotification} className="shrink-0">
            Test
          </Button>
        )}
      </div>

      {/* Test status feedback */}
      {testStatus && (
        <p className="text-[13px] font-medium" style={{ color: "var(--text-muted)" }}>{testStatus}</p>
      )}

      {/* Notification Preferences */}
      <AnimatePresence>
        {permission === "granted" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h4 className="font-display text-base font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>
              Notification types
            </h4>

            <div>
              {[
                { key: "studyReminders", label: "Study session reminders" },
                { key: "examAlerts", label: "Exam alerts" },
                { key: "revisionDue", label: "Revision due" },
                { key: "breakReminders", label: "Break reminders" },
                { key: "milestones", label: "Milestones" },
                { key: "dailyGoalAlerts", label: "Daily goal and streak alerts" },
              ].map(({ key, label }) => {
                const on = prefs[key as keyof typeof prefs] as boolean;
                return (
                  <label
                    key={key}
                    className="flex items-center gap-3 min-h-11 py-1.5 cursor-pointer border-b last:border-b-0"
                    style={{ borderColor: "var(--divider)" }}
                  >
                    <span className="flex-1 text-[15px]" style={{ color: "var(--text)" }}>
                      {label}
                    </span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={on}
                      onChange={(e) => updatePref(key as keyof typeof prefs, e.target.checked)}
                      className="sr-only peer"
                    />
                    <span
                      aria-hidden="true"
                      className="relative w-11 h-6 rounded-full shrink-0 border-2 border-[var(--outline)] transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--primary)]"
                      style={{ background: on ? "var(--primary)" : "var(--paper)" }}
                    >
                      <span
                        className="absolute top-[2px] w-4 h-4 rounded-full transition-[left] duration-150"
                        style={{
                          left: on ? 22 : 2,
                          background: "#ffffff",
                          border: "2px solid var(--outline)",
                        }}
                      />
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="pt-1">
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
                Remind me before sessions
              </label>
              <select
                value={prefs.reminderMinutes}
                onChange={(e) => updatePref("reminderMinutes", Number(e.target.value))}
                className="w-full h-11 px-4 rounded-xl text-sm outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text)",
                }}
              >
                <option value={5}>5 minutes before</option>
                <option value={10}>10 minutes before</option>
                <option value={15}>15 minutes before</option>
                <option value={30}>30 minutes before</option>
              </select>
            </div>

            <div className="pt-2 flex gap-3">
              <Button onClick={handleSavePrefs} className="flex-1">
                Save preferences
              </Button>
              {onClose && (
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Worker Status */}
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
        Service worker: {swRegistered ? "registered" : "not registered"}
      </div>
    </Card>
  );
}
