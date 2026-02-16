"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getDbInstance } from "@/lib/firebase";
import { getExams, getSubjectLabels, getSubjectColors } from "@/lib/constants";
import { today, daysBetween, formatDate } from "@/lib/utils";
import type { StoreState } from "@/store/use-store";

function ReportContent() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [data, setData] = useState<Partial<StoreState> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      setError("No student ID provided.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const snap = await getDoc(doc(getDbInstance(), "users", uid));
        if (!snap.exists()) {
          setError("Report not found.");
          return;
        }
        const d = snap.data() as Partial<StoreState>;
        if (!d.shareReportEnabled) {
          setError("This report is not shared.");
          return;
        }
        setData(d);
      } catch {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">{error}</p>
          <p className="text-sm text-gray-500 mt-2">The student may have disabled sharing.</p>
        </div>
      </div>
    );
  }

  if (!data || !stats) return null;

  const upcomingExams = exams.filter((e) => e.date >= td).slice(0, 6);
  const overallPct = stats.totalChapters > 0 ? Math.round((stats.chapsDone / stats.totalChapters) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{data.name || "Student"}</h1>
          <p className="text-sm text-gray-500 mt-1">ICSE 2026 Progress Report</p>
        </div>

        {/* Overall Progress Ring */}
        <div className="flex justify-center mb-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50" fill="none" stroke="#7b61ff" strokeWidth="10"
                strokeDasharray={`${overallPct * 3.14} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{overallPct}%</span>
              <span className="text-xs text-gray-500">{stats.chapsDone}/{stats.totalChapters}</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.weekHours.toFixed(1)}h</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours.toFixed(1)}h</p>
            <p className="text-xs text-gray-500">Total Hours</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{stats.streak}</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Subject Progress</h3>
          <div className="space-y-3">
            {stats.subjectProgress.map((sp) => {
              const pct = sp.total > 0 ? Math.round((sp.done / sp.total) * 100) : 0;
              return (
                <div key={sp.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{subjectLabels[sp.key] || sp.key}</span>
                    <span className="text-xs text-gray-500">{sp.done}/{sp.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: subjectColors[sp.key] || "#7b61ff" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Exams */}
        {upcomingExams.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Exam Schedule</h3>
            <div className="space-y-2">
              {upcomingExams.map((exam) => (
                <div key={exam.key} className="flex justify-between items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: subjectColors[exam.key] || "#7b61ff" }} />
                    <span className="text-sm text-gray-700">{exam.subject}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{formatDate(exam.date)}</span>
                    <span className="text-xs text-gray-400 ml-2">{daysBetween(td, exam.date)}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mb-4">
          Generated on {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </div>

        {/* Print button */}
        <div className="text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "#7b61ff" }}
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ParentReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  );
}
