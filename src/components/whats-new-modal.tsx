"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { WhatsNewEntry } from "@/lib/whats-new";

interface WhatsNewModalProps {
  open: boolean;
  onClose: () => void;
  updates: WhatsNewEntry[];
}

export function WhatsNewModal({ open, onClose, updates }: WhatsNewModalProps) {
  const router = useRouter();

  const handleClick = (entry: WhatsNewEntry) => {
    if (entry.link) {
      onClose();
      router.push(entry.link);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="What's new">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-80 overflow-y-auto -mx-2"
      >
        {updates.map((entry) => (
          <div
            key={entry.version}
            className={`min-h-10 px-2 py-3 border-b last:border-b-0${entry.link ? " cursor-pointer transition-colors duration-150 hover:bg-[var(--paper)]" : ""}`}
            style={{ borderColor: "var(--divider)" }}
            onClick={() => handleClick(entry)}
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {entry.date}
                </span>
                <h4 className="font-display text-base font-extrabold tracking-[-0.01em] leading-snug mt-0.5" style={{ color: "var(--text)" }}>
                  {entry.title}
                </h4>
                <p className="text-[13px] mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {entry.description}
                </p>
              </div>
              {entry.link && (
                <svg className="w-4 h-4 mt-1 shrink-0" style={{ color: "var(--text)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </motion.div>
      <Button onClick={onClose} className="w-full mt-4">
        Got it
      </Button>
    </Modal>
  );
}
