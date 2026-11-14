"use client";

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Sticker card: white paper with a 2px black outline. No shadow; the outline does the work */
export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      className={`rounded-[20px] p-5 ${className}`}
      style={{
        background: "var(--bg-card)",
        border: "2px solid var(--outline)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
