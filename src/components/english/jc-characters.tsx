"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capture } from "@/lib/analytics";
import { JC_CHARACTERS } from "@/lib/julius-caesar-data";

export function JCCharacters() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {JC_CHARACTERS.map((char) => {
        const isOpen = expandedId === char.id;
        return (
          <div
            key={char.id}
            className="rounded-[20px] p-5"
            style={{
              background: "var(--bg-card)",
              border: "2px solid var(--outline)",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4
                  className="font-display text-lg font-extrabold tracking-[-0.01em] leading-tight"
                  style={{ color: "var(--text)" }}
                >
                  {char.name}
                </h4>
                <p
                  className="text-[13px] mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {char.role}
                </p>
              </div>
            </div>

            {/* Traits */}
            <p className="text-xs font-bold mb-3" style={{ color: "var(--text-muted)" }}>
              {char.traits.join(" · ")}
            </p>

            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text)" }}
            >
              {char.significance}
            </p>

            {/* Expandable quotes */}
            <button
              onClick={() => {
                const newState = isOpen ? null : char.id;
                setExpandedId(newState);
                if (newState) {
                  capture("jc_character_quotes_expanded", {
                    character_id: char.id,
                    character_name: char.name,
                  });
                }
              }}
              aria-expanded={isOpen}
              className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
                isOpen
                  ? "bg-[var(--text)] text-[var(--bg)] font-bold"
                  : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
              }`}
              style={{ border: "2px solid var(--outline)" }}
            >
              Key quotes ({char.keyQuotes.length})
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4" style={{ borderTop: "1px solid var(--divider)" }}>
                    {char.keyQuotes.map((kq, i) => (
                      <div
                        key={i}
                        className="py-3"
                        style={{ borderTop: i > 0 ? "1px solid var(--divider)" : undefined }}
                      >
                        <p
                          className="text-[15px] font-serif italic leading-relaxed mb-1"
                          style={{ color: "var(--text)" }}
                        >
                          &ldquo;{kq.quote}&rdquo;
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {kq.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
