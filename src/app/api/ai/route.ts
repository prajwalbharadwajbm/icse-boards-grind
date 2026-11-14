import { AI_POLICY } from "@/lib/ai-policy";
import { requireUser } from "@/server/auth";
import { ApiError, handle, json, readJson } from "@/server/errors";
import { validateAIRequest } from "@/server/ai-request";
import { consumeAIQuota, releaseAIQuota } from "@/server/quota";
import { refundCredits, spendCredits } from "@/server/credits";
import { callAIProvider } from "@/server/ai-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/ai  { purpose: "coach" | "briefing" | "grammar", messages: [...] }
 * Signed-in students only. Checks the daily and per-minute limits, charges credits if the
 * feature costs any, then calls the AI provider with a server-held key.
 * Streaming features return the provider's server-sent events; others return { text }.
 */
export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser(req);
    const { purpose, messages } = validateAIRequest(await readJson(req));
    const policy = AI_POLICY[purpose];

    const { remainingToday } = await consumeAIQuota(user.uid, purpose);
    const charge = policy.cost > 0 ? await spendCredits(user.uid, policy.cost, `ai:${purpose}`) : null;

    let upstream: Response;
    try {
      upstream = await callAIProvider({ messages, maxTokens: policy.maxTokens, stream: policy.stream, signal: req.signal });
    } catch (err) {
      await releaseAIQuota(user.uid, purpose);
      if (charge) await refundCredits(user.uid, policy.cost, `ai:${purpose}`, charge.ledgerId);
      throw err;
    }

    const headers = {
      "X-AI-Remaining-Today": String(remainingToday),
      ...(charge ? { "X-Credits-Balance": String(charge.balance) } : {}),
    };

    if (policy.stream) {
      if (!upstream.body) throw new ApiError(502, "ai_unavailable", "The AI coach couldn't answer just now. Try again");
      return new Response(upstream.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
          ...headers,
        },
      });
    }

    const data = (await upstream.json()) as { choices?: { message?: { content?: string } }[] };
    return json({ text: data.choices?.[0]?.message?.content ?? "", remainingToday, credits: charge?.balance }, 200, headers);
  });
}
