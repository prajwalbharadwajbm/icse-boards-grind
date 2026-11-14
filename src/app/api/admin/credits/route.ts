import { requireAdmin } from "@/server/auth";
import { ApiError, handle, json, readJson } from "@/server/errors";
import { adminDb } from "@/server/firebase-admin";
import { adjustCredits } from "@/server/credits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/admin/credits { target: uid | "all", mode: "add" | "set", amount }
 * "add" takes a negative amount to remove credits. Every change is written to the ledger.
 */
export async function POST(req: Request) {
  return handle(async () => {
    const admin = await requireAdmin(req);
    const { target, mode, amount } = (await readJson(req)) as { target?: unknown; mode?: unknown; amount?: unknown };

    if (mode !== "add" && mode !== "set") throw new ApiError(400, "bad_mode", "Mode must be add or set");
    if (!Number.isInteger(amount) || Math.abs(amount as number) > 1_000_000) throw new ApiError(400, "bad_amount", "Invalid amount");
    if (mode === "set" && (amount as number) < 0) throw new ApiError(400, "bad_amount", "A balance can't be negative");
    if (typeof target !== "string" || target.length === 0) throw new ApiError(400, "bad_target", "Pick a student or all");

    const uids = target === "all" ? (await adminDb().collection("users").select().get()).docs.map((d) => d.id) : [target];
    const by = admin.email || admin.uid;

    let updated = 0;
    const failed: string[] = [];
    // Small batches keep transactions fast and avoid contention
    for (let i = 0; i < uids.length; i += 20) {
      const results = await Promise.allSettled(uids.slice(i, i + 20).map((uid) => adjustCredits(uid, mode, amount as number, by)));
      results.forEach((r, j) => (r.status === "fulfilled" ? updated++ : failed.push(uids[i + j])));
    }
    return json({ updated, failed });
  });
}
