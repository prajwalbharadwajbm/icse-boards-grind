"use client";

import { useState, useMemo } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { JC_SCENE_LINES } from "@/lib/jc-line-by-line";

type ReviewStatus = "needs_review" | "confident";

function statusKey(act: number, scene: number, idx: number) {
  return `${act}-${scene}-${idx}`;
}

/** Sticker pill: ink when active, outlined paper otherwise */
function pillClass(active: boolean, size = "h-9") {
  return `${size} px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
    active
      ? "bg-[var(--text)] text-[var(--bg)] font-bold"
      : "bg-[var(--bg-card)] text-[var(--text)] font-medium hover:bg-[var(--paper)]"
  }`;
}

export function JCLineByLine() {
  const jcLineByLineStatus = useStore((s) => s.jcLineByLineStatus);
  const update = useStore((s) => s.update);

  const acts = [3, 4, 5] as const;
  const scenesByAct = useMemo(() => {
    const map: Record<number, typeof JC_SCENE_LINES> = {};
    for (const a of acts) {
      map[a] = JC_SCENE_LINES.filter((s) => s.act === a);
    }
    return map;
  }, []);

  const [selectedAct, setSelectedAct] = useState<number>(3);
  const [selectedSceneIdx, setSelectedSceneIdx] = useState<number>(0);

  const currentScenes = scenesByAct[selectedAct] || [];
  const currentScene = currentScenes[selectedSceneIdx] || currentScenes[0];

  const handleActChange = (act: number) => {
    setSelectedAct(act);
    setSelectedSceneIdx(0);
    const firstScene = scenesByAct[act]?.[0];
    if (firstScene) {
      capture("jc_line_by_line_scene_selected", {
        act,
        scene: firstScene.scene,
        title: firstScene.title,
      });
    }
  };

  const handleSceneChange = (idx: number) => {
    setSelectedSceneIdx(idx);
    const scene = currentScenes[idx];
    if (scene) {
      capture("jc_line_by_line_scene_selected", {
        act: scene.act,
        scene: scene.scene,
        title: scene.title,
      });
    }
  };

  const toggleStatus = (lineIdx: number, status: ReviewStatus) => {
    if (!currentScene) return;
    const key = statusKey(currentScene.act, currentScene.scene, lineIdx);
    const current = jcLineByLineStatus[key];
    const newStatus = current === status ? undefined : status;

    capture("jc_line_by_line_status_changed", {
      act: currentScene.act,
      scene: currentScene.scene,
      line_index: lineIdx,
      speaker: currentScene.lines[lineIdx].speaker,
      status: newStatus ?? "unmarked",
    });

    update((s) => {
      const next = { ...s.jcLineByLineStatus };
      if (newStatus) {
        next[key] = newStatus;
      } else {
        delete next[key];
      }
      return { jcLineByLineStatus: next };
    });
  };

  // Progress for current scene
  const sceneProgress = useMemo(() => {
    if (!currentScene) return { total: 0, reviewed: 0, confident: 0 };
    let reviewed = 0;
    let confident = 0;
    for (let i = 0; i < currentScene.lines.length; i++) {
      const key = statusKey(currentScene.act, currentScene.scene, i);
      const st = jcLineByLineStatus[key];
      if (st === "needs_review") reviewed++;
      if (st === "confident") confident++;
    }
    return { total: currentScene.lines.length, reviewed, confident };
  }, [currentScene, jcLineByLineStatus]);

  if (!currentScene) return null;

  const confidentPct = (sceneProgress.confident / sceneProgress.total) * 100;
  const reviewPct = (sceneProgress.reviewed / sceneProgress.total) * 100;

  return (
    <div className="space-y-4">
      {/* Act selector */}
      <div className="flex flex-wrap gap-2">
        {acts.map((act) => (
          <button
            key={act}
            onClick={() => handleActChange(act)}
            aria-pressed={selectedAct === act}
            className={pillClass(selectedAct === act)}
            style={{ border: "2px solid var(--outline)" }}
          >
            Act {act}
          </button>
        ))}
      </div>

      {/* Scene selector */}
      <div className="flex flex-wrap gap-2">
        {currentScenes.map((scene, idx) => (
          <button
            key={scene.scene}
            onClick={() => handleSceneChange(idx)}
            aria-pressed={selectedSceneIdx === idx}
            className={`${pillClass(selectedSceneIdx === idx, "min-h-9 py-1.5")} leading-tight text-left`}
            style={{ border: "2px solid var(--outline)" }}
          >
            Scene {scene.scene}: {scene.title}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div
        className="rounded-[20px] p-4"
        style={{
          background: "var(--bg-card)",
          border: "2px solid var(--outline)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-3">
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Progress
          </span>
          <span className="text-xs font-bold tabular-nums" style={{ color: "var(--text-muted)" }}>
            <span style={{ color: "var(--success)" }}>{sceneProgress.confident} confident</span>
            {" / "}
            <span style={{ color: "var(--danger)" }}>{sceneProgress.reviewed} needs review</span>
            {" / "}
            {sceneProgress.total - sceneProgress.confident - sceneProgress.reviewed} unmarked
          </span>
        </div>
        <div
          className="w-full h-3.5 rounded-full overflow-hidden"
          style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
        >
          <div className="h-full flex">
            <div
              className="h-full transition-[width]"
              style={{
                width: `${confidentPct}%`,
                background: "var(--mint)",
                boxShadow: confidentPct > 0 && confidentPct < 100 ? "inset -2px 0 0 var(--outline)" : undefined,
              }}
            />
            <div
              className="h-full transition-[width]"
              style={{
                width: `${reviewPct}%`,
                background: "var(--tomato)",
                boxShadow: reviewPct > 0 && confidentPct + reviewPct < 100 ? "inset -2px 0 0 var(--outline)" : undefined,
              }}
            />
          </div>
        </div>
      </div>

      {/* Opening stage direction */}
      {currentScene.openingDirection && (
        <div
          className="rounded-2xl px-4 py-3 text-sm"
          style={{
            background: "var(--paper)",
            border: "2px solid var(--outline)",
            color: "var(--text-secondary)",
            fontStyle: "italic",
          }}
        >
          {currentScene.openingDirection}
        </div>
      )}

      {/* Dialogue cards */}
      <div className="flex flex-col gap-3">
        {currentScene.lines.map((line, idx) => {
          const key = statusKey(currentScene.act, currentScene.scene, idx);
          const status = jcLineByLineStatus[key];

          return (
            <div
              key={idx}
              className="rounded-[20px] overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "2px solid var(--outline)",
              }}
            >
              {/* Speaker + stage direction */}
              <div className="px-4 pt-3 pb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {line.speaker}
                </span>
                {line.stageDirection && (
                  <span
                    className="text-xs italic"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    [{line.stageDirection}]
                  </span>
                )}
                {status && (
                  <span
                    className="ml-auto text-xs font-bold"
                    style={{
                      color: status === "needs_review" ? "var(--danger)" : "var(--success)",
                    }}
                  >
                    {status === "needs_review" ? "Needs review" : "Confident"}
                  </span>
                )}
              </div>

              {/* Original text */}
              <div className="px-4 pb-3">
                <p
                  className="text-base font-serif italic leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text)" }}
                >
                  {line.original}
                </p>
              </div>

              {/* Divider */}
              <div className="mx-4" style={{ borderTop: "1px solid var(--divider)" }} />

              {/* Modern translation */}
              <div className="px-4 pt-3 pb-3">
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Modern English
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {line.modern}
                </p>
              </div>

              {/* Status buttons */}
              <div
                className="px-4 py-3 flex flex-wrap gap-2"
                style={{ borderTop: "1px solid var(--divider)" }}
              >
                <button
                  onClick={() => toggleStatus(idx, "needs_review")}
                  aria-pressed={status === "needs_review"}
                  className={`h-9 px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
                    status === "needs_review" ? "font-bold" : "font-medium bg-[var(--bg-card)] hover:bg-[var(--paper)]"
                  }`}
                  style={{
                    background: status === "needs_review" ? "var(--danger-soft)" : undefined,
                    color: "var(--text)",
                    border: "2px solid var(--outline)",
                  }}
                >
                  Needs review
                </button>
                <button
                  onClick={() => toggleStatus(idx, "confident")}
                  aria-pressed={status === "confident"}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm transition-colors duration-150 cursor-pointer ${
                    status === "confident" ? "font-bold" : "font-medium bg-[var(--bg-card)] hover:bg-[var(--paper)]"
                  }`}
                  style={{
                    background: status === "confident" ? "var(--success-soft)" : undefined,
                    color: "var(--text)",
                    border: "2px solid var(--outline)",
                  }}
                >
                  {status === "confident" && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  Confident
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
