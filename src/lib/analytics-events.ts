/**
 * Typed analytics event map.
 * To add a new event: add an entry here, then call capture() — TypeScript
 * will enforce the correct properties at every call site.
 */

export interface AnalyticsEventMap {
  // ── Auth ──────────────────────────────────────────────────────────────
  user_logged_in: { method: string };
  login_failed: { method: string; error: string };

  // ── Onboarding ────────────────────────────────────────────────────────
  onboarding_step_completed: { step: number };
  onboarding_completed: {
    language: string;
    elective: string;
    learning_style: string;
    study_hours: number;
    target_percent: number;
    prep_level: string;
  };

  // ── Dashboard ─────────────────────────────────────────────────────────
  dashboard_viewed: Record<string, never>;
  weak_area_clicked: { type: string; subject?: string; category?: string; subjectKey?: string };

  // ── Subjects ──────────────────────────────────────────────────────────
  subjects_page_viewed: Record<string, never>;

  // ── English ───────────────────────────────────────────────────────────
  english_page_viewed: Record<string, never>;
  english_tab_changed: { tab: string };
  jc_sub_tab_changed: { sub_tab: string };

  // ── Grammar Drill ─────────────────────────────────────────────────────
  grammar_category_selected: { category: string };
  grammar_question_generated: { category: string };
  grammar_question_failed: { category: string; error: string };
  grammar_question_answered: { category: string; correct: boolean };
  grammar_back_to_categories: Record<string, never>;

  // ── Julius Caesar ─────────────────────────────────────────────────────
  jc_scene_expanded: { scene_id: string; act: number; scene_number: number; title: string };
  jc_scene_video_played: { scene_id: string; act: number; scene_number: number; title: string };
  jc_flashcard_flipped: { card_id: string; act: number; scene: number };
  jc_quiz_question_answered: { question_id: string; question_number: number; correct: boolean };
  jc_quiz_completed: { score: number; total: number; percentage: number };
  jc_quiz_retake: Record<string, never>;
  jc_quote_answered: { quote_id: string; correct: boolean; act: number; scene: number };
  jc_quote_reset: { score: number; total: number };
  jc_character_quotes_expanded: { character_id: string; character_name: string };
  jc_line_by_line_scene_selected: { act: number; scene: number; title: string };
  jc_line_by_line_status_changed: { act: number; scene: number; line_index: number; speaker: string; status: "needs_review" | "confident" | "unmarked" };
  jc_flashcard_review_changed: { card_id: string; act: number; scene: number; status: "needs_review" | "confident" | "unmarked" };

  // ── Poems ───────────────────────────────────────────────────────────────
  poem_selected: { poem_id: string; title: string };
  poem_study_mode_changed: { poem_id: string; mode: string };
  poem_stanza_status_changed: { poem_id: string; stanza_index: number; status: string };
  poem_qa_revealed: { poem_id: string; question_index: number };

  // ── Settings ──────────────────────────────────────────────────────────
  settings_page_viewed: Record<string, never>;
  settings_saved: { study_hours: number; target_percent: number; has_grok_key: boolean };
  language_changed: { new_language: string };
  elective_changed: { new_elective: string };
  data_exported: Record<string, never>;
  data_imported: { mode: string };
  leaderboard_toggle: { enabled: boolean };
  parent_report_toggle: { enabled: boolean };

  // ── Progress ──────────────────────────────────────────────────────────
  progress_page_viewed: Record<string, never>;

  // ── Leaderboard ───────────────────────────────────────────────────────
  leaderboard_viewed: Record<string, never>;
  leaderboard_opted_in: Record<string, never>;

  // ── Planner ───────────────────────────────────────────────────────────
  planner_page_viewed: Record<string, never>;
  planner_block_clicked: { block_type: string };
  planner_add_block_clicked: Record<string, never>;
  planner_block_added: { block_type: string; duration_minutes: number };
  planner_block_edited: { block_type: string; duration_minutes: number };
  planner_block_deleted: { block_type: string };
  planner_plan_reset: { date: string };

  // ── Notes ─────────────────────────────────────────────────────────────
  notes_page_viewed: Record<string, never>;

  // ── Calendar ──────────────────────────────────────────────────────────
  calendar_page_viewed: Record<string, never>;

  // ── Timer ─────────────────────────────────────────────────────────────
  timer_page_viewed: Record<string, never>;

  // ── Parent Report ─────────────────────────────────────────────────────
  parent_report_page_viewed: Record<string, never>;
  parent_report_shared: { method: string };

  // ── Credits ───────────────────────────────────────────────────────────
  out_of_credits: { activity: string; cost: number; credits_remaining: number };

  // ── Coach ─────────────────────────────────────────────────────────────
  coach_page_viewed: Record<string, never>;
  coach_banner_clicked: { page: string };
  coach_message_sent: { source: string; message_content: string; message_length: number; is_quick_prompt: boolean };

  // ── What's New ────────────────────────────────────────────────────────
  whats_new_dismissed: { updates_shown: number };

  // ── Papers ────────────────────────────────────────────────────────────
  papers_page_viewed: Record<string, never>;
  papers_show_all_toggled: { show_all: boolean };
  paper_solved: { paper_id: string; subject?: string; year?: number; type?: string };
  paper_unsolved: { paper_id: string; subject?: string; year?: number; type?: string };

  // ── Pageview (PostHog built-in) ───────────────────────────────────────
  $pageview: { $current_url: string };

  // ── Subjects / Chapters ───────────────────────────────────────────────
  chapter_status_changed: { subject: string; chapter: string; from_status: string; to_status: string };

  // ── Timer (engine) ────────────────────────────────────────────────────
  timer_started: { subject: string; chapter: string; duration_minutes: number; preset: string };
  timer_completed: { subject: string; chapter: string; duration_minutes: number };

  // ── Milestones ────────────────────────────────────────────────────────
  milestone_celebrated: { type: string; subject?: string; chapter?: string; value?: number; category?: string };

  // ── Streak ────────────────────────────────────────────────────────────
  streak_recovered: { restored_streak: number };
}

/** Union of all event names */
export type AnalyticsEvent = keyof AnalyticsEventMap;

/** Properties required for a given event */
export type EventProperties<E extends AnalyticsEvent> = AnalyticsEventMap[E];
