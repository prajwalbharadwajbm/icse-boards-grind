"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import type { WhatsNewEntry } from "@/lib/whats-new";

interface WhatsNewModalProps {
  open: boolean;
  onClose: () => void;
  updates: WhatsNewEntry[];
}

export function WhatsNewModal({ open, onClose, updates }: WhatsNewModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="What's New">
      <div className="max-h-80 overflow-y-auto space-y-3 pr-1 -mr-1">
        {updates.map((entry, i) => (
          <motion.div
            key={entry.version}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-lg p-3"
            style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none mt-0.5">{entry.emoji}</span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {entry.title}
                  </h4>
                  <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                    {entry.date}
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {entry.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
        style={{ background: "var(--primary)" }}
      >
        Got it!
      </button>
    </Modal>
  );
}
