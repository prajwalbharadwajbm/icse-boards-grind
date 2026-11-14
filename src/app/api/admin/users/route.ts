import { requireAdmin } from "@/server/auth";
import { handle, json } from "@/server/errors";
import { adminDb } from "@/server/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Fields that never go to the admin dashboard: students' own AI keys and coach chats */
const PRIVATE_FIELDS = new Set(["grokApiKey", "coachMessages"]);

/** GET /api/admin/users — every student's study data for the admin dashboard */
export async function GET(req: Request) {
  return handle(async () => {
    await requireAdmin(req);
    const snap = await adminDb().collection("users").get();
    const users = snap.docs.map((d) => {
      const data: Record<string, unknown> = { uid: d.id };
      for (const [key, value] of Object.entries(d.data())) {
        if (!PRIVATE_FIELDS.has(key)) data[key] = value;
      }
      return data;
    });
    return json({ users });
  });
}
