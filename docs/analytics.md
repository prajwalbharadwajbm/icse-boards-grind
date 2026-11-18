# Analytics Guide

## Overview

All analytics go through a typed wrapper around PostHog (`src/lib/analytics.ts`). Direct `posthog-js` imports are blocked by ESLint in `src/app`, `src/components` and `src/hooks`; every consumer uses `@/lib/analytics`.

PostHog runs with `autocapture: false` and `capture_pageview: false`, so only the events listed below are sent, plus `$pageview` (sent by `PostHogPageview` on every route change), `$exception` (`capture_exceptions: true`) and session recordings (inputs are masked by posthog-js by default).

## Adding a New Event

**Step 1:** Add the event to `src/lib/analytics-events.ts`:

```ts
export interface AnalyticsEventMap {
  // ...existing events...
  my_new_event: { some_prop: string; count: number };
}
```

**Step 2:** Call `capture()` in your component:

```ts
import { capture } from "@/lib/analytics";

capture("my_new_event", { some_prop: "value", count: 42 });
```

TypeScript enforces that the properties match the event map. If you pass the wrong properties or misspell an event name, you get a compile error.

For events with no properties, use `Record<string, never>` in the event map and call `capture("my_page_viewed")`.

**Step 3:** Add the event to the catalog at the bottom of this file.

## Rules

1. **Never import `posthog-js` directly.** ESLint will error. Always use `import { capture } from "@/lib/analytics"`.
2. **Every page needs a `page_viewed` event.** The `local/require-analytics` ESLint rule warns if a page component doesn't import `capture`.
3. **Add events to the event map first.** The typed `capture()` function won't accept unknown events.
4. **Naming:** `area_object_action` in snake_case, past tense (`planner_block_added`, `jc_quiz_completed`). Page views are `<page>_page_viewed`.
5. **No personal data in event properties.** No names, emails, phone numbers or free text a student typed. Use ids, keys, counts and enums. (`coach_message_sent.message_content` is the one existing exception; see Privacy.)

## Properties on Every Event

`capture()` merges these into every event it sends. Event properties with the same name win.

| Property | Example | Source |
| --- | --- | --- |
| `exam_year` | `2027` | `EXAM_YEAR` in `src/lib/constants.ts` |
| `onboarded` | `true` | store |
| `language` | `"kannada"` | store `selectedLanguage`, `null` until onboarded |
| `elective` | `"computer"` | store `selectedElective`, `null` until onboarded |
| `days_to_next_paper` | `93` | days from today to the student's next paper (core papers only before onboarding), `null` once all papers are over |
| `next_paper` | `"english_lang"` | subject key of that paper |
| `is_pwa` | `false` | `display-mode: standalone` (installed app) |

`PostHogProvider` feeds the store values in through `setAnalyticsContext()`. `exam_year`, `onboarded`, `language` and `elective` are also registered as PostHog super properties so `$exception` events carry them.

## Identity

- `PostHogProvider` waits for Firebase auth to settle, then calls `identify(user.uid, …)`. The PostHog `distinct_id` of a signed-in student is their **Firebase uid**.
- Person properties: `email`, `name` (Firebase display name), `exam_year`, `onboarded`, `language`, `elective`, and `signed_up_at` (`$set_once`, from Firebase account creation time).
- Signed-out visitors keep one anonymous id across page loads. Their events (for example `login_page_viewed`, `login_started`, `user_signed_up`) are merged into the student's person on the first `identify`.
- `reset()` only resets PostHog when the browser is still identified (after logout, or a stale identity), so the anonymous id is not regenerated on every load.

## Internal and Demo Traffic

Admin/internal emails are listed in `INTERNAL_EMAILS` (exported from `@/lib/analytics`). For these users:

- `capture()` silently skips sending events
- `identify()` calls `posthog.opt_out_capturing()`, which also stops `$exception` events and session recordings on that browser, and persists until a non-internal user signs in there
- `user_signed_up` is not sent for them

`/preview/*` renders the dashboard with demo data, so `capture()` sends nothing on those routes.

The same `INTERNAL_EMAILS` list is used by the admin page for access control.

## Privacy

What leaves the browser today:

- Person properties `email` and `name` (set on `identify`)
- `coach_message_sent.message_content`: the full text of each AI coach message the student types. This is free text from minors and can contain anything; consider dropping it and keeping `message_length` and `is_quick_prompt`.
- Session recordings (inputs masked by default)
- `$current_url`, which on `/report` contains the student's uid

