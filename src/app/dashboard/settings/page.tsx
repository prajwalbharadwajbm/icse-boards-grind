"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { SchoolHoursFields } from "@/components/routine/school-hours-fields";
import { AskForIt } from "@/components/feedback/ask-for-it";
import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { useAuth } from "@/providers/auth-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSubjectLabels, getSubjectColors, SECOND_LANGUAGES, ELECTIVES, GROUP_THREE, DEFAULT_GROUP_TWO, isValidGroupTwo, withSubjectKeys } from "@/lib/constants";
import { GroupTwoPicker } from "@/components/subjects/group-two-picker";
import { StickerAvatar } from "@/components/brand/avatars";
import { AVATARS, STUDY_VIBES, avatarFor, vibeFor } from "@/lib/identity";
import { today } from "@/lib/utils";
import { deleteCloudData } from "@/store/firebase-sync";
import { NotificationSettings } from "@/components/notifications/notification-settings";
import { anonymizeName } from "@/lib/leaderboard";

export default function SettingsPage() {
  const data = useStore();
  const { user } = useAuth();
  const setField = useStore((s) => s.setField);
  const update = useStore((s) => s.update);
  const setAll = useStore((s) => s.setAll);
  const resetStore = useStore((s) => s.resetStore);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lang = data.selectedLanguage || "kannada";
  const elective = data.selectedElective || "computer";
  const groupTwo = data.groupTwo;
  const [groupTwoDraft, setGroupTwoDraft] = useState<string[]>(isValidGroupTwo(groupTwo) ? [...groupTwo] : DEFAULT_GROUP_TWO);
  const SUBJECT_LABELS = useMemo(() => getSubjectLabels(lang, elective, groupTwo), [lang, elective, groupTwo]);
  const SUBJECT_COLORS = useMemo(() => getSubjectColors(lang, elective, groupTwo), [lang, elective, groupTwo]);

  const [name, setName] = useState(data.name || "");
  const [studyHours, setStudyHours] = useState(data.studyHours || 8);
  const [targetPercent, setTargetPercent] = useState(data.targetPercent || 90);
  const [grokApiKey, setGrokApiKey] = useState(data.grokApiKey || "");
  const [routine, setRoutine] = useState(data.routine);
  const [toast, setToast] = useState("");
  const [importStatus, setImportStatus] = useState<"idle" | "confirm" | "error">("idle");
  const [importData, setImportData] = useState<Record<string, unknown> | null>(null);
  const [importError, setImportError] = useState("");

  useEffect(() => {
    capture("settings_page_viewed");
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const saveSettings = () => {
    update((s) => ({
      ...s,
      name,
      studyHours,
      targetPercent,
      grokApiKey,
      routine,
    }));
    capture("settings_saved", {
      study_hours: studyHours,
      target_percent: targetPercent,
      has_grok_key: !!grokApiKey,
    });
    showToast("Settings saved");
  };

  const exportData = () => {
    const state = useStore.getState();
    const { setField: _a, update: _b, setAll: _c, resetStore: _d, markHydrated: _e, _hydrated, ...exportable } = state;
    const blob = new Blob([JSON.stringify(exportable, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `icse-grind-backup-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    capture("data_exported");
    showToast("Data exported");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed || typeof parsed !== "object") throw new Error("Invalid format");
        if (!parsed.subjects && !parsed.studyLog && !parsed.name) {
          throw new Error("Missing required fields (subjects, studyLog, name)");
        }
        setImportData(parsed);
        setImportStatus("confirm");
        setImportError("");
      } catch (err) {
        setImportError((err as Error).message);
        setImportStatus("error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const doImport = (mode: "replace" | "merge") => {
    if (!importData) return;
    capture("data_imported", { mode });
    if (mode === "replace") {
      setAll(importData);
    } else {
      // Merge: keep newer timestamps, deep merge chapters
      const current = useStore.getState();
      const merged: Record<string, unknown> = { ...importData };
      // Merge studyLog
      if (importData.studyLog && current.studyLog) {
        merged.studyLog = { ...current.studyLog, ...(importData.studyLog as Record<string, unknown>) };
      }
      // Merge subjects (keep existing statuses if newer)
      if (importData.subjects && current.subjects) {
        const mergedSubjects: Record<string, unknown> = {};
        Object.keys(current.subjects).forEach((key) => {
          const imported = (importData.subjects as Record<string, unknown[]>)?.[key];
          if (imported) {
            mergedSubjects[key] = imported;
          } else {
            mergedSubjects[key] = current.subjects[key];
          }
        });
        merged.subjects = mergedSubjects;
      }
      setAll(merged);
    }
    setImportStatus("idle");
    setImportData(null);
    showToast("Data imported");
  };

  const handleReset = async () => {
    if (!confirm("This will delete ALL your data including progress, settings, and study logs. Are you sure?")) return;
    if (!confirm("This cannot be undone. Really reset everything?")) return;
    if (user) await deleteCloudData(user.uid);
    resetStore();
    window.location.reload();
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed top-4 right-4 z-50 flex items-center gap-2 h-10 px-4 rounded-full text-sm font-bold"
          style={{ background: "var(--bg-card)", color: "var(--text)", border: "2px solid var(--outline)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {toast}
        </div>
      )}

      {/* Profile */}
      <Card>
        <CardTitle>Profile</CardTitle>
        <div className="space-y-5">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
              Study hours target: <span className="font-bold tabular-nums">{studyHours}h</span>
            </label>
            <input
              type="range" min="2" max="14" value={studyHours}
              onChange={(e) => setStudyHours(parseInt(e.target.value))}
              className="w-full accent-[var(--primary)] cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
              Target percentage: <span className="font-bold tabular-nums">{targetPercent}%</span>
            </label>
            <input
              type="range" min="50" max="100" value={targetPercent}
              onChange={(e) => setTargetPercent(parseInt(e.target.value))}
              className="w-full accent-[var(--primary)] cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Identity: the sticker and study vibe picked in onboarding */}
      <Card>
        <CardTitle>Your identity</CardTitle>
        <div className="flex items-center gap-4 mb-5">
          <StickerAvatar avatar={data.avatar} seed={data.name} size={64} tilt={-6} />
          <div className="min-w-0">
            <p className="font-display text-xl font-extrabold tracking-[-0.01em] truncate" style={{ color: "var(--text)" }}>{data.name || "Student"}</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{vibeFor(data.studyVibe)?.name ?? "No study vibe yet"}</p>
          </div>
        </div>
        <p className="text-sm font-bold mb-2" id="settings-sticker" style={{ color: "var(--text)" }}>Sticker</p>
        <div role="radiogroup" aria-labelledby="settings-sticker" className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-5">
          {AVATARS.map((a) => {
            const on = avatarFor(data.avatar, data.name) === a.key;
            return (
              <button
                key={a.key}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={a.name}
                onClick={() => {
                  setField("avatar", a.key);
                  capture("identity_picked", { avatar: a.key, study_vibe: data.studyVibe || "", source: "settings" });
                }}
                className="aspect-square rounded-2xl flex items-center justify-center transition-colors duration-150 hover:bg-[var(--paper)]"
                style={{ border: `2px solid ${on ? "var(--outline)" : "transparent"}`, background: on ? "var(--primary-light)" : undefined }}
              >
                <StickerAvatar avatar={a.key} size={40} tilt={on ? -8 : 0} />
              </button>
            );
          })}
        </div>
        <p className="text-sm font-bold mb-2" id="settings-vibe" style={{ color: "var(--text)" }}>Study vibe</p>
        <div role="radiogroup" aria-labelledby="settings-vibe" className="flex flex-wrap gap-2">
          {STUDY_VIBES.map((v) => {
            const on = data.studyVibe === v.key;
            return (
              <button
                key={v.key}
                type="button"
                role="radio"
                aria-checked={on}
                title={v.line}
                onClick={() => {
                  setField("studyVibe", v.key);
                  capture("identity_picked", { avatar: avatarFor(data.avatar, data.name), study_vibe: v.key, source: "settings" });
                }}
                className={`h-9 px-4 rounded-full text-sm transition-colors duration-150 ${on ? "font-bold" : "font-medium hover:bg-[var(--paper)]"}`}
                style={{ border: "2px solid var(--outline)", background: on ? "var(--text)" : "var(--bg-card)", color: on ? "var(--bg)" : "var(--text)" }}
              >
                {v.name}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Subject Selection */}
      <Card>
        <CardTitle>Subjects</CardTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Second language</label>
            <select
              value={lang}
              onChange={(e) => {
                capture("language_changed", { new_language: e.target.value });
                const next = e.target.value;
                update((s) => ({ selectedLanguage: next, subjects: withSubjectKeys(s.subjects, next, elective, s.groupTwo) }));
              }}
              className={FIELD_CLASS}
              style={FIELD_STYLE}
            >
              {SECOND_LANGUAGES.map((l) => (
                <option key={l.key} value={l.key}>{l.name} ({new Date(l.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Group III elective</label>
            <select
              value={elective}
              onChange={(e) => {
                capture("elective_changed", { new_elective: e.target.value });
                const next = e.target.value;
                update((s) => ({ selectedElective: next, subjects: withSubjectKeys(s.subjects, lang, next, s.groupTwo) }));
              }}
              className={FIELD_CLASS}
              style={FIELD_STYLE}
            >
              {/* Older accounts may have a Group II subject saved here; keep it listed so it still shows */}
              {[...GROUP_THREE, ...ELECTIVES.filter((el) => el.key === elective && !GROUP_THREE.includes(el))].map((el) => (
                <option key={el.key} value={el.key}>{el.name}, Group {el.group} ({new Date(el.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })})</option>
              ))}
            </select>
          </div>
          <GroupTwoPicker
            value={groupTwoDraft}
            onChange={(next) => {
              setGroupTwoDraft(next);
              // Saved only once it's a valid ICSE choice; until then the picker says what's missing
              if (!isValidGroupTwo(next)) return;
              capture("group_two_changed", { group_two: [...next].sort().join(",") });
              update((s) => ({ groupTwo: next, subjects: withSubjectKeys(s.subjects, lang, elective, next) }));
            }}
          />
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            Changing subjects will update your exam dates and study plans.
          </p>
          <div className="pt-4 flex flex-col gap-2.5" style={{ borderTop: "2px dashed var(--divider)" }}>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>Not in ICSE Class 10? Tell us, and we&apos;ll build it if enough students ask</p>
            <div className="flex flex-wrap gap-2">
              <AskForIt feature="class_9" source="settings" />
              <AskForIt feature="isc" source="settings" />
            </div>
          </div>
        </div>
      </Card>

      {/* Daily Routine */}
      <Card>
        <CardTitle>Daily routine</CardTitle>
        <div className="mb-5 pb-5 border-b" style={{ borderColor: "var(--divider)" }}>
          <SchoolHoursFields value={routine.school} onChange={(school) => setRoutine({ ...routine, school })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(["wake", "breakfast", "lunch", "snack", "dinner", "sleep"] as const).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1.5 capitalize" style={{ color: "var(--text)" }}>{key}</label>
              <input
                type="time"
                value={routine[key]}
                onChange={(e) => setRoutine({ ...routine, [key]: e.target.value })}
                className={`${FIELD_CLASS} tabular-nums`}
                style={FIELD_STYLE}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Subject Confidence */}
      <Card>
        <CardTitle>Subject confidence</CardTitle>
        <div>
          {Object.keys(SUBJECT_LABELS).map((key) => {
            const current = (data.subjectRatings || {})[key] || "medium";
            return (
              <div
                key={key}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 py-2.5 border-b last:border-b-0 first:pt-0 last:pb-0"
                style={{ borderColor: "var(--divider)" }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: SUBJECT_COLORS[key] }} />
                <span className="text-[15px] font-medium flex-1 min-w-[120px] truncate" style={{ color: "var(--text)" }}>{SUBJECT_LABELS[key]}</span>
                <div className="flex gap-2">
                  {(["weak", "medium", "strong"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => update((s) => ({
                        subjectRatings: { ...s.subjectRatings, [key]: r },
                      }))}
                      aria-pressed={current === r}
                      className={`h-9 px-4 rounded-full text-sm capitalize cursor-pointer transition-colors duration-150 ${current === r ? "font-bold bg-[var(--text)] text-[var(--bg)]" : "font-medium bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--paper)]"}`}
                      style={{ border: "2px solid var(--outline)" }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Push Notifications */}
      <NotificationSettings />

      {/* AI Chat */}
      <Card>
        <CardTitle>AI chat settings</CardTitle>
        <Input
          label="Grok / Groq API Key"
          value={grokApiKey}
          onChange={(e) => setGrokApiKey(e.target.value)}
          placeholder="Enter your xAI or Groq API key"
          type="password"
        />
        <p className="text-[13px] mt-2" style={{ color: "var(--text-muted)" }}>
          Supports xAI Grok (grok-3-mini) and Groq (llama-3.3-70b). Keys starting with &quot;gsk_&quot; use Groq.
        </p>
      </Card>

      {/* F9: Leaderboard */}
      <Card>
        <CardTitle>Leaderboard</CardTitle>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[15px] font-bold" style={{ color: "var(--text)" }}>
              {data.leaderboardOptIn ? "You're on the leaderboard" : "Join the leaderboard"}
            </p>
            {data.leaderboardOptIn && (
              <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Shown as: {anonymizeName(name || data.name)}
              </p>
            )}
          </div>
          <button
            role="switch"
            aria-checked={!!data.leaderboardOptIn}
            onClick={() => {
              setField("leaderboardOptIn", !data.leaderboardOptIn);
              capture("leaderboard_toggle", { enabled: !data.leaderboardOptIn });
            }}
            className={SWITCH_TRACK_CLASS}
            style={{ background: data.leaderboardOptIn ? "var(--primary)" : "var(--paper)" }}
          >
            <span className={SWITCH_KNOB_CLASS} style={switchKnobStyle(!!data.leaderboardOptIn)} />
          </button>
        </div>
      </Card>

      {/* F10: Parent Report */}
      <Card>
        <CardTitle>Parent report</CardTitle>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[15px] font-bold" style={{ color: "var(--text)" }}>
                {data.shareReportEnabled ? "Report sharing is on" : "Share progress with parents"}
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                Parents can view a read-only progress report.
              </p>
            </div>
            <button
              role="switch"
              aria-checked={!!data.shareReportEnabled}
              onClick={() => {
                setField("shareReportEnabled", !data.shareReportEnabled);
                capture("parent_report_toggle", { enabled: !data.shareReportEnabled });
              }}
              className={SWITCH_TRACK_CLASS}
              style={{ background: data.shareReportEnabled ? "var(--primary)" : "var(--paper)" }}
            >
              <span className={SWITCH_KNOB_CLASS} style={switchKnobStyle(!!data.shareReportEnabled)} />
            </button>
          </div>
          {data.shareReportEnabled && user && (
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Report URL</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/report?uid=${user.uid}`}
                  className={`${FIELD_CLASS} flex-1 min-w-0 text-xs`}
                  style={{ ...FIELD_STYLE, background: "var(--paper)" }}
                />
                <Button
                  variant="secondary"
                  className="h-11 shrink-0"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/report?uid=${user.uid}`);
                    showToast("Link copied");
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Save */}
      <Button onClick={saveSettings} className="w-full" size="lg">Save changes</Button>

      {/* Data Management */}
      <Card>
        <CardTitle>Data management</CardTitle>
        <div className="space-y-3">
          <Button onClick={exportData} variant="secondary" className="w-full">
            Export data as JSON
          </Button>

          <div>
            <Button onClick={() => fileInputRef.current?.click()} variant="secondary" className="w-full">
              Import data from JSON
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportFile}
            />
          </div>

          {importStatus === "confirm" && (
            <div className="p-4 rounded-2xl" style={{ background: "var(--primary-light)", border: "2px solid var(--outline)" }}>
              <p className="text-[15px] font-bold mb-3" style={{ color: "var(--text)" }}>Import data?</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => doImport("replace")} size="sm">Replace all</Button>
                <Button onClick={() => doImport("merge")} variant="secondary" size="sm">Merge</Button>
                <Button onClick={() => setImportStatus("idle")} variant="ghost" size="sm">Cancel</Button>
              </div>
            </div>
          )}

          {importStatus === "error" && (
            <div className="px-4 py-3 rounded-2xl text-sm font-medium" style={{ background: "var(--danger-soft)", border: "2px solid var(--outline)", color: "var(--text)" }}>
              Invalid file: {importError}
            </div>
          )}

          <div className="pt-4 mt-1" style={{ borderTop: "1px solid var(--divider)" }}>
            <Button onClick={handleReset} variant="danger" className="w-full">
              Reset all data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ── Sticker pieces local to this page ── */

const FIELD_CLASS =
  "w-full h-11 px-4 rounded-xl text-sm outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]";
const FIELD_STYLE: React.CSSProperties = { background: "var(--bg-card)", color: "var(--text)" };

const SWITCH_TRACK_CLASS =
  "w-11 h-6 rounded-full border-2 border-[var(--outline)] transition-colors duration-150 relative shrink-0 cursor-pointer";
const SWITCH_KNOB_CLASS = "w-4 h-4 rounded-full absolute top-[2px] transition-[left] duration-150";
const switchKnobStyle = (on: boolean): React.CSSProperties => ({
  left: on ? 22 : 2,
  background: "#ffffff",
  border: "2px solid var(--outline)",
});

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] mb-4" style={{ color: "var(--text)" }}>
      {children}
    </h3>
  );
}
