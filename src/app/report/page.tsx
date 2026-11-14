"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getExams, getSubjectLabels, getSubjectColors, EXAM_YEAR } from "@/lib/constants";
import { today, daysBetween, formatDate } from "@/lib/utils";
import type { StoreState } from "@/store/use-store";
import { capture } from "@/lib/analytics";
import { StickerMark } from "@/components/brand/sticker";
import { StickerAvatar } from "@/components/brand/avatars";

/*
  The public report parents open. Light-only and printable, so it uses the literal
  Sticker light values instead of theme tokens.
*/
const INK = "#000";
const INK_2 = "#3d3d3d";
const MUTED = "#6b6b6b";
const PAPER = "#ffffff";
const COBALT = "#2f5bff";
const SUN = "#ffd43b";
const MINT = "#45d69b";
const DIVIDER = "rgba(0, 0, 0, 0.12)";
const OUTLINE = `2px solid ${INK}`;

function ReportContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [data, setData] = useState<Partial<StoreState> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      capture("parent_report_opened", { status: "missing_uid" });
      setError("No student ID provided.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        // Served by /api/report, which returns only the report fields and only while sharing is on
        const res = await fetch(`/api/report/${encodeURIComponent(uid)}`, { cache: "no-store" });
        if (res.status === 404) {
          capture("parent_report_opened", { status: "not_found" });
          setError("Report not found.");
          return;
        }
        if (res.status === 403) {
          capture("parent_report_opened", { status: "not_shared" });
          setError("This report is not shared.");
          return;
        }
        if (!res.ok) throw new Error(`Report request failed: ${res.status}`);
        const { report } = (await res.json()) as { report: Partial<StoreState> };
        capture("parent_report_opened", { status: "ok" });
        setData(report);
      } catch {
        capture("parent_report_opened", { status: "error" });
        setError("Failed to load report.");
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  const td = today();

  const lang = data?.selectedLanguage || "kannada";
  const elective = data?.selectedElective || "computer";
  const exams = useMemo(() => data ? getExams(lang, elective) : [], [data, lang, elective]);
  const subjectLabels = useMemo(() => data ? getSubjectLabels(lang, elective) : {}, [data, lang, elective]);
  const subjectColors = useMemo(() => data ? getSubjectColors(lang, elective) : {}, [data, lang, elective]);

  const stats = useMemo(() => {
    if (!data) return null;

    let totalHours = 0;
    let weekHours = 0;
    const getMonday = (d: Date) => {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.getFullYear(), d.getMonth(), diff);
    };
    const thisMonday = getMonday(new Date());

    Object.entries(data.studyLog || {}).forEach(([dateKey, log]) => {
      totalHours += log.hours;
      const d = new Date(dateKey + "T00:00:00");
      if (d >= thisMonday) weekHours += log.hours;
    });

    let chapsDone = 0, totalChapters = 0;
    const subjectProgress: { key: string; done: number; total: number }[] = [];
    Object.entries(data.subjects || {}).forEach(([key, chapters]) => {
      const done = chapters.filter((c) => c.status === "completed").length;
      chapsDone += done;
      totalChapters += chapters.length;
      if (chapters.length > 0) {
        subjectProgress.push({ key, done, total: chapters.length });
      }
    });

    return { totalHours, weekHours, chapsDone, totalChapters, subjectProgress, streak: data.streak || 0 };
  }, [data]);

  const spinner = (
    <div
      className="w-8 h-8 rounded-full animate-spin"
      style={{ border: `3px solid ${DIVIDER}`, borderTopColor: COBALT }}
    />
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
        {spinner}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: PAPER }}>
        <div className="text-center flex flex-col items-center">
          <StickerMark size={44} />
          <p className="font-display text-xl font-extrabold tracking-[-0.01em] mt-4" style={{ color: INK }}>{error}</p>
          <p className="text-sm mt-1.5" style={{ color: MUTED }}>The student may have disabled sharing.</p>
        </div>
      </div>
    );
  }

  if (!data || !stats) return null;

  const upcomingExams = exams.filter((e) => e.date >= td).slice(0, 6);
  const overallPct = stats.totalChapters > 0 ? Math.round((stats.chapsDone / stats.totalChapters) * 100) : 0;
  const card = { background: PAPER, border: OUTLINE } as const;
  const ringC = 2 * Math.PI * 50;

  return (
    <div
      className="min-h-screen print:!bg-white"
      style={{ background: PAPER, color: INK, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5 pb-5 mb-7" style={{ borderBottom: OUTLINE }}>
          <StickerMark size={34} />
          <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] leading-none whitespace-nowrap" style={{ color: INK }}>
            Boards Grind
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-7">
          <div className="flex justify-center mb-3">
            <StickerAvatar avatar={(data as { avatar?: string }).avatar} seed={data.name} size={72} tilt={-6} />
          </div>
          <h1 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>{data.name || "Student"}</h1>
          <p className="text-base mt-2" style={{ color: INK_2 }}>ICSE {EXAM_YEAR} progress report</p>
        </div>

        {/* Overall progress ring */}
        <div className="flex justify-center mb-7">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full" viewBox="0 0 120 120" aria-hidden="true">
              {/* An outlined track: ink ring with a paper centre line */}
              <circle cx="60" cy="60" r="50" fill="none" stroke={INK} strokeWidth="16" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={PAPER} strokeWidth="12" />
              <circle
                cx="60" cy="60" r="50" fill="none" stroke={COBALT} strokeWidth="12"
                strokeDasharray={`${(overallPct / 100) * ringC} ${ringC}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-[30px] font-extrabold leading-none tabular-nums" style={{ color: INK }}>{overallPct}%</span>
              <span className="text-xs font-medium tabular-nums mt-1" style={{ color: MUTED }}>{stats.chapsDone}/{stats.totalChapters}</span>
            </div>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-7">
          {[
            { v: `${stats.weekHours.toFixed(1)}h`, l: "This week" },
            { v: `${stats.totalHours.toFixed(1)}h`, l: "Total hours" },
            { v: `${stats.streak}`, l: "Day streak" },
          ].map((t) => (
            <div key={t.l} className="text-center px-2 py-4 rounded-[20px]" style={card}>
              <p className="font-display text-2xl sm:text-[28px] font-extrabold leading-none tracking-[-0.02em] tabular-nums" style={{ color: INK }}>{t.v}</p>
              <p className="text-[13px] font-medium mt-1.5" style={{ color: MUTED }}>{t.l}</p>
            </div>
          ))}
        </div>

        {/* Subject progress */}
        <div className="rounded-[20px] p-5 mb-7 break-inside-avoid" style={card}>
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-4" style={{ color: INK }}>Subject progress</h3>
          <div className="space-y-3.5">
            {stats.subjectProgress.map((sp) => {
              const pct = sp.total > 0 ? Math.round((sp.done / sp.total) * 100) : 0;
              return (
                <div key={sp.key}>
                  <div className="flex justify-between items-center gap-3 mb-1.5">
                    <span className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[sp.key] || COBALT }} />
                      <span className="text-sm font-medium truncate" style={{ color: INK }}>{subjectLabels[sp.key] || sp.key}</span>
                    </span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: MUTED }}>{sp.done}/{sp.total}</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: PAPER, border: OUTLINE }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${pct}%`,
                        background: MINT,
                        boxShadow: pct > 0 && pct < 100 ? `inset -2px 0 0 ${INK}` : undefined,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming exams */}
        {upcomingExams.length > 0 && (
          <div className="rounded-[20px] p-5 mb-7 break-inside-avoid" style={card}>
            <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-2" style={{ color: INK }}>Exam schedule</h3>
            <div>
              {upcomingExams.map((exam, i) => (
                <div
                  key={exam.key}
                  className="flex justify-between items-center gap-3 min-h-11 py-1.5 border-b last:border-b-0"
                  style={{ borderColor: DIVIDER }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[exam.key] || COBALT }} />
                    <span className={`text-sm truncate ${i === 0 ? "font-bold" : ""}`} style={{ color: INK }}>{exam.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 tabular-nums">
                    <span className="text-sm" style={{ color: INK_2 }}>{formatDate(exam.date)}</span>
                    <span
                      className={`text-xs font-bold ${i === 0 ? "px-2 py-0.5 rounded-full" : "w-9 text-right"}`}
                      style={i === 0 ? { background: SUN, color: "#000", border: OUTLINE } : { color: MUTED }}
                    >
                      {daysBetween(td, exam.date)}d
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs mb-4" style={{ color: MUTED }}>
          Generated on {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>

        {/* Print button */}
        <div className="text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center h-10 px-4 rounded-full text-sm font-bold cursor-pointer border-2 border-[#000] bg-[#2f5bff] text-white shadow-[2px_2px_0_#000] transition-[background-color,transform,box-shadow] duration-150 hover:bg-[#1f48e6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Print or save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ParentReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{ border: `3px solid ${DIVIDER}`, borderTopColor: COBALT }}
        />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
