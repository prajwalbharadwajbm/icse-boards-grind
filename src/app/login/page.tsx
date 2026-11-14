"use client";

import { useState, useEffect, useMemo } from "react";
import { capture } from "@/lib/analytics";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/use-store";
import { motion } from "framer-motion";
import { friendlyAuthError, today, daysBetween } from "@/lib/utils";
import { FirebaseError } from "firebase/app";
import { CORE_EXAMS, ELECTIVES, EXAM_YEAR, SECOND_LANGUAGES, examStart, getSubjectColors } from "@/lib/constants";
import { HallTicket } from "@/components/exam/hall-ticket";
import { TimetableCard } from "@/components/exam/timetable-card";
import { StickerMark, Wordmark } from "@/components/brand/sticker";

function shortDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long" });
}

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const onboarded = useStore((s) => s.onboarded);
  const router = useRouter();

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // null until mounted: the live preview renders in the browser only, so server HTML never disagrees
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      router.replace(onboarded ? "/dashboard" : "/onboarding");
    }
  }, [user, onboarded, router]);

  useEffect(() => {
    capture("login_page_viewed");
  }, []);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = requestAnimationFrame(tick);
    const id = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(first);
      clearInterval(id);
    };
  }, []);

  // Season bounds across every paper, and the live countdown to the first one
  const allDates = useMemo(
    () => [...CORE_EXAMS, ...SECOND_LANGUAGES, ...ELECTIVES].map((e) => e.date).sort(),
    []
  );
  const seasonStart = allDates[0];
  const seasonEnd = allDates[allDates.length - 1];
  const td = today();
  const coreColors = useMemo(() => getSubjectColors("", ""), []);
  const firstPaper = CORE_EXAMS[0];
  const nextIndex = CORE_EXAMS.findIndex((e) => e.date >= td);
  const countdown = useMemo(() => {
    if (!now) return null;
    const diff = Math.max(0, examStart(firstPaper.date).getTime() - now.getTime());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [firstPaper.date, now]);

  if (user) {
    return null;
  }

  const signIn = async () => {
    setError("");
    setSubmitting(true);
    capture("login_started", { method: "google" });
    try {
      await loginWithGoogle();
      capture("user_logged_in", { method: "google" });
    } catch (err) {
      capture("login_failed", { method: "google", error: (err as FirebaseError).code });
      setError(friendlyAuthError((err as FirebaseError).code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]" style={{ background: "var(--bg)" }}>
      {/* Left: what it is, and the one action */}
      <section className="flex flex-col px-6 sm:px-12 lg:px-16 py-8 lg:py-10 lg:min-h-screen">
        <div className="flex items-center gap-3">
          <StickerMark size={40} />
          <Wordmark size={22} underline />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col justify-center py-14 lg:py-0 max-w-[36rem]"
        >
          <h1
            className="font-display font-extrabold text-[44px] sm:text-[60px] lg:text-[72px] leading-[0.98] tracking-[-0.04em]"
            style={{ color: "var(--text)" }}
          >
            Plan your ICSE {EXAM_YEAR} boards, paper by paper
          </h1>
          <p className="text-[18px] leading-[1.6] mt-6" style={{ color: "var(--text-secondary)" }}>
            The CISCE timetable from {shortDate(seasonStart)} to {shortDate(seasonEnd)}, a countdown to each of your papers,
            a daily study plan built around your routine, and a progress report you can send home
          </p>

          {error && (
            <p role="alert" className="mt-6 text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={signIn}
              disabled={submitting}
              className="h-12 px-6 inline-flex items-center justify-center gap-3 rounded-full text-[15px] font-bold transition-[background-color,transform,box-shadow] duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60 hover:bg-[var(--paper)]"
              style={{ background: "var(--bg-card)", color: "var(--text)", border: "2px solid var(--outline)", boxShadow: "3px 3px 0 var(--outline)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {submitting ? "Signing in" : "Continue with Google"}
            </button>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              Free. Your progress syncs across devices
            </p>
          </div>
        </motion.div>

        <p className="text-xs hidden lg:block" style={{ color: "var(--text-muted)" }}>
          Dates from the CISCE ICSE Year {EXAM_YEAR} timetable. Check cisce.org for any changes
        </p>
      </section>

      {/* Right: the product itself, with live data */}
      <section
        aria-label="Preview of the study dashboard"
        className="relative overflow-hidden px-6 sm:px-12 lg:px-10 pb-12 lg:py-10 lg:h-screen lg:sticky lg:top-0"
        style={{ background: "var(--paper)", borderLeft: "2px solid var(--outline)" }}
      >
        <div
          className="flex flex-col gap-8 max-w-[640px] mx-auto pt-8 lg:pt-10"
          style={{ maskImage: "linear-gradient(to bottom, black 78%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent)" }}
        >
          {countdown ? (
            <>
            <HallTicket
              exam={firstPaper}
              index={0}
              total={CORE_EXAMS.length + 2}
              examDays={daysBetween(td, firstPaper.date)}
              countdown={countdown}
            />
            <div className="hidden sm:block">
              <TimetableCard
                exams={CORE_EXAMS}
                nextIndex={nextIndex}
                td={td}
                subjectColors={coreColors}
                title={`ICSE ${EXAM_YEAR} core papers`}
                footer={
                  <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                    Your second language and elective are added when you sign in
                  </p>
                }
              />
            </div>
            </>
          ) : (
            <div className="h-[300px] rounded-[28px]" style={{ border: "2px solid var(--outline)", background: "var(--bg-card)" }} aria-hidden="true" />
          )}
        </div>
      </section>
    </div>
  );
}
