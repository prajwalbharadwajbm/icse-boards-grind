import { adminDb } from "@/server/firebase-admin";
import { ApiError, handle, json } from "@/server/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Only these fields leave the server for the public parent report */
const REPORT_FIELDS = ["name", "avatar", "streak", "studyLog", "subjects", "selectedLanguage", "selectedElective", "groupTwo"] as const;

/**
 * GET /api/report/:uid — the read-only report a student shares with parents.
 * Works only while the student has sharing turned on, and never returns
 * email, chat history, API keys or anything outside REPORT_FIELDS.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ uid: string }> }) {
  return handle(async () => {
    const { uid } = await ctx.params;
    if (!/^[A-Za-z0-9_-]{6,128}$/.test(uid)) throw new ApiError(404, "not_found", "Report not found");

    const snap = await adminDb().collection("users").doc(uid).get();
    if (!snap.exists) throw new ApiError(404, "not_found", "Report not found");
    if (snap.get("shareReportEnabled") !== true) throw new ApiError(403, "not_shared", "This report isn't shared");

    const report: Record<string, unknown> = {};
    for (const field of REPORT_FIELDS) report[field] = snap.get(field) ?? null;
    return json({ report });
  });
}