Nothing else added here sends names, emails or typed text.

## Key Funnels

**Acquisition and activation**

```
login_page_viewed
  → login_started({ method })
    → user_signed_up({ method })      (new accounts only)
    → user_logged_in({ method })
      → onboarding_started
        → onboarding_step_completed({ step: 1..9, step_name })
          → onboarding_completed
            → dashboard_viewed
              → timer_started
                → timer_completed({ is_first_session: true })   ← activation
```

**Retention:** use PostHog retention on `timer_completed` (studied) or `dashboard_viewed` (came back) as the returning event, with `onboarding_completed` or `timer_completed` where `is_first_session = true` as the start event.

**Parent loop:** `parent_report_toggle({ enabled: true })` → `parent_report_shared({ method })` → `parent_report_opened({ status: "ok" })` (from the parent's browser, usually anonymous).

**Notifications:** `notification_permission_result` → `notification_shown({ type })` → `notification_clicked({ type, via })` → `timer_started`.

**Example journey: English grammar drill**

```
english_page_viewed
  → english_tab_changed({ tab: "grammar" })
    → grammar_category_selected({ category: "tenses" })
      → grammar_question_generated({ category: "tenses" })
        → grammar_question_answered({ category: "tenses", correct: true })
          → (next question OR grammar_back_to_categories)
```

## Event Catalog

### Auth

| Event | Properties | Where |
| --- | --- | --- |
| `login_page_viewed` | | `/login` mount |
| `login_started` | `method` | sign-in button pressed |
| `user_signed_up` | `method` | `AuthProvider`, first sign-in of a new Firebase account |
| `user_logged_in` | `method` | sign-in succeeded |
| `login_failed` | `method`, `error` (Firebase error code) | sign-in failed or popup closed |
| `user_logged_out` | | `AuthProvider.logout` |

### Onboarding

| Event | Properties |
| --- | --- |
| `onboarding_started` | |
| `onboarding_step_completed` | `step` (1-9), `step_name` (`name`, `language`, `elective`, `learning_style`, `study_hours`, `subject_confidence`, `target_percent`, `prep_level`, `routine`), `total_steps` |
| `onboarding_completed` | `language`, `elective`, `group_two` (sorted, comma-separated Group II keys, e.g. `economics,commercial`), `learning_style`, `study_hours`, `target_percent`, `prep_level` |

### Page views

`dashboard_viewed`, `subjects_page_viewed`, `english_page_viewed`, `settings_page_viewed`, `progress_page_viewed`, `leaderboard_viewed`, `planner_page_viewed`, `notes_page_viewed`, `calendar_page_viewed`, `timer_page_viewed`, `parent_report_page_viewed`, `coach_page_viewed`, `papers_page_viewed`, plus `$pageview` (`$current_url`) on every route.

### Study: timer, subjects, streaks

| Event | Properties |
| --- | --- |
| `timer_started` | `subject`, `chapter`, `duration_minutes`, `preset` (fires on every Start on the timer page, including resuming) |
| `timer_paused` | `phase`, `seconds_left`, `total_seconds` (timer page or sidebar mini timer) |
| `timer_reset` | `phase`, `seconds_left`, `total_seconds` (only when the timer had run) |
| `timer_add_chapters_clicked` | `subject` (the "Add your own chapters" link under an empty Chapter list) |
| `timer_completed` | `subject`, `chapter`, `duration_minutes`, `session_number`, `is_first_session`, `streak`, `hours_today` |
| `chapter_status_changed` | `subject`, `chapter`, `from_status`, `to_status` |
| `milestone_celebrated` | `type`, `subject?`, `chapter?`, `value?`, `category?` |
| `streak_recovered` | `restored_streak` |
| `weak_area_clicked` | `type`, `subject?`, `category?`, `subjectKey?` |

### Planner

`planner_block_clicked` (`block_type`), `planner_add_block_clicked`, `planner_block_added` / `planner_block_edited` (`block_type`, `duration_minutes`), `planner_block_deleted` (`block_type`), `planner_plan_reset` (`date`).

### AI coach and credits

| Event | Properties |
| --- | --- |
| `coach_banner_clicked` | `page` |
| `coach_message_sent` | `source`, `message_content`, `message_length`, `is_quick_prompt` |
| `coach_response_received` | `response_length`, `plan_change_count`, `duration_ms` |
| `coach_response_failed` | `error` (first 200 chars), `duration_ms` |
| `coach_plan_changes_applied` | `change_count` |
| `coach_briefing_loaded` | `trigger` (`auto` / `refresh`), `duration_ms` |
| `coach_briefing_failed` | `trigger`, `error` |
| `out_of_credits` | `activity`, `cost`, `credits_remaining` |

### Practice papers

`papers_show_all_toggled` (`show_all`), `paper_opened` (`paper_id`, `subject`, `year`, `type`, `source`: outbound click on the title), `paper_solved` / `paper_unsolved` (`paper_id`, `subject?`, `year?`, `type?`).

### English

- Tabs: `english_tab_changed` (`tab`), `jc_sub_tab_changed` (`sub_tab`)
- Grammar drill: `grammar_category_selected`, `grammar_question_generated`, `grammar_question_failed` (`error`), `grammar_question_answered` (`correct`), `grammar_back_to_categories`
- Julius Caesar: `jc_scene_expanded`, `jc_scene_video_played`, `jc_flashcard_flipped`, `jc_flashcard_review_changed`, `jc_quiz_question_answered`, `jc_quiz_completed` (`score`, `total`, `percentage`), `jc_quiz_retake`, `jc_quote_answered`, `jc_quote_reset`, `jc_character_quotes_expanded`, `jc_line_by_line_scene_selected`, `jc_line_by_line_status_changed`
- Poems: `poem_selected`, `poem_study_mode_changed`, `poem_stanza_status_changed`, `poem_qa_revealed`, `poem_mcq_answered`, `poem_mcq_completed`
- Prose: `prose_selected`, `prose_study_mode_changed`, `prose_passage_status_changed`, `prose_qa_revealed`, `prose_mcq_answered`, `prose_mcq_completed`

### Parent report

| Event | Properties |
| --- | --- |
| `parent_report_toggle` | `enabled` (settings or parent report page) |
| `parent_report_shared` | `method`: `whatsapp`, `email`, `copy_link` |
| `parent_report_opened` | `status`: `ok`, `not_shared`, `not_found`, `missing_uid`, `error` (public `/report` page) |

### Notifications

| Event | Properties |
| --- | --- |
| `notification_permission_result` | `result` (`granted` / `denied` / `default` / `unsupported`), `source` (`auto_prompt` on dashboard load, `settings` button) |
| `notification_shown` | `type`: `study_start`, `study_reminder`, `exam_alert`, `revision_due`, `exam_countdown`, `daily_goal`, `morning_kickoff`, `evening_nudge`, `streak_risk`, `timer_work_done`, `timer_break_done`, `chapter`, `streak`, `grammar`, `other` |
| `notification_clicked` | `type`, `via` (`page` for in-tab notifications, `service_worker` when opened through `sw.js` with `?from=notification`) |
| `notification_prefs_saved` | one boolean per preference, `reminder_minutes` |

### Settings, leaderboard, what's new

`settings_saved` (`study_hours`, `target_percent`, `has_grok_key`), `language_changed` (`new_language`), `elective_changed` (`new_elective`), `group_two_changed` (`group_two`: sorted, comma-separated Group II keys), `data_exported`, `data_imported` (`mode`), `leaderboard_toggle` (`enabled`), `leaderboard_opted_in`, `whats_new_dismissed` (`updates_shown`).

## Querying with Claude (PostHog MCP)

The PostHog MCP server is configured for this repo in `.mcp.json` (project scope) as `posthog`, pointing at `https://mcp.posthog.com/mcp?readonly=true`. It holds no secret: it signs in with OAuth, and Claude Code keeps the token in its own credential store (the macOS Keychain), not in the repo. Read-only mode hides every tool that creates, edits or deletes PostHog data. Remove `?readonly=true` to let Claude create insights or dashboards.

To connect: run `claude` in this folder, type `/mcp`, pick `posthog`, and sign in to PostHog in the browser. PostHog routes the session to the right region (EU or US) from the account.

If you prefer a personal API key: create one at PostHog → Settings → Personal API keys with the **MCP Server** preset, export it as `POSTHOG_PERSONAL_API_KEY` in your shell (never in a committed file), and add `"headers": { "Authorization": "Bearer ${POSTHOG_PERSONAL_API_KEY}" }` to the `posthog` entry in `.mcp.json`.

## CI Enforcement

PRs to `main` run two checks (`.github/workflows/ci.yml`):

1. **Lint**: catches direct `posthog-js` imports and pages missing analytics
2. **Type Check**: catches wrong event names or properties via the typed `capture()` function
