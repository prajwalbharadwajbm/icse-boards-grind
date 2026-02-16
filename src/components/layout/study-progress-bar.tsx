"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/use-store";
import { today } from "@/lib/utils";

export function StudyProgressBar() {
  const studyLog = useStore((s) => s.studyLog);
  const target = useStore((s) => s.studyHours) || 8;
  const td = today();
  const hoursToday = (studyLog || {})[td]?.hours || 0;
  const pct = Math.min(100, (hoursToday / target) * 100);

  const color = pct < 33 ? "#ef4444" : pct < 66 ? "#f59e0b" : "#22c55e";

  return (
    <div className="w-full" style={{ height: 3, background: "var(--border)" }}>
      <motion.div
        className="h-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
