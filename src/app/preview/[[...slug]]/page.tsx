import { PreviewClient } from "./preview-client";

const SLUGS = [
  [],
  ["subjects"],
  ["notes"],
  ["papers"],
  ["planner"],
  ["coach"],
  ["timer"],
  ["calendar"],
  ["progress"],
  ["leaderboard"],
  ["parent-report"],
  ["settings"],
  ["english"],
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default function PreviewPage() {
  return <PreviewClient />;
}
