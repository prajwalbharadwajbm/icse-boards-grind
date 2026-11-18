"use client";

import { useMemo, useEffect } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { getSubjectLabels } from "@/lib/constants";
import { SubjectCard } from "@/components/subjects/subject-card";

export default function SubjectsPage() {
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const groupTwo = useStore((s) => s.groupTwo);
  const subjectLabels = useMemo(() => getSubjectLabels(lang, elective, groupTwo), [lang, elective, groupTwo]);
  const subjectKeys = Object.keys(subjectLabels);

  useEffect(() => {
    capture("subjects_page_viewed");
  }, []);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-3">
      <header className="flex flex-col gap-2 pb-3">
        <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>
          Subjects
        </h2>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          Track your chapters and revision status across all subjects.
        </p>
      </header>

      {subjectKeys.map((key) => (
        <SubjectCard key={key} subjectKey={key} />
      ))}
    </div>
  );
}
