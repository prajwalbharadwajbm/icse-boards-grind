"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capture } from "@/lib/analytics";
import { JC_SCENES } from "@/lib/julius-caesar-data";

export function JCScenes() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const acts = [3, 4, 5] as const;

  return (
    <div className="space-y-6">
      {acts.map((act) => {
        const scenes = JC_SCENES.filter((s) => s.act === act);
        return (
          <div key={act}>
            <h3
              className="font-display text-[22px] font-extrabold tracking-[-0.01em] mb-3"
              style={{ color: "var(--text)" }}
            >
              Act {act}
            </h3>
            <div className="flex flex-col gap-2.5">
              {scenes.map((scene) => {
                const isOpen = expandedId === scene.id;
                return (
                  <div
                    key={scene.id}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "var(--bg-card)",
                      border: "2px solid var(--outline)",
                    }}
                  >
                    <button
                      onClick={() => {
                        const newState = isOpen ? null : scene.id;
                        setExpandedId(newState);
                        if (newState) {
                          capture("jc_scene_expanded", {
                            scene_id: scene.id,
                            act: scene.act,
                            scene_number: scene.scene,
                            title: scene.title,
                          });
                        }
                      }}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 px-4 py-2 min-h-[52px] cursor-pointer transition-colors duration-150 hover:bg-[var(--paper)]"
                    >
                      <div className="text-left">
                        <span
                          className="text-xs font-bold mr-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Scene {scene.scene}
                        </span>
                        <span
                          className="text-[15px] font-bold"
                          style={{ color: "var(--text)" }}
                        >
                          {scene.title}
                        </span>
                      </div>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--text)"
                        strokeWidth="2.5"
                        className="shrink-0"
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
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-4 pb-4 pt-3 space-y-3"
                            style={{
                              borderTop: "1px solid var(--divider)",
                            }}
                          >
                            <p
                              className="text-sm leading-relaxed"
                              style={{ color: "var(--text)" }}
                            >
                              {scene.summary}
                            </p>
                            <div>
                              <p
                                className="text-[13px] font-medium mb-2"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                Key events
                              </p>
                              <ul className="space-y-1.5">
                                {scene.keyEvents.map((event, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2 text-sm"
                                    style={{ color: "var(--text)" }}
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                      style={{ background: "var(--text)" }}
                                    />
                                    {event}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {scene.videoUrl && (
                              <div>
                                <p
                                  className="text-[13px] font-medium mb-2"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  Video
                                </p>
                                <video
                                  controls
                                  className="w-full rounded-2xl bg-black"
                                  style={{ maxHeight: "400px", border: "2px solid var(--outline)" }}
                                  onPlay={() => {
                                    capture("jc_scene_video_played", {
                                      scene_id: scene.id,
                                      act: scene.act,
                                      scene_number: scene.scene,
                                      title: scene.title,
                                    });
                                  }}
                                >
                                  <source src={scene.videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
