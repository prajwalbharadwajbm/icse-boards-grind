"use client";

import Link from "next/link";

interface CoachBannerProps {
  href: string;
  onClick?: () => void;
}

/** Entry point to the AI coach, shown above most pages as an outlined pill */
export function CoachBanner({ href, onClick }: CoachBannerProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group mb-6 flex items-center gap-3 h-12 pl-5 pr-1.5 rounded-full transition-colors duration-150 hover:bg-[var(--paper)]"
      style={{ background: "var(--bg-card)", border: "2px solid var(--outline)" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" style={{ color: "var(--text)" }}>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      <span className="text-[15px] truncate" style={{ color: "var(--text-secondary)" }}>
        Stuck on a chapter or a doubt? Ask the AI coach
      </span>
      <span
        className="ml-auto shrink-0 h-9 px-4 rounded-full text-[13px] font-bold flex items-center"
        style={{ background: "var(--text)", color: "var(--bg)" }}
      >
        Open coach
      </span>
    </Link>
  );
}
