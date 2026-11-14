import { CREDIT_COSTS, type CreditActivity } from "@/lib/credits";
import { requireUser } from "@/server/auth";
import { ApiError, handle, json, readJson } from "@/server/errors";
import { getBalance, spendForActivity } from "@/server/credits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/credits → { credits }. New students get their starting balance here */
export async function GET(req: Request) {
  return handle(async () => {
    const user = await requireUser(req);
    return json({ credits: await getBalance(user.uid) });
  });
}

/** POST /api/credits { activity, count } → { credits }. 402 with { credits } when the balance is too low */
export async function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser(req);
    const { activity, count = 1 } = (await readJson(req)) as { activity?: unknown; count?: unknown };
    if (typeof activity !== "string" || !(activity in CREDIT_COSTS)) {
      throw new ApiError(400, "bad_activity", "Unknown activity");
    }
    if (!Number.isInteger(count) || (count as number) < 1 || (count as number) > 20) {
      throw new ApiError(400, "bad_count", "Invalid count");
    }
    const { balance } = await spendForActivity(user.uid, activity as CreditActivity, count as number);
    return json({ credits: balance });
  });
}
