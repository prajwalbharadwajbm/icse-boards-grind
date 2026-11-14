import { FieldValue, type Transaction, type DocumentReference } from "firebase-admin/firestore";
import { DEFAULT_CREDITS, getCost, type CreditActivity } from "@/lib/credits";
import { adminDb } from "./firebase-admin";
import { ApiError } from "./errors";

/**
 * Credits live on users/{uid}.credits and change only here, inside transactions.
 * Every change writes a ledger row to users/{uid}/creditLedger so balances can be audited.
 */
const userDoc = (uid: string) => adminDb().collection("users").doc(uid);

function ledgerRef(uid: string): DocumentReference {
  return userDoc(uid).collection("creditLedger").doc();
}

function writeLedger(tx: Transaction, uid: string, entry: { delta: number; balanceAfter: number; reason: string; by?: string; meta?: Record<string, unknown> }) {
  const ref = ledgerRef(uid);
  tx.create(ref, { ...entry, at: FieldValue.serverTimestamp() });
  return ref.id;
}

/** Read the balance, giving new students their starting credits on first use */
export async function getBalance(uid: string): Promise<number> {
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(userDoc(uid));
    const credits = snap.get("credits");
    if (typeof credits === "number") return credits;
    tx.set(userDoc(uid), { credits: DEFAULT_CREDITS }, { merge: true });
    writeLedger(tx, uid, { delta: DEFAULT_CREDITS, balanceAfter: DEFAULT_CREDITS, reason: "welcome" });
    return DEFAULT_CREDITS;
  });
}

/** Take `amount` credits, or fail with 402 and the current balance */
export async function spendCredits(uid: string, amount: number, reason: string, meta?: Record<string, unknown>): Promise<{ balance: number; ledgerId: string }> {
  if (!Number.isInteger(amount) || amount <= 0) throw new ApiError(400, "bad_amount", "Invalid credit amount");
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(userDoc(uid));
    const stored = snap.get("credits");
    const current = typeof stored === "number" ? stored : DEFAULT_CREDITS;
    if (current < amount) {
      throw new ApiError(402, "insufficient_credits", `You need ${amount} credits for this and have ${current}`, { credits: current });
    }
    const balance = current - amount;
    tx.set(userDoc(uid), { credits: balance }, { merge: true });
    const ledgerId = writeLedger(tx, uid, { delta: -amount, balanceAfter: balance, reason, meta });
    return { balance, ledgerId };
  });
}

export function spendForActivity(uid: string, activity: CreditActivity, count: number) {
  return spendCredits(uid, getCost(activity, count), activity, { count });
}

/** Return credits for something that failed after it was paid for */
export async function refundCredits(uid: string, amount: number, reason: string, refundOf?: string): Promise<number> {
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(userDoc(uid));
    const current = typeof snap.get("credits") === "number" ? (snap.get("credits") as number) : DEFAULT_CREDITS;
    const balance = current + amount;
    tx.set(userDoc(uid), { credits: balance }, { merge: true });
    writeLedger(tx, uid, { delta: amount, balanceAfter: balance, reason: `refund:${reason}`, meta: refundOf ? { refundOf } : undefined });
    return balance;
  });
}

/** Admin grant: add (or remove, with a negative amount) credits, or set an exact balance */
export async function adjustCredits(uid: string, mode: "add" | "set", amount: number, by: string): Promise<number> {
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(userDoc(uid));
    if (!snap.exists) throw new ApiError(404, "not_found", "No such student");
    const current = typeof snap.get("credits") === "number" ? (snap.get("credits") as number) : DEFAULT_CREDITS;
    const balance = Math.max(0, mode === "set" ? amount : current + amount);
    tx.set(userDoc(uid), { credits: balance }, { merge: true });
    writeLedger(tx, uid, { delta: balance - current, balanceAfter: balance, reason: `admin:${mode}`, by });
    return balance;
  });
}
