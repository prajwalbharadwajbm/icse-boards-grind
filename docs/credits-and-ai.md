# Credits and the AI coach

How AI features and credits work on the server, and what to set up before launch.

## Why this is on the server

Before this change the site was a static export, so everything ran in the browser:

- The shared Groq and xAI keys were in `NEXT_PUBLIC_FREE_AI_KEYS`, which Next.js bundles into the JavaScript every visitor downloads. Anyone could copy them out of the page.
- Credits were deducted by the browser writing a new balance to Firestore. Any check lived in Firestore rules that are not in this repo.
- The public parent report read the student's whole `users/{uid}` document, which includes their email, coach chat history and, if they added one, their own AI key.

Now the app runs as a normal Next.js app on Vercel (`output: "export"` is gone from `next.config.ts`), and these paths go through API routes that run as Vercel Functions.

## Request flow

```
browser ──ID token──▶ /api/ai ──▶ check limits (aiUsage/{uid})
                               ──▶ charge credits if the feature costs any (users/{uid}.credits + ledger)
                               ──▶ Groq / xAI with a server-held key (AI_API_KEYS),
                                   then Gemini if they all fail (AI_FALLBACK_API_KEYS)
                               ◀── streamed reply (coach) or { text } (briefing, grammar)
```

Every route verifies the Firebase ID token the browser sends in `Authorization: Bearer <token>` (`src/server/auth.ts`). The browser side is `src/lib/api-client.ts` (`apiFetch`, `apiJson`).

### `POST /api/ai`

Body: `{ purpose: "coach" | "briefing" | "grammar", messages: [{ role, content }] }`

