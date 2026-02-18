# Analytics Guide

## Overview

All analytics go through a typed wrapper around PostHog. Direct `posthog-js` imports are blocked by ESLint — every consumer must use `@/lib/analytics`.

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

TypeScript will enforce that the properties match the event map. If you pass the wrong properties or misspell an event name, you'll get a compile error.

For events with no properties, use `Record<string, never>` in the event map:

```ts
my_page_viewed: Record<string, never>;
```

Then call it without properties:

```ts
capture("my_page_viewed");
```

## Rules

1. **Never import `posthog-js` directly.** ESLint will error. Always use `import { capture } from "@/lib/analytics"`.
2. **Every page needs a `page_viewed` event.** The `local/require-analytics` ESLint rule warns if a page component doesn't import `capture`.
3. **Add events to the event map first.** The typed `capture()` function won't accept unknown events.

## Internal User Filtering

Admin/internal emails are listed in `INTERNAL_EMAILS` (exported from `@/lib/analytics`). For these users:

- `capture()` silently skips sending events
- `posthog.opt_out_capturing()` is called in the PostHogProvider, which also stops autocapture and session recordings

This means internal testing never pollutes production analytics.

The same `INTERNAL_EMAILS` list is used by the admin page for access control.

## Example Journey: English Grammar Drill

```
english_page_viewed
  → english_tab_changed({ tab: "grammar" })
    → grammar_category_selected({ category: "tenses" })
      → grammar_question_generated({ category: "tenses" })
        → grammar_question_answered({ category: "tenses", correct: true })
          → (next question OR grammar_back_to_categories)
```

## CI Enforcement

PRs to `main` run two checks (`.github/workflows/ci.yml`):

1. **Lint** — catches direct `posthog-js` imports and pages missing analytics
2. **Type Check** — catches wrong event names or properties via the typed `capture()` function
