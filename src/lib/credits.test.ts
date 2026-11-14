import { describe, expect, it } from "vitest";
import { CREDIT_COSTS, DEFAULT_CREDITS, canAfford, getCost } from "./credits";

describe("credit costs", () => {
  it("multiplies the activity cost by the count", () => {
    expect(getCost("mcq")).toBe(CREDIT_COSTS.mcq);
    expect(getCost("mock_test", 2)).toBe(CREDIT_COSTS.mock_test * 2);
    expect(getCost("poem_qa", 3)).toBe(CREDIT_COSTS.poem_qa * 3);
  });

  it("every activity has a positive whole-number cost, which /api/credits requires", () => {
    for (const cost of Object.values(CREDIT_COSTS)) {
      expect(Number.isInteger(cost)).toBe(true);
      expect(cost).toBeGreaterThan(0);
    }
  });

  it("can afford exactly the cost, not one credit less", () => {
    const cost = getCost("comprehension");
    expect(canAfford(cost, "comprehension")).toBe(true);
    expect(canAfford(cost - 1, "comprehension")).toBe(false);
    expect(canAfford(0, "mcq")).toBe(false);
  });

  it("a new student can afford every activity", () => {
    for (const activity of Object.keys(CREDIT_COSTS) as (keyof typeof CREDIT_COSTS)[]) {
      expect(canAfford(DEFAULT_CREDITS, activity)).toBe(true);
    }
  });
});
