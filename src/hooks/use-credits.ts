"use client";

import { capture } from "@/lib/analytics";
import { useStore } from "@/store/use-store";
import { apiJson, ApiClientError } from "@/lib/api-client";
import {
  getCost as _getCost,
  canAfford as _canAfford,
  type CreditActivity,
} from "@/lib/credits";

/** Fetch the balance from the server (new students get their starting credits here) */
export async function refreshCredits(): Promise<number | null> {
  try {
    const { credits } = await apiJson<{ credits: number }>("/api/credits");
    useStore.getState().setField("credits", credits);
    return credits;
  } catch (err) {
    console.error("Credit refresh failed:", err);
    return null;
  }
}

export function useCredits() {
  const credits = useStore((s) => s.credits);

  function canAfford(activity: CreditActivity, count = 1): boolean {
    return _canAfford(credits, activity, count);
  }

  /**
   * Spend credits through the server, which checks the balance in a transaction and
   * records a ledger entry. The balance updates optimistically and is replaced by the
   * server's figure (or rolled back) when the response arrives.
   */
  async function deduct(activity: CreditActivity, count = 1): Promise<boolean> {
    const state = useStore.getState();
    const cost = _getCost(activity, count);
    if (state.credits < cost) {
      capture("out_of_credits", { activity, cost, credits_remaining: state.credits });
      return false;
    }

    const previousCredits = state.credits;
    useStore.getState().setField("credits", previousCredits - cost);

    try {
      const { credits: balance } = await apiJson<{ credits: number }>("/api/credits", {
        method: "POST",
        body: JSON.stringify({ activity, count }),
      });
      useStore.getState().setField("credits", balance);
      return true;
    } catch (err) {
      if (err instanceof ApiClientError && err.code === "insufficient_credits" && typeof err.body.credits === "number") {
        useStore.getState().setField("credits", err.body.credits as number);
        capture("out_of_credits", { activity, cost, credits_remaining: err.body.credits as number });
      } else {
        useStore.getState().setField("credits", previousCredits);
        console.error("Credit deduction failed:", err);
      }
      return false;
    }
  }

  function getCost(activity: CreditActivity, count = 1): number {
    return _getCost(activity, count);
  }

  return { credits, canAfford, deduct, getCost } as const;
}
