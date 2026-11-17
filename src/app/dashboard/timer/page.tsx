"use client";

import { useState, useMemo, useEffect } from "react";
import { capture } from "@/lib/analytics";
import { motion } from "framer-motion";
import { useStore } from "@/store/use-store";
import Link from "next/link";
import { getSubjectLabels } from "@/lib/constants";
import { chapterOptions } from "@/lib/timer-options";
import { today } from "@/lib/utils";
import { getDayPlan } from "@/lib/algorithms";
import { Select } from "@/components/ui/select";
import { TimerDisplay } from "@/components/timer/timer-display";
import { TimerStats } from "@/components/timer/timer-stats";
import { AmbientPlayer } from "@/components/timer/ambient-player";

export default function TimerPage() {
  const data = useStore();
  const td = today();

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  useEffect(() => {
    capture("timer_page_viewed");
  }, []);

  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(data.selectedLanguage || "kannada", data.selectedElective || "computer"), [data.selectedLanguage, data.selectedElective]);

  // Build subject options
  const subjectOptions = useMemo(() => {
    const opts = [{ value: "", label: "Select subject" }];
    Object.keys(SUBJECT_LABELS).forEach((key) => {
      opts.push({ value: key, label: SUBJECT_LABELS[key] });
    });
    return opts;
  }, [SUBJECT_LABELS]);

  // Build chapter options based on selected subject
  const { options: chapterSelectOptions, noChapters } = useMemo(
    () => chapterOptions(selectedSubject, data.subjects || {}),
    [selectedSubject, data.subjects]
  );

  // Auto-suggest current study block from day plan
  useEffect(() => {
    if (selectedSubject) return; // Don't override manual selection

    // A link can preset the subject and chapter: /dashboard/timer?subject=physics&chapter=Light
    const params = new URLSearchParams(window.location.search);
    const linkedSubject = params.get("subject");
    if (linkedSubject && SUBJECT_LABELS[linkedSubject]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init from the link
      setSelectedSubject(linkedSubject);
      const linkedChapter = params.get("chapter");
      if (linkedChapter && (data.subjects[linkedSubject] || []).some((c) => c.name === linkedChapter)) {
        setSelectedChapter(linkedChapter);
      }
      return;
    }

    const plan = getDayPlan(td, data);
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    const currentBlock = plan.find((b) => {
      if (b.type !== "study" || !b.subjectKey) return false;
      const [sh, sm] = b.start.split(":").map(Number);
      const [eh, em] = b.end.split(":").map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      return nowMin >= startMin && nowMin < endMin;
    });

    if (currentBlock?.subjectKey) {
      setSelectedSubject(currentBlock.subjectKey);
      // Try to pick the first incomplete chapter for this subject
      const chapters = data.subjects[currentBlock.subjectKey] || [];
      const incomplete = chapters.find((c) => c.status !== "completed");
      if (incomplete) {
        setSelectedChapter(incomplete.name);
      }
    }
  }, [td]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset chapter when subject changes
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedChapter("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-6"
      >
      <div className="flex flex-col gap-2">
        <h1
          className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]"
          style={{ color: "var(--text)" }}
        >
          Study timer
        </h1>
        <p
          className="text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Pick a chapter and start the clock
        </p>
      </div>

      {/* Subject / Chapter selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Subject"
          options={subjectOptions}
          value={selectedSubject}
          onChange={(e) => handleSubjectChange(e.target.value)}
        />
        <div>
          <Select
            label="Chapter"
            options={chapterSelectOptions}
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={!selectedSubject || noChapters}
          />
          {noChapters && (
            <p className="mt-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
              You can still start the timer.{" "}
              <Link
                href="/dashboard/subjects"
                onClick={() => capture("timer_add_chapters_clicked", { subject: selectedSubject })}
                className="font-bold underline underline-offset-4 decoration-2"
                style={{ color: "var(--text)" }}
              >
                Add your own chapters
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column: Timer + Ambient (wider) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <TimerDisplay
            subject={selectedSubject}
            chapter={selectedChapter}
          />
          <AmbientPlayer />
        </div>

        {/* Right column: Stats */}
        <div className="lg:col-span-2">
          <TimerStats />
        </div>
      </div>
      </motion.div>
    </div>
  );
}
