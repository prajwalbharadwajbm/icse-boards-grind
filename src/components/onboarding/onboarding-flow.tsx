"use client";

import { useState, useEffect, useMemo } from "react";
import { SchoolHoursFields } from "@/components/routine/school-hours-fields";
import { DEFAULT_SCHOOL_HOURS } from "@/lib/school-hours";
import type { Routine } from "@/store/use-store";
import { GroupTwoPicker, GROUP_TWO_MIN, GROUP_TWO_MAX } from "@/components/subjects/group-two-picker";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { capture } from "@/lib/analytics";
import { useAuth } from "@/providers/auth-provider";
import { useStore } from "@/store/use-store";
import { SECOND_LANGUAGES, GROUP_THREE, DEFAULT_GROUP_TWO, getSubjectLabels, getSubjectColors, withSubjectKeys } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { StickerMark, StarSticker } from "@/components/brand/sticker";
import { StickerAvatar } from "@/components/brand/avatars";
import { AVATARS, STUDY_VIBES, avatarFor, vibeFor } from "@/lib/identity";

const TOTAL_STEPS = 10;
const STEP_NAMES = ["name", "identity", "language", "elective", "learning_style", "study_hours", "subject_confidence", "target_percent", "prep_level", "routine"];

/**
 * The onboarding steps. `preview` renders it for /preview/onboarding without a signed-in
 * student: no sign-in redirect, no analytics, and finishing just starts again.
 */
