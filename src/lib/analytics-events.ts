/**
 * Typed analytics event map.
 * To add a new event: add an entry here, then call capture() — TypeScript
 * will enforce the correct properties at every call site.
 */

export interface AnalyticsEventMap {
  // ── Auth ──────────────────────────────────────────────────────────────
  login_page_viewed: Record<string, never>;
  login_started: { method: string };
  user_logged_in: { method: string };
  /** Fired once, the first time a Firebase account is created. */
  user_signed_up: { method: string };
  login_failed: { method: string; error: string };
  user_logged_out: Record<string, never>;

  // ── Onboarding ────────────────────────────────────────────────────────
  onboarding_started: Record<string, never>;
  onboarding_step_completed: { step: number; step_name: string; total_steps: number };
  onboarding_completed: {
    language: string;
    elective: string;
    group_two: string;
    learning_style: string;
    study_hours: number;
    target_percent: number;
    prep_level: string;
    avatar: string;
    study_vibe: string;
  };
  /** A sticker avatar and study vibe chosen in onboarding or changed in Settings */
  identity_picked: { avatar: string; study_vibe: string; source: "onboarding" | "settings" };

  // ── Dashboard ─────────────────────────────────────────────────────────
  dashboard_viewed: Record<string, never>;
  first_session_card_viewed: { subject: string; reason: "plan_now" | "plan_next" | "weak" | "next_paper" };
  first_session_card_clicked: { action: "timer" | "chapters"; subject: string; reason: "plan_now" | "plan_next" | "weak" | "next_paper" };
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
  poem_mcq_answered: { poem_id: string; question_id: string; correct: boolean };
  poem_mcq_completed: { poem_id: string; score: number; total: number; percentage: number };

  // ── Prose ───────────────────────────────────────────────────────────────
  prose_selected: { prose_id: string; title: string };
  prose_study_mode_changed: { prose_id: string; mode: string };
  prose_passage_status_changed: { prose_id: string; passage_index: number; status: string };
  prose_qa_revealed: { prose_id: string; question_index: number };
  prose_mcq_answered: { prose_id: string; question_id: string; correct: boolean };
  prose_mcq_completed: { prose_id: string; score: number; total: number; percentage: number };

  // ── Settings ──────────────────────────────────────────────────────────
  settings_page_viewed: Record<string, never>;
  settings_saved: { study_hours: number; target_percent: number; has_grok_key: boolean };
  /** Group II subjects changed in Settings, e.g. "economics,commercial" */
  group_two_changed: { group_two: string };
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
  parent_report_shared: { method: "whatsapp" | "email" | "copy_link" };
  /** Public /report page, usually opened by a parent from a shared link. */
  parent_report_opened: { status: "ok" | "not_shared" | "not_found" | "missing_uid" | "error" };

  // ── Credits ───────────────────────────────────────────────────────────
  out_of_credits: { activity: string; cost: number; credits_remaining: number };

  // ── Coach ─────────────────────────────────────────────────────────────
  coach_page_viewed: Record<string, never>;
  coach_banner_clicked: { page: string };
  coach_message_sent: { source: string; message_content: string; message_length: number; is_quick_prompt: boolean };
  coach_response_received: { response_length: number; plan_change_count: number; duration_ms: number };
  coach_response_failed: { error: string; duration_ms: number };
  coach_plan_changes_applied: { change_count: number };
  coach_briefing_loaded: { trigger: "auto" | "refresh"; duration_ms: number };
  coach_briefing_failed: { trigger: "auto" | "refresh"; error: string };

  // ── What's New ────────────────────────────────────────────────────────
  whats_new_dismissed: { updates_shown: number };

  // ── Papers ────────────────────────────────────────────────────────────
  papers_page_viewed: Record<string, never>;
  papers_show_all_toggled: { show_all: boolean };
  paper_solved: { paper_id: string; subject?: string; year?: number; type?: string };
  paper_unsolved: { paper_id: string; subject?: string; year?: number; type?: string };
  /** Outbound click on a paper's title (opens the PDF source in a new tab). */
  paper_opened: { paper_id: string; subject: string; year: number; type: string; source: string };

  // ── Pageview (PostHog built-in) ───────────────────────────────────────
  $pageview: { $current_url: string };

  // ── Subjects / Chapters ───────────────────────────────────────────────
  chapter_status_changed: { subject: string; chapter: string; from_status: string; to_status: string };

  // ── Timer (engine) ────────────────────────────────────────────────────
  timer_started: { subject: string; chapter: string; duration_minutes: number; preset: string };
  timer_completed: {
    subject: string;
    chapter: string;
    duration_minutes: number;
    /** 1 for the student's first ever completed session: the activation moment. */
    session_number: number;
    is_first_session: boolean;
    streak: number;
    hours_today: number;
  };
  timer_paused: { phase: string; seconds_left: number; total_seconds: number };
  timer_reset: { phase: string; seconds_left: number; total_seconds: number };
  timer_add_chapters_clicked: { subject: string };

  // ── Milestones ────────────────────────────────────────────────────────
  milestone_celebrated: { type: string; subject?: string; chapter?: string; value?: number; category?: string };

  // ── Streak ────────────────────────────────────────────────────────────
  streak_recovered: { restored_streak: number };

  // ── Notifications ─────────────────────────────────────────────────────
  notification_permission_result: { result: string; source: "auto_prompt" | "settings" };
  notification_shown: { type: string };
  notification_clicked: { type: string; via: "page" | "service_worker" };
  notification_prefs_saved: {
    study_reminders: boolean;
    exam_alerts: boolean;
    revision_due: boolean;
    break_reminders: boolean;
    milestones: boolean;
    daily_goal_alerts: boolean;
    reminder_minutes: number;
  };
}

/** Union of all event names */
export type AnalyticsEvent = keyof AnalyticsEventMap;

/** Properties required for a given event */
export type EventProperties<E extends AnalyticsEvent> = AnalyticsEventMap[E];
