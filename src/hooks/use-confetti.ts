"use client";

import { useCallback, useRef } from "react";

type ConfettiFn = (options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}) => void;

export function useConfetti() {
  const confettiRef = useRef<ConfettiFn | null>(null);

  const fire = useCallback(async () => {
    if (!confettiRef.current) {
      const mod = await import("canvas-confetti");
      confettiRef.current = mod.default as unknown as ConfettiFn;
    }
    const confetti = confettiRef.current;
    confetti({ particleCount: 80, spread: 70, origin: { x: 0.3, y: 0.6 }, colors: ["#7b61ff", "#1a73e8", "#22c55e", "#f59e0b"] });
    confetti({ particleCount: 80, spread: 70, origin: { x: 0.7, y: 0.6 }, colors: ["#7b61ff", "#1a73e8", "#22c55e", "#f59e0b"] });
  }, []);

  return { fire };
}