export function OnboardingFlow({ preview = false }: { preview?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const update = useStore((s) => s.update);

  useEffect(() => {
    if (user && !preview) capture("onboarding_started");
  }, [user, preview]);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [studyVibe, setStudyVibe] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("kannada");
  const [selectedElective, setSelectedElective] = useState("computer");
  const [groupTwo, setGroupTwo] = useState<string[]>([...DEFAULT_GROUP_TWO]);
  const [learningStyle, setLearningStyle] = useState("mixed");
  const [studyHours, setStudyHours] = useState(8);
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [targetPercent, setTargetPercent] = useState(90);
  const [prepLevel, setPrepLevel] = useState("somewhat");
  const [routine, setRoutine] = useState<Routine>({
    wake: "06:00", breakfast: "07:00", lunch: "13:00",
    snack: "17:00", dinner: "20:30", sleep: "22:30",
    school: DEFAULT_SCHOOL_HOURS,
  });
  // Compute dynamic labels/colors based on selections
  const subjectLabels = useMemo(() => getSubjectLabels(selectedLanguage, selectedElective, groupTwo), [selectedLanguage, selectedElective, groupTwo]);
  const subjectColors = useMemo(() => getSubjectColors(selectedLanguage, selectedElective, groupTwo), [selectedLanguage, selectedElective, groupTwo]);

  // Initialize ratings when labels change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync ratings keys with subject labels
    setRatings((prev) => {
      const r: Record<string, string> = {};
      Object.keys(subjectLabels).forEach((k) => (r[k] = prev[k] || "medium"));
      return r;
    });
  }, [subjectLabels]);

  // Send signed-out visitors to login once auth has settled (never redirect during render)
  useEffect(() => {
    if (!preview && !loading && !user) router.replace("/login");
  }, [preview, loading, user, router]);

  if (!user && !preview) return null;

  // Until they tap one, show a sticker picked from their name
  const shownAvatar = avatarFor(avatar, name);
  const chosenVibe = vibeFor(studyVibe);

  const handleNext = () => {
    if (step === 1 && !name.trim()) return;
    if (step === 2 && !studyVibe) return;
    if (step < TOTAL_STEPS) {
      if (!preview) capture("onboarding_step_completed", { step, step_name: STEP_NAMES[step - 1], total_steps: TOTAL_STEPS });
      setStep(step + 1);
    } else if (preview) {
      setStep(1);
    } else {
      capture("onboarding_step_completed", { step, step_name: STEP_NAMES[step - 1], total_steps: TOTAL_STEPS });
      // Save all data
      update((s) => ({
        ...s,
        name: name.trim(),
        selectedLanguage,
        selectedElective,
        groupTwo,
        learningStyle: learningStyle as "visual" | "reading" | "practice" | "mixed",
        studyHours,
        subjectRatings: ratings as Record<string, "weak" | "medium" | "strong">,
        targetPercent,
        prepLevel: prepLevel as "just_started" | "somewhat" | "mostly_done",
        routine,
        avatar: shownAvatar,
        studyVibe,
        // Seed chapter lists for the chosen language and elective
        subjects: withSubjectKeys(s.subjects, selectedLanguage, selectedElective, groupTwo),
        onboarded: true,
      }));
      capture("onboarding_completed", {
        language: selectedLanguage,
        elective: selectedElective,
        group_two: groupTwo.join(","),
        learning_style: learningStyle,
        study_hours: studyHours,
        target_percent: targetPercent,
        prep_level: prepLevel,
        avatar: shownAvatar,
        study_vibe: studyVibe,
      });
      capture("identity_picked", { avatar: shownAvatar, study_vibe: studyVibe, source: "onboarding" });
      router.replace("/dashboard");
    }
  };

  const styleOptions = [
    { value: "visual", label: "Visual", desc: "Diagrams, videos, charts", icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
    { value: "reading", label: "Reading", desc: "Textbooks, notes, summaries", icon: "M4 19.5A2.5 2.5 0 016.5 17H20" },
    { value: "practice", label: "Practice", desc: "Problems, past papers", icon: "M12 20h9" },
    { value: "mixed", label: "Mixed", desc: "Combination of all styles", icon: "M12 2L2 7l10 5 10-5-10-5z" },
  ];

  const prepOptions = [
    { value: "just_started", label: "Just started", desc: "Beginning my preparation" },
    { value: "somewhat", label: "Somewhat prepared", desc: "Covered some topics" },
    { value: "mostly_done", label: "Mostly done", desc: "Almost finished revising" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-lg py-4">
        <div className="flex justify-center mb-6">
          <StickerMark size={48} title="Boards Grind" />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div
            className="h-3.5 rounded-full overflow-hidden"
            style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          >
            <motion.div
              className="h-full"
              style={{ background: "var(--primary)", boxShadow: step < TOTAL_STEPS ? "inset -2px 0 0 var(--outline)" : undefined }}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <p className="text-[13px] font-bold text-center mt-2 tabular-nums" style={{ color: "var(--text-muted)" }}>Step {step} of {TOTAL_STEPS}</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-[24px] p-5 sm:p-6" style={{ background: "var(--bg-card)", border: "2px solid var(--outline)", boxShadow: "4px 4px 0 var(--outline)" }}>
              {/* Step 1: Name */}
              {step === 1 && (
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "var(--primary-light)", border: "2px solid var(--outline)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <h2 className={TITLE_CLASS} style={{ color: "var(--text)" }}>What&apos;s your name?</h2>
                  <p className={`${SUB_CLASS} mb-6`} style={{ color: "var(--text-secondary)" }}>Let&apos;s personalize your study dashboard</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                    placeholder="Enter your name"
                    className="w-full h-12 px-4 rounded-xl text-center text-lg font-medium outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
                    style={{ background: "var(--bg-card)", color: "var(--text)" }}
                    autoFocus
                  />
                </div>
              )}

              {/* Step 2: Identity */}
              {step === 2 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>Make it yours</h2>
                  <p className={`${SUB_CLASS} text-center`} style={{ color: "var(--text-secondary)" }}>
                    Pick a sticker and your study vibe. Your sticker is you on the dashboard and the leaderboard
                  </p>

                  {/* The identity card they are building */}
                  <div className="flex justify-center my-5">
                    <div className="inline-flex items-center gap-4 rounded-[20px] pl-4 pr-6 py-3" style={{ background: "var(--sun-soft)", border: "2px solid var(--outline)" }}>
                      <StickerAvatar avatar={shownAvatar} seed={name} size={72} tilt={-6} />
                      <div className="text-left min-w-0">
                        <p className="font-display text-2xl font-extrabold tracking-[-0.02em] truncate" style={{ color: "var(--text)" }}>{name.trim() || "You"}</p>
                        <p className="text-sm font-bold" style={{ color: chosenVibe ? "var(--text)" : "var(--text-muted)" }}>
                          {chosenVibe ? chosenVibe.name : "Pick a vibe below"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-bold mb-2" style={{ color: "var(--text)" }} id="sticker-label">Your sticker</p>
                  <div role="radiogroup" aria-labelledby="sticker-label" className="grid grid-cols-5 gap-2">
                    {AVATARS.map((a) => {
                      const on = shownAvatar === a.key;
                      return (
                        <button
                          key={a.key}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          aria-label={a.name}
                          onClick={() => setAvatar(a.key)}
                          className="aspect-square rounded-2xl flex items-center justify-center transition-[background-color,transform] duration-150 hover:bg-[var(--paper)] active:scale-95"
                          style={{ border: `2px solid ${on ? "var(--outline)" : "transparent"}`, background: on ? "var(--primary-light)" : undefined }}
                        >
                          <StickerAvatar avatar={a.key} size={48} tilt={on ? -8 : 0} />
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-sm font-bold mt-5 mb-2" style={{ color: "var(--text)" }} id="vibe-label">Your study vibe</p>
                  <div role="radiogroup" aria-labelledby="vibe-label" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STUDY_VIBES.map((v) => {
                      const on = studyVibe === v.key;
                      return (
                        <button
                          key={v.key}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setStudyVibe(v.key)}
                          className="text-left rounded-2xl px-4 py-3 min-h-[56px] transition-colors duration-150 hover:bg-[var(--paper)]"
                          style={{ border: "2px solid var(--outline)", background: on ? "var(--sun)" : "var(--bg-card)", color: on ? "#000" : "var(--text)" }}
                        >
                          <span className="block text-[15px] font-bold">{v.name}</span>
                          <span className="block text-xs mt-0.5" style={{ opacity: 0.75 }}>{v.line}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Second language */}
              {step === 3 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>Choose your second language</h2>
                  <p className={`${SUB_CLASS} mb-5 text-center`} style={{ color: "var(--text-secondary)" }}>Select the language you&apos;re taking for ICSE</p>
                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto p-0.5 pr-1">
                    {SECOND_LANGUAGES.map((lang) => {
                      const selected = selectedLanguage === lang.key;
                      return (
                        <button
                          key={lang.key}
                          onClick={() => setSelectedLanguage(lang.key)}
                          aria-pressed={selected}
                          className={`${OPTION_ROW_CLASS} ${optionClass(selected)}`}
                          style={OPTION_STYLE}
                        >
                          <span className={`text-[15px] ${selected ? "font-bold" : "font-medium"}`} style={{ color: "var(--text)" }}>{lang.name}</span>
                          <span className="flex items-center gap-3">
                            <span className="text-[13px] font-medium tabular-nums" style={{ color: selected ? "var(--text)" : "var(--text-muted)" }}>{new Date(lang.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                            <CheckSlot on={selected} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Elective */}
              {step === 4 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>Your subjects</h2>
                  <p className={`${SUB_CLASS} mb-5 text-center`} style={{ color: "var(--text-secondary)" }}>English, your second language, History &amp; Civics and Geography are compulsory. Pick the rest</p>
                  <div className="mb-5">
                    <GroupTwoPicker value={groupTwo} onChange={setGroupTwo} />
                  </div>
                  <p className="text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>Group III elective</p>
                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto p-0.5 pr-1">
                    {GROUP_THREE.map((elective) => {
                      const selected = selectedElective === elective.key;
                      return (
                        <button
                          key={elective.key}
                          onClick={() => setSelectedElective(elective.key)}
                          aria-pressed={selected}
                          className={`${OPTION_ROW_CLASS} ${optionClass(selected)}`}
                          style={OPTION_STYLE}
                        >
                          <div className="min-w-0">
                            <span className={`text-[15px] ${selected ? "font-bold" : "font-medium"}`} style={{ color: "var(--text)" }}>{elective.name}</span>
                            <span className="text-xs font-medium ml-2" style={{ color: selected ? "var(--text-secondary)" : "var(--text-muted)" }}>
                              Group {elective.group}
                            </span>
                          </div>
                          <span className="flex items-center gap-3 shrink-0">
                            <span className="text-[13px] font-medium tabular-nums" style={{ color: selected ? "var(--text)" : "var(--text-muted)" }}>{new Date(elective.date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                            <CheckSlot on={selected} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 5: Learning Style */}
              {step === 5 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>How do you learn best?</h2>
                  <p className={`${SUB_CLASS} mb-6 text-center`} style={{ color: "var(--text-secondary)" }}>We&apos;ll tailor suggestions to your style</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {styleOptions.map((opt) => {
                      const selected = learningStyle === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setLearningStyle(opt.value)}
                          aria-pressed={selected}
                          className={`relative p-4 rounded-2xl text-left cursor-pointer transition-colors duration-150 ${optionClass(selected)}`}
                          style={OPTION_STYLE}
                        >
                          <span className="absolute top-3 right-3">
                            <CheckSlot on={selected} />
                          </span>
                          <p className={`text-[15px] pr-6 ${selected ? "font-bold" : "font-medium"}`} style={{ color: "var(--text)" }}>{opt.label}</p>
                          <p className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>{opt.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 6: Study Hours */}
              {step === 6 && (
                <div className="text-center">
                  <h2 className={TITLE_CLASS} style={{ color: "var(--text)" }}>Daily study target?</h2>
                  <p className={`${SUB_CLASS} mb-6`} style={{ color: "var(--text-secondary)" }}>Set your daily study hours goal</p>
                  <p className="font-display text-[56px] leading-none font-extrabold tracking-[-0.02em] tabular-nums mb-5" style={{ color: "var(--text)" }}>{studyHours}h</p>
                  <input
                    type="range" min="2" max="14" value={studyHours}
                    onChange={(e) => setStudyHours(parseInt(e.target.value))}
                    className="w-full accent-[var(--primary)] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-medium tabular-nums mt-1" style={{ color: "var(--text-muted)" }}>
                    <span>2h</span><span>14h</span>
                  </div>
                </div>
              )}

              {/* Step 7: Subject Confidence */}
              {step === 7 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>Rate your confidence</h2>
                  <p className={`${SUB_CLASS} mb-4 text-center`} style={{ color: "var(--text-secondary)" }}>How prepared are you in each subject?</p>
                  <div className="max-h-80 overflow-y-auto">
                    {Object.keys(subjectLabels).map((key) => (
                      <div
                        key={key}
                        className="flex flex-wrap items-center gap-x-2.5 gap-y-2 py-2.5 border-b last:border-b-0"
                        style={{ borderColor: "var(--divider)" }}
                      >
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: subjectColors[key] }} />
                        <span className="text-[15px] font-medium flex-1 min-w-[110px] truncate" style={{ color: "var(--text)" }}>{subjectLabels[key]}</span>
                        <div className="flex gap-2">
                          {(["weak", "medium", "strong"] as const).map((r) => {
                            const active = ratings[key] === r;
                            return (
                              <button
                                key={r}
                                onClick={() => setRatings({ ...ratings, [key]: r })}
                                aria-pressed={active}
                                className={`h-9 px-4 rounded-full text-sm capitalize cursor-pointer transition-colors duration-150 ${active ? "font-bold bg-[var(--text)] text-[var(--bg)]" : "font-medium bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--paper)]"}`}
                                style={{ border: "2px solid var(--outline)" }}
                              >
                                {r}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Target Percentage */}
              {step === 8 && (
                <div className="text-center">
                  <h2 className={TITLE_CLASS} style={{ color: "var(--text)" }}>Target percentage?</h2>
                  <p className={`${SUB_CLASS} mb-6`} style={{ color: "var(--text-secondary)" }}>What marks are you aiming for?</p>
                  <p className="font-display text-[56px] leading-none font-extrabold tracking-[-0.02em] tabular-nums mb-5" style={{ color: "var(--text)" }}>{targetPercent}%</p>
                  <input
                    type="range" min="50" max="100" value={targetPercent}
                    onChange={(e) => setTargetPercent(parseInt(e.target.value))}
                    className="w-full accent-[var(--primary)] cursor-pointer"
                  />
                </div>
              )}

              {/* Step 9: Prep Level */}
              {step === 9 && (
                <div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>How prepared are you?</h2>
                  <p className={`${SUB_CLASS} mb-6 text-center`} style={{ color: "var(--text-secondary)" }}>Your current preparation status</p>
                  <div className="flex flex-col gap-2.5">
                    {prepOptions.map((opt) => {
                      const selected = prepLevel === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setPrepLevel(opt.value)}
                          aria-pressed={selected}
                          className={`${OPTION_ROW_CLASS} py-3 ${optionClass(selected)}`}
                          style={OPTION_STYLE}
                        >
                          <span className="min-w-0">
                            <span className={`block text-[15px] ${selected ? "font-bold" : "font-medium"}`} style={{ color: "var(--text)" }}>{opt.label}</span>
                            <span className="block text-[13px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{opt.desc}</span>
                          </span>
                          <CheckSlot on={selected} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 10: Daily Routine */}
              {step === 10 && (
                <div>
                  <div className="flex justify-center mb-3">
                    <StarSticker size={56} />
                  </div>
                  <h2 className={`${TITLE_CLASS} text-center`} style={{ color: "var(--text)" }}>Your daily routine</h2>
                  <p className={`${SUB_CLASS} mb-5 text-center`} style={{ color: "var(--text-secondary)" }}>We&apos;ll plan study blocks around your schedule</p>
                  <div className="rounded-2xl p-4 mb-4" style={{ border: "2px solid var(--outline)" }}>
                    <SchoolHoursFields value={routine.school} onChange={(school) => setRoutine({ ...routine, school })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(["wake", "breakfast", "lunch", "snack", "dinner", "sleep"] as const).map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-1.5 capitalize" style={{ color: "var(--text)" }}>{key}</label>
                        <input
                          type="time"
                          value={routine[key]}
                          onChange={(e) => setRoutine({ ...routine, [key]: e.target.value })}
                          className="w-full h-11 px-3 rounded-xl text-sm tabular-nums outline-none border-2 border-[var(--outline)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)]"
                          style={{ background: "var(--bg-card)", color: "var(--text)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1" size="lg">
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1" size="lg" disabled={(step === 2 && !studyVibe) || (step === 4 && (groupTwo.length < GROUP_TWO_MIN || groupTwo.length > GROUP_TWO_MAX))}>
            {step === TOTAL_STEPS ? "Get started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ── Sticker pieces local to onboarding ── */

const TITLE_CLASS = "font-display text-[26px] sm:text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-1.5";
const SUB_CLASS = "text-[15px]";

const OPTION_ROW_CLASS =
  "w-full min-h-[52px] px-4 py-2 rounded-2xl text-left cursor-pointer transition-colors duration-150 flex items-center justify-between gap-3";

const OPTION_STYLE: React.CSSProperties = { border: "2px solid var(--outline)" };
const optionClass = (selected: boolean) =>
  selected ? "bg-[var(--primary-light)]" : "bg-[var(--bg-card)] hover:bg-[var(--paper)]";

/** A fixed-width slot so rows don't shift when the bold check appears */
function CheckSlot({ on }: { on: boolean }) {
  return (
    <span className="w-5 h-5 shrink-0 flex items-center justify-center" aria-hidden="true">
      {on && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}
