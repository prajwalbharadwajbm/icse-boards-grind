"use client";

import { useState, useMemo } from "react";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { JC_SCENE_LINES } from "@/lib/jc-line-by-line";

type ReviewStatus = "needs_review" | "confident";

function statusKey(act: number, scene: number, idx: number) {
  return `${act}-${scene}-${idx}`;
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

  return (
    <div className="space-y-4">
      {/* Act selector */}
      <div className="flex gap-2">
        {acts.map((act) => (
          <button
            key={act}
            onClick={() => handleActChange(act)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
            style={{
              background:
                selectedAct === act
                  ? "rgba(123,97,255,0.15)"
                  : "var(--bg-card)",
              color: selectedAct === act ? "#7b61ff" : "var(--text-secondary)",
              border: `1px solid ${
                selectedAct === act
                  ? "rgba(123,97,255,0.3)"
                  : "var(--border)"
              }`,
            }}
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
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
            style={{
              background:
                selectedSceneIdx === idx
                  ? "var(--primary)"
                  : "var(--bg-card)",
              color:
                selectedSceneIdx === idx ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${
                selectedSceneIdx === idx ? "transparent" : "var(--border)"
              }`,
            }}
          >
            Scene {scene.scene}: {scene.title}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="rounded-xl p-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            Progress
          </span>
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "#34a853" }}>{sceneProgress.confident} confident</span>
            {" / "}
            <span style={{ color: "#ea4335" }}>{sceneProgress.reviewed} needs review</span>
            {" / "}
            {sceneProgress.total - sceneProgress.confident - sceneProgress.reviewed} unmarked
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
          <div className="h-full flex">
            <div
              className="h-full transition-all"
              style={{
                width: `${(sceneProgress.confident / sceneProgress.total) * 100}%`,
                background: "#34a853",
              }}
            />
            <div
              className="h-full transition-all"
              style={{
                width: `${(sceneProgress.reviewed / sceneProgress.total) * 100}%`,
                background: "#ea4335",
              }}
            />
          </div>
        </div>
      </div>

      {/* Opening stage direction */}
      {currentScene.openingDirection && (
        <div
          className="rounded-xl px-4 py-3 text-sm italic"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          {currentScene.openingDirection}
        </div>
      )}

      {/* Dialogue cards */}
      <div className="space-y-3">
        {currentScene.lines.map((line, idx) => {
          const key = statusKey(currentScene.act, currentScene.scene, idx);
          const status = jcLineByLineStatus[key];

          return (
            <div
              key={idx}
              className="rounded-xl overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${
                  status === "needs_review"
                    ? "rgba(234,67,53,0.4)"
                    : status === "confident"
                    ? "rgba(52,168,83,0.4)"
                    : "var(--border)"
                }`,
              }}
            >
              {/* Speaker + stage direction */}
              <div className="px-4 pt-3 pb-2 flex items-center gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "var(--primary)" }}
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
                    className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        status === "needs_review"
                          ? "rgba(234,67,53,0.1)"
                          : "rgba(52,168,83,0.1)",
                      color: status === "needs_review" ? "#ea4335" : "#34a853",
                    }}
                  >
                    {status === "needs_review" ? "Needs Review" : "Confident"}
                  </span>
                )}
              </div>

              {/* Original text */}
              <div className="px-4 pb-2">
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text)", fontStyle: "italic" }}
                >
                  {line.original}
                </p>
              </div>

              {/* Divider */}
              <div className="mx-4" style={{ borderTop: "1px solid var(--border)" }} />

              {/* Modern translation */}
              <div className="px-4 pt-2 pb-2">
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: "var(--text-secondary)" }}
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
                className="px-4 py-2 flex gap-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={() => toggleStatus(idx, "needs_review")}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer"
                  style={{
                    background:
                      status === "needs_review"
                        ? "rgba(234,67,53,0.15)"
                        : "transparent",
                    color:
                      status === "needs_review"
                        ? "#ea4335"
                        : "var(--text-secondary)",
                    border: `1px solid ${
                      status === "needs_review"
                        ? "rgba(234,67,53,0.3)"
                        : "var(--border)"
                    }`,
                  }}
                >
                  Needs Review
                </button>
                <button
                  onClick={() => toggleStatus(idx, "confident")}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer"
                  style={{
                    background:
                      status === "confident"
                        ? "rgba(52,168,83,0.15)"
                        : "transparent",
                    color:
                      status === "confident"
                        ? "#34a853"
                        : "var(--text-secondary)",
                    border: `1px solid ${
                      status === "confident"
                        ? "rgba(52,168,83,0.3)"
                        : "var(--border)"
                    }`,
                  }}
                >
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