1. `validateAIRequest` (`src/server/ai-request.ts`) checks the purpose, at most 41 messages, at most 12,000 characters per message and 60,000 in total, a system prompt only as the first message, and that the last message is the student's.
2. `consumeAIQuota` (`src/server/quota.ts`) counts the request against the student's limits in `aiUsage/{uid}` inside a transaction. Over the limit returns `429` with `daily_limit` or `rate_limited` and a `retryAfterSeconds`.
3. If the feature has a credit cost, `spendCredits` charges it.
4. `callAIProvider` (`src/server/ai-provider.ts`) calls the provider with a key from `AI_API_KEYS`, shuffled, then the keys in `AI_FALLBACK_API_KEYS` in order. The key's prefix picks the provider (`providerOf`): `gsk_` goes to Groq (`openai/gpt-oss-120b`), `AIza` or `AQ.` to Gemini (`gemini-3.8-flash`, free tier, through its OpenAI-compatible endpoint), anything else to xAI (`grok-3-mini`). The request body comes from `chatCompletionRequest` (`src/lib/ai-provider-config.ts`).
   - **Groq requests are trimmed to fit.** Groq's free tier allows 8,000 tokens a minute for this model, counting the prompt plus `max_completion_tokens`, and refuses any single request over that with a `413`. Each Groq request is kept to a 6,000-token budget: the system prompt and the newest message always stay, and the oldest turns are dropped first. The estimate errs high: about 3.5 characters per token for English, one per character for Kannada, Hindi and other scripts.
   - **A `413` is retried once, shortened.** If Groq still answers `413`, the same key gets the system prompt and the newest message only. That first `413` is logged as a warning. If even the short request is too large, the chat goes whole to the next provider (Gemini's context is far bigger); only if none answers does the student get `400 message_too_long`.
   - **On a `429` or `5xx` it tries the next key.** Any other `4xx` (a retired model, a bad key) skips the rest of that provider's keys and goes to the next provider. Gemini and xAI requests are never trimmed.
   - **Gemini is the fallback only.** Its keys are tried after every main key failed, so a working Groq never sends chats to Google. Google's free tier may use what is sent to improve its products, with human review, and the Gemini API terms say it is not for apps likely to be used by under-18s.
   - **If every key fails,** the request is given back to the quota and any credits are refunded.

   The 8,000 tokens a minute are shared by every request on the Groq account, so a second large request in the same minute can get a `429`, which the student sees as "The AI coach is busy right now".
5. The coach streams the provider's server-sent events straight through; the briefing and grammar drill get `{ text }`. The response carries `X-AI-Remaining-Today`.

A student who adds their own API key in Settings skips the server: `src/lib/ai-service.ts` calls the provider directly with their key, with no limits and no credits. It builds the request with the same `chatCompletionRequest`, so a student's own Groq key gets the same trimming, but not the `413` retry.

### Limits and costs: `src/lib/ai-policy.ts`

| Feature | Per day | Per minute | Max tokens | Credits |
| --- | --- | --- | --- | --- |
| Coach (`coach`) | 40 | 6 | 1,200 | 0 |
| Daily briefing (`briefing`) | 3 | 2 | 600 | 0 |
| Grammar question (`grammar`) | 100 | 12 | 700 | 0 |

Daily limits reset at midnight India time (`istDay` in `src/server/usage-window.ts`). The per-minute window is the current UTC minute.

The coach stays free, as it was, but is now capped at 40 messages a day. To charge for it, set `cost` in `AI_POLICY`; the route charges before calling the provider and refunds if the provider fails.

Grammar questions are generated for free within the limit. Answering one still costs 25 credits (`mcq`) through `/api/credits`, as before.

### `GET /api/credits` and `POST /api/credits`

- `GET` returns `{ credits }`. A student with no balance yet gets `DEFAULT_CREDITS` (1,500) and a `welcome` ledger row. The browser calls this after sign-in (`refreshCredits` in `src/hooks/use-credits.ts`).
- `POST { activity, count }` charges `CREDIT_COSTS[activity] × count` (`src/lib/credits.ts`; `count` is 1 to 20) and returns the new `{ credits }`. A balance that is too low returns `402 insufficient_credits` with the current `credits`.

`useCredits().deduct()` lowers the balance on screen right away, then replaces it with the server's figure, or rolls it back if the request fails. Callers are unchanged: it still returns `true` or `false`.

### The ledger

Every change to `users/{uid}.credits` happens in a Firestore transaction in `src/server/credits.ts` and writes a row to `users/{uid}/creditLedger/{id}`:

```
{ delta, balanceAfter, reason, by?, meta?, at }
```

Reasons are `welcome`, an activity name (`mcq`, `poem_qa`, …), `ai:<purpose>`, `refund:<reason>`, or `admin:add` / `admin:set`. Students can read their own ledger; nobody can write it from the browser.

### `GET /api/report/:uid`

The public parent report. It returns only `name`, `avatar`, `streak`, `studyLog`, `subjects`, `selectedLanguage`, `selectedElective` and `groupTwo`, and only while the student has sharing turned on (`403 not_shared` otherwise). No sign-in needed.

### Admin: `GET /api/admin/users` and `POST /api/admin/credits`

Only for verified emails listed in `ADMIN_EMAILS`, checked on the server. The user list leaves out students' own AI keys and coach chats. `POST { target: uid | "all", mode: "add" | "set", amount }` changes balances through the same ledger, recording who made the change. The `/admin` page still hides itself from non-admins in the browser, but the server is what enforces it.

## Before launch

### 1. Vercel environment variables

Set these in Vercel → Project → Settings → Environment Variables (Production and Preview). `.env.example` lists them all.

| Variable | What it is |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Firebase console → Project settings → Service accounts → Generate new private key. Paste the JSON base64-encoded: `base64 -i key.json \| tr -d '\n'`. |
| `AI_API_KEYS` | Comma-separated Groq (`gsk_…`) and/or xAI keys. |
| `AI_FALLBACK_API_KEYS` | Optional. Comma-separated Gemini keys (`AIza…` or `AQ.…`), used only when every `AI_API_KEYS` key fails. |
| `ADMIN_EMAILS` | Comma-separated emails allowed into `/admin`. |

Instead of the base64 JSON you can set `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL` and `FIREBASE_ADMIN_PRIVATE_KEY`. Without credentials the API routes return `503 server_not_configured`; the rest of the app still loads.

### 2. Rotate the old AI keys

Delete `NEXT_PUBLIC_FREE_AI_KEYS` from Vercel. The keys in it were shipped in every visitor's browser, so treat them as public: revoke them in the Groq and xAI consoles and put new keys in `AI_API_KEYS`. Do this after the new deployment is live, so the coach keeps working during the switch.

### 3. Deploy the Firestore rules

`firestore.rules` is now in the repo (`firebase.json` already points at it):

```bash
firebase deploy --only firestore:rules
```

Deploy it after the new app is live. It is safe at that point because:

- No browser reads another student's document any more: the parent report and the admin dashboard go through the server, and the server's Admin SDK is not bound by rules.
- `credits` can't be set or changed from the browser, on create or update. Only `src/server/credits.ts` changes it.
- The ledger and `aiUsage` can't be written from the browser.
- Students keep reading and writing the rest of their own `users/{uid}` document (study sync) and their own `leaderboard/{uid}` entry; any signed-in student can read the leaderboard, whose names are already anonymised.

Deploying the rules before the new app is live would break the old parent report and admin page, which read other students' documents from the browser.

### 4. Node version

`firebase-admin` is pinned to `^13.10.0`. Version 14 needs Node 22, and on Node 20 npm silently skips its Firestore package, so local development and CI (both Node 20) would break. Vercel runs Node 24 by default. Node 20 is past end of life, so when CI and local machines move to Node 22, `firebase-admin` can move to 14.

## Tests

`npm test` runs the unit tests in `src/**/*.test.ts` (Vitest): request validation, the quota windows including the India-midnight reset, the admin email check, credit costs, trimming Groq requests to the token budget, and the provider's `413` retry and key fallback. CI runs them on every pull request.
