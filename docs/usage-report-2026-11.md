# Usage report: ICSE Boards Grind, Feb to Nov 2026

Pulled on 14 Nov 2026 through the PostHog MCP server: EU Cloud, organization `icse-grind`, project 126388, the same project the live site sends to. All figures are people (PostHog persons) unless marked as events.

**Scope and caveats**

- **Only real production traffic:** host `icse-boards-grind.vercel.app` and not `/preview`. Excluded: localhost (1,080 events, 32 people), an ngrok tunnel, and Vercel preview deploys.
- **Signed-out visitors are over-counted.** Until this change, the app reset PostHog's anonymous id on every page load, so "people who opened /login" (762, from 928 views) is close to "login page loads". The sign-in rate below is therefore a floor. Fixed in `src/providers/posthog-provider.tsx`, effective once deployed.
- **New events aren't in this data yet.** Everything added in this change (timer pause and reset, `paper_opened`, coach replies, notifications, `parent_report_opened`, `days_to_next_paper` and the other shared properties) starts arriving after the next deploy.

## What students actually do

**Traffic is a single launch spike.** 632 people were active in Feb 2026, with weekly actives at 374 and 274 in the two weeks before the 2026 papers started. Then:

- Weekly actives fell to 49 by the week of 23 Feb, while the exams were still running.
- Since April it has hovered at 5 to 20 a week.
- Last 30 days: 1 to 5 active a day, 44 people in total, 23 sign-ins, 9 new students onboarded.

**Funnel** (all time, distinct people, not strictly ordered):

| Step | People | Rate |
| --- | --- | --- |
| Opened `/login` (over-counted) | 762 | |
| Signed in | 216 | 28% of login visitors, a floor |
| Started onboarding (step 1) | 126 | |
| Finished onboarding | 118 | 94% of starters |
| Reached the dashboard | 185 | includes returning students |
| Started a study timer | 28 | 24% of onboarded |
| Completed a timer session | 5 | 4% of onboarded |

- **Onboarding is not the problem.** 126 → 120 people get through steps 1 to 8, and the median time from step 1 to done is 1 min 50 s.
- **Activation is the problem.** The timer loop works for almost nobody: 139 starts but only 32 completions, and the last `timer_completed` was recorded on 3 Aug even though starts kept coming until 12 Nov.

**Retention of the 118 onboarded students:**

| Came back | People |
| --- | --- |
| Next day | 14 (12%) |
| Within 7 days | 28 (24%) |
| Days 8 to 30 | 12 (10%) |
| After day 30 | 6 (5%) |
| Active on 5 or more days | 8 (7%) |
| Active on 15 or more days | 0 |

The biggest cohort, the 56 students who onboarded in the week of 8 Feb, kept 13 in week 1, 5 in week 2, and 1 or 2 after that.

**Feature usage** (all time; 185 people reached the dashboard):

| Feature | People | Depth |
| --- | --- | --- |
| AI coach | 116 | 53 sent a message, 28 sent 3 or more. Quick prompts: 39 people, typed messages: 35 |
| Practice papers | 108 | 19 marked a paper solved |
| English hub | 104 | Julius Caesar 68 (flashcards 64), grammar drill 29, prose 18, poems 14 |
| Subjects | 87 | 84 of them hit a crash on this page; 6 ever changed a chapter's status |
| Planner | 76 | 8 added a block |
| Notes | 68 | |
| Progress | 65 | |
| Calendar | 59 | |
| Timer | 53 | 28 started, 5 completed |
| Leaderboard | 31 | |
| Parent report | 26 | 9 turned sharing on, 1 shared (WhatsApp), 4 opened `/report` |

**What returning students use.** 31 onboarded students came back on a later day. They opened the dashboard (26), English (19), the coach, papers and planner (15 each), subjects and notes (14 each) and the timer (14). 12 of the 31 hit an error on those later days.

**Who the students are:**

- **Device:** desktop 498, mobile 460, tablet 41. Android is the biggest OS with 426.
- **Second language:** Hindi 71 of 118 (60%), Kannada 18, Bengali 11.
- **Elective:** Computer Applications 86 (73%), Physical Education 17.
- **Plans:** students aim for 95.8% on average and plan 7.3 study hours a day.
- **Learning style:** 106 picked "Mixed", which is the default answer.

