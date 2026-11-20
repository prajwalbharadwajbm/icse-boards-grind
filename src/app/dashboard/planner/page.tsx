"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { getSubjectLabels, getSubjectColors, type Block } from "@/lib/constants";
import { today, dateStr, formatDate, formatTime24, timeToMin, minToTime } from "@/lib/utils";
import { getDayPlan, analyzeStudyBalance, preboardFocus, type PreboardFocus, type PreboardPaper } from "@/lib/algorithms";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DayPlan } from "@/components/planner/day-plan";

/** What preboard mode is doing on this day, e.g. "Preboards: focusing on Mathematics, your next paper (Thu, 10 Dec)." */
function preboardNote(focus: PreboardFocus, labels: Record<string, string>): string {
  const name = (p: PreboardPaper) => labels[p.key] || p.key;
  const next = focus.next ? `${name(focus.next)} (${formatDate(focus.next.date)})` : null;
  if (focus.today.length > 0) {
    const today = focus.today.map(name).join(" and ");
    return next ? `Preboard today: ${today}. After it, the plan moves to ${next}.` : `Preboard today: ${today}. After it, the plan goes back to your boards.`;
  }
  return next ? `Preboards: focusing on ${next}, your next paper.` : "";
}

export default function PlannerPage() {
  const data = useStore();
  const td = today();
  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(data.selectedLanguage || "kannada", data.selectedElective || "computer", data.groupTwo), [data.selectedLanguage, data.selectedElective, data.groupTwo]);
  const SUBJECT_COLORS = useMemo(() => getSubjectColors(data.selectedLanguage || "kannada", data.selectedElective || "computer", data.groupTwo), [data.selectedLanguage, data.selectedElective, data.groupTwo]);

  const [planDateObj, setPlanDateObj] = useState(new Date());
  const planDate = dateStr(planDateObj);
  const isPlanToday = planDate === td;

  const [now, setNow] = useState(new Date());
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Auto-refresh every minute
  useEffect(() => {
    capture("planner_page_viewed");
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Get plan blocks
  const blocks = useMemo(() => getDayPlan(planDate, data), [planDate, data]);
  const hasCustomPlan = !!(data.customPlans || {})[planDate];

  // Balance warnings
  const warnings = useMemo(() => analyzeStudyBalance(blocks, data, planDate), [blocks, data, planDate]);
  const preboard = useMemo(() => preboardFocus(planDate, data), [planDate, data]);

  // Study time total
  const totalStudyMin = useMemo(() => {
    return blocks.reduce((sum, b) => {
      if (b.type === "study") {
        return sum + (timeToMin(b.end) - timeToMin(b.start));
      }
      return sum;
    }, 0);
  }, [blocks]);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editType, setEditType] = useState<Block["type"]>("study");
  const [editSubject, setEditSubject] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [editStart, setEditStart] = useState("08:00");
  const [editEnd, setEditEnd] = useState("09:00");

  // Navigation
  const goToPrev = () => {
    const d = new Date(planDateObj);
    d.setDate(d.getDate() - 1);
    setPlanDateObj(d);
  };

  const goToNext = () => {
    const d = new Date(planDateObj);
    d.setDate(d.getDate() + 1);
    setPlanDateObj(d);
  };

  const goToToday = () => {
    setPlanDateObj(new Date());
  };

  // Open edit modal
  const handleBlockClick = useCallback((block: Block, index: number) => {
    capture("planner_block_clicked", { block_type: block.type });
    setEditIndex(index);
    setEditType(block.type);
    setEditSubject(block.subjectKey || "");
    setEditLabel(block.label);
    setEditStart(block.start);
    setEditEnd(block.end);
    setEditModalOpen(true);
  }, []);

  // Add new block
  const handleAddBlock = () => {
    capture("planner_add_block_clicked");
    setEditIndex(null);
    setEditType("study");
    setEditSubject(Object.keys(SUBJECT_LABELS)[0]);
    setEditLabel("");
    setEditStart("08:00");
    setEditEnd("09:00");
    setEditModalOpen(true);
  };

  // Save block
  const handleSave = () => {
    const newBlock: Block = {
      start: editStart,
      end: editEnd,
      label: editLabel || (editType === "study" && editSubject ? SUBJECT_LABELS[editSubject] : editType.charAt(0).toUpperCase() + editType.slice(1)),
      type: editType,
      ...(editType === "study" && editSubject ? { subjectKey: editSubject } : {}),
    };

    const isEdit = editIndex !== null;
    const newBlocks = [...blocks];
    if (isEdit) {
      newBlocks[editIndex] = newBlock;
    } else {
      newBlocks.push(newBlock);
    }

    // Sort by start time
    newBlocks.sort((a, b) => timeToMin(a.start) - timeToMin(b.start));

    // Save custom plan
    useStore.getState().update((s) => {
      if (!s.customPlans) s.customPlans = {};
      s.customPlans[planDate] = newBlocks;
      return { customPlans: s.customPlans };
    });

    capture(isEdit ? "planner_block_edited" : "planner_block_added", {
      block_type: editType,
      duration_minutes: timeToMin(editEnd) - timeToMin(editStart),
    });

    setEditModalOpen(false);
  };

  // Delete block
  const handleDelete = () => {
    if (editIndex === null) return;

    const deletedBlock = blocks[editIndex];
    const newBlocks = blocks.filter((_, i) => i !== editIndex);

    useStore.getState().update((s) => {
      if (!s.customPlans) s.customPlans = {};
      s.customPlans[planDate] = newBlocks;
      return { customPlans: s.customPlans };
    });

    capture("planner_block_deleted", { block_type: deletedBlock.type });

    setEditModalOpen(false);
  };

  // Reset plan
  const handleResetPlan = () => {
    capture("planner_plan_reset", { date: planDate });
    useStore.getState().update((s) => {
      if (s.customPlans) {
        delete s.customPlans[planDate];
      }
      return { customPlans: s.customPlans || {} };
    });
  };

  const subjectOptions = [
    { value: "", label: "Select a subject" },
    ...Object.entries(SUBJECT_LABELS).map(([key, label]) => ({ value: key, label })),
  ];

  const typeOptions = [
    { value: "study", label: "Study" },
    { value: "meal", label: "Meal" },
    { value: "break", label: "Break" },
    { value: "sleep", label: "Sleep" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Date Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrev}
            aria-label="Previous day"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 bg-[var(--bg-card)] hover:bg-[var(--paper)]"
            style={{ border: "2px solid var(--outline)", color: "var(--text)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="text-center min-w-[150px]">
            <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] whitespace-nowrap" style={{ color: "var(--text)" }}>
              {formatDate(planDate)}
            </h2>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--text-muted)" }}>
              {isPlanToday ? "Today" : planDate}
            </p>
          </div>
          <button
            onClick={goToNext}
            aria-label="Next day"
            className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 bg-[var(--bg-card)] hover:bg-[var(--paper)]"
            style={{ border: "2px solid var(--outline)", color: "var(--text)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {!isPlanToday && (
            <Button variant="secondary" size="md" onClick={goToToday}>
              Today
            </Button>
          )}
          <Button variant="primary" size="md" onClick={handleAddBlock}>
            Add block
          </Button>
          {hasCustomPlan && (
            <Button variant="ghost" size="md" onClick={handleResetPlan}>
              Reset plan
            </Button>
          )}
        </div>
      </motion.div>

      {/* Study Summary */}
      <Card className="!py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }} aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
              Total study time
            </span>
          </div>
          <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.01em] tabular-nums" style={{ color: "var(--text)" }}>
            {Math.floor(totalStudyMin / 60)}h {totalStudyMin % 60}m
          </span>
        </div>
        {preboard && !hasCustomPlan && (
          <p className="mt-2 text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
            {preboardNote(preboard, SUBJECT_LABELS)}{" "}
            <Link href="/dashboard/settings#preboards" className="underline underline-offset-2" style={{ color: "var(--text)" }}>
              Change dates
            </Link>
          </p>
        )}
        {hasCustomPlan && (
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "var(--warning)" }}
            />
            <span className="text-xs font-bold" style={{ color: "var(--warning)" }}>
              Custom plan active
            </span>
          </div>
        )}
      </Card>

      {/* Balance Warnings */}
      {warnings && warnings.length > 0 && (
        <div
          className="rounded-[20px] p-5"
          style={{
            background: "var(--warning-soft)",
            border: "2px solid var(--outline)",
          }}
        >
          <div className="flex items-start gap-2.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="space-y-1">
              {warnings.map((w, i) => (
                <p key={i} className="text-sm" style={{ color: "var(--text)" }}>
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <DayPlan
        blocks={blocks}
        nowMin={nowMin}
        isPlanToday={isPlanToday}
        onBlockClick={handleBlockClick}
      />

      {/* Edit Block Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)} title={editIndex !== null ? "Edit block" : "Add block"}>
        <div className="space-y-4">
          <Select
            label="Block type"
            options={typeOptions}
            value={editType}
            onChange={(e) => setEditType(e.target.value as Block["type"])}
          />

          {editType === "study" && (
            <Select
              label="Subject"
              options={subjectOptions}
              value={editSubject}
              onChange={(e) => {
                setEditSubject(e.target.value);
                if (e.target.value && !editLabel) {
                  setEditLabel(SUBJECT_LABELS[e.target.value] || "");
                }
              }}
            />
          )}

          <Input
            label="Label"
            value={editLabel}
            onChange={(e) => setEditLabel(e.target.value)}
            placeholder="Block label"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start time"
              type="time"
              value={editStart}
              onChange={(e) => setEditStart(e.target.value)}
            />
            <Input
              label="End time"
              type="time"
              value={editEnd}
              onChange={(e) => setEditEnd(e.target.value)}
            />
          </div>

          {editStart && editEnd && timeToMin(editEnd) > timeToMin(editStart) && (
            <p className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
              Duration: {timeToMin(editEnd) - timeToMin(editStart)} minutes
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <div>
              {editIndex !== null && (
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  Delete block
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!editStart || !editEnd || timeToMin(editEnd) <= timeToMin(editStart)}
              >
                Save block
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
