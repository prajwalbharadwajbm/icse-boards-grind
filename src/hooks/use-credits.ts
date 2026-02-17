"use client";

import { doc, updateDoc } from "firebase/firestore";
import posthog from "posthog-js";
import { useStore } from "@/store/use-store";
import { getAuthInstance, getDbInstance } from "@/lib/firebase";
import {
  getCost as _getCost,
  canAfford as _canAfford,
  type CreditActivity,
} from "@/lib/credits";

export function useCredits() {
  const credits = useStore((s) => s.credits);

  function canAfford(activity: CreditActivity, count = 1): boolean {
    return _canAfford(credits, activity, count);
  }

  /**
   * Deduct credits by writing directly to Firestore.
   * Security rules enforce that credits can only decrease by valid cost amounts.
   * Optimistic local update with rollback on failure.
   */
  async function deduct(activity: CreditActivity, count = 1): Promise<boolean> {
    const state = useStore.getState();
    const cost = _getCost(activity, count);
    if (state.credits < cost) {
      posthog.capture("out_of_credits", {
        activity,
        cost,
        credits_remaining: state.credits,
      });
      return false;
    }

    const uid = getAuthInstance().currentUser?.uid;
    if (!uid) return false;

    const previousCredits = state.credits;
    const newCredits = previousCredits - cost;

    // Optimistic local deduction for instant UI feedback
    useStore.getState().setField("credits", newCredits);

    try {
      // Write to Firestore — security rules reject if not a valid decrement
      await updateDoc(doc(getDbInstance(), "users", uid), { credits: newCredits });
      return true;
    } catch (err) {
      console.error("Credit deduction failed:", err);
      useStore.getState().setField("credits", previousCredits);
      return false;
    }
  }

  function getCost(activity: CreditActivity, count = 1): number {
    return _getCost(activity, count);
  }

  return { credits, canAfford, deduct, getCost } as const;
}