**Errors:**

- **Subjects page crash.** React error #185 ("Maximum update depth exceeded") accounts for 271 of the 335 exceptions. Every one is on `/dashboard/subjects`, and it has recurred every month since February.
- **Grammar generation failures.** 33 of 420 attempts failed (8%): API 400 "invalid argument" 19, 429 rate limit 9, 403 permission 5.
- **Sign-in failures:**
  - Popup closed by the user: 22 (20 people)
  - Invalid credential: 27, from the old email and password form
  - Popup blocked: 6
  - Network error: 6

## Five improvements, in order

1. **Fix the Subjects crash.** It hits almost everyone who opens the page.
   - **Cause:** `src/components/subjects/subject-card.tsx:18` selects `s.subjects[subjectKey] || []`. The store only seeds chapters for Kannada and Computer Applications (`DEFAULT_CHAPTERS` in `src/lib/constants.ts`), and nothing adds chapters for the language and elective a student picks. For a Hindi student the selector returns a new empty array on every render, and Zustand keeps re-rendering until React throws #185.
   - **Fix, part 1:** use a stable empty array in the selector.
   - **Fix, part 2:** seed `getDefaultChapters(language, elective)` when onboarding finishes and whenever the language or elective changes, so Hindi students get Hindi chapters.
   - **Measure:** `$exception` on `/dashboard/subjects` should go to zero, and `chapter_status_changed` should rise from 6 people.

2. **Fix the timer and make the first session the next step after onboarding.**
   - **Problem:** completions stopped being recorded after 3 Aug, and only 5 people have ever finished a session. The end-timestamp rewrite in progress in the redesign session addresses the broken countdown.
   - **Change:** after onboarding, open on a single "Start a 25-minute session on <weakest subject>" action instead of the full dashboard.
   - **Activation metric:** `timer_completed` with `is_first_session = true`, as a share of `onboarding_completed`. Aim for 30% or more.

3. **Give students a reason to come back tomorrow.**
   - **Problem:** 12% return the next day and nobody has 15 active days. Today's reminders are `setTimeout` notifications in the open tab (`scheduleNotification` in `src/lib/push-notifications.ts`), so they never reach a student who closed the app.
   - **Change:** add real web push through Firebase Cloud Messaging and the existing service worker. Send one message a day, such as "today's plan, 93 days to English Language", at the routine time students already enter in onboarding.
   - **Measure:** `notification_shown` → `notification_clicked` → `timer_started`, and next-day retention.

4. **Put the coach, papers and Julius Caesar flashcards front and centre.**
   - **Why:** these are the most used features, while grammar, poems, prose, the leaderboard and parent sharing each reach under 30 people.
   - **Coach:** show two or three quick prompts on the dashboard; quick prompts already bring in as many people as typed messages.
   - **Papers:** `paper_opened` now records the click. Ask "did you finish it?" when the student comes back, since only 19 of 108 visitors ever mark a paper solved.
   - **AI failures:** fix the 8% of grammar generations that fail with provider 400, 429 and 403 errors; the credits and AI hardening session is the right place for this.
   - **Long tail:** hold new work on the low-use features until the core loop keeps students.

5. **Start the 2027 push now, aimed at phones.**
   - **Timing:** the 2026 cohort arrived one week before the first paper and dropped about 85% within two weeks. The 2027 papers start on 15 Feb 2027, 93 days from now.
   - **Audience:** half of visitors are on a phone and most students take Hindi and Computer Applications.
   - **Sign-in on phones:** test sign-in from a WhatsApp or Instagram link, and fall back to `signInWithRedirect` when the Google popup is blocked or closed.
   - **Measure:** `login_page_viewed` → `user_logged_in` by device. With the anonymous-id fix deployed this becomes a reliable rate.

## Re-running these numbers

Ask Claude in this repo, for example "using the posthog MCP, rerun the funnel and retention in docs/usage-report-2026-11.md". The server is set up in `.mcp.json`; see `docs/analytics.md` → "Querying with Claude".

Every query applies the production filter `properties.$host = 'icse-boards-grind.vercel.app' AND coalesce(properties.$current_url, '') NOT LIKE '%/preview%'`. Setting the same rule as PostHog's "filter test accounts" in project settings would apply it to the PostHog dashboards as well.
