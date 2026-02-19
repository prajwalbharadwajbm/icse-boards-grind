export const CREDIT_COSTS = {
  mcq: 25,
  comprehension: 100,
  subjective: 100,
  mock_test: 300,
  poem_qa: 25,
  prose_qa: 25,
} as const;

export type CreditActivity = keyof typeof CREDIT_COSTS;

export const DEFAULT_CREDITS = 1500;

export const CREDIT_LABELS: Record<CreditActivity, string> = {
  mcq: "MCQ Question",
  comprehension: "Comprehension Question",
  subjective: "Subjective Question",
  mock_test: "Mock Test Paper",
  poem_qa: "Poem Q&A Answer",
  prose_qa: "Prose Q&A Answer",
};

export function getCost(activity: CreditActivity, count = 1): number {
  return CREDIT_COSTS[activity] * count;
}

export function canAfford(credits: number, activity: CreditActivity, count = 1): boolean {
  return credits >= getCost(activity, count);
}
