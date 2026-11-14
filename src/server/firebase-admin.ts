import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { ApiError } from "./errors";

/**
 * Server-only Firebase Admin. Credentials come from either:
 * - FIREBASE_SERVICE_ACCOUNT_KEY: the service-account JSON, raw or base64-encoded, or
 * - FIREBASE_ADMIN_PROJECT_ID + FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY
 */
function credential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY?.trim();
  if (raw) {
    const text = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(text) as { project_id: string; client_email: string; private_key: string };
    return cert({ projectId: sa.project_id, clientEmail: sa.client_email, privateKey: sa.private_key });
  }
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (projectId && clientEmail && privateKey) return cert({ projectId, clientEmail, privateKey });
  console.error("[firebase-admin] missing credentials: set FIREBASE_SERVICE_ACCOUNT_KEY");
  throw new ApiError(503, "server_not_configured", "This feature isn't available right now. Try again later");
}

let app: App | undefined;

export function adminApp(): App {
  if (!app) app = getApps()[0] ?? initializeApp({ credential: credential() });
  return app;
}

export const adminAuth = () => getAuth(adminApp());
export const adminDb = () => getFirestore(adminApp());
