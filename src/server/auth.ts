import { adminAuth } from "./firebase-admin";
import { ApiError } from "./errors";

export interface RequestUser {
  uid: string;
  email?: string;
  emailVerified: boolean;
}

/** Verify the Firebase ID token in `Authorization: Bearer <token>` */
export async function requireUser(req: Request): Promise<RequestUser> {
  const match = (req.headers.get("authorization") || "").match(/^Bearer\s+(.+)$/i);
  if (!match) throw new ApiError(401, "unauthenticated", "Sign in to continue");
  try {
    const token = await adminAuth().verifyIdToken(match[1]);
    return { uid: token.uid, email: token.email, emailVerified: token.email_verified === true };
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(401, "unauthenticated", "Your session has expired. Sign in again");
  }
}

/** Admins are listed in ADMIN_EMAILS (comma-separated), checked on the server only */
export function isAdminEmail(email: string | undefined, list = process.env.ADMIN_EMAILS || ""): boolean {
  if (!email) return false;
  const admins = list.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
  return admins.includes(email.toLowerCase());
}

export async function requireAdmin(req: Request): Promise<RequestUser> {
  const user = await requireUser(req);
  if (!user.emailVerified || !isAdminEmail(user.email)) {
    throw new ApiError(403, "forbidden", "Only admins can do this");
  }
  return user;
}
