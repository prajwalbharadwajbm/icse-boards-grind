"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { SECTION_TITLES } from "@/lib/constants";
import { ProfileDropdown } from "./profile-dropdown";
import { NotificationCenter } from "./notification-center";
import { useNotifications } from "@/store/use-notifications";
import { useStore } from "@/store/use-store";
import { StickerAvatar } from "@/components/brand/avatars";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = useNotifications((s) => s.unreadCount());
  const credits = useStore((s) => s.credits);
  const avatar = useStore((s) => s.avatar);
  const studentName = useStore((s) => s.name);

  const section = pathname.split("/").pop() || "dashboard";
  const title = SECTION_TITLES[section] || "Dashboard";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 h-16 shrink-0"
      style={{ background: "var(--bg)", borderBottom: "2px solid var(--outline)" }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--paper)]"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="font-display text-xl font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Credits */}
        <div
          className="flex items-center gap-1.5 h-9 px-3 mr-1 rounded-full text-[13px] font-bold tabular-nums"
          style={{ background: "var(--sun)", color: "#000", border: "2px solid var(--outline)" }}
          title="AI coach credits"
        >
          {credits.toLocaleString("en-IN")}
          <span className="hidden sm:inline font-medium">credits</span>
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full relative transition-colors hover:bg-[var(--paper)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center tabular-nums" style={{ background: "var(--tomato)", color: "#000", border: "2px solid var(--outline)" }}>
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {notifOpen && <NotificationCenter onClose={() => setNotifOpen(false)} />}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            aria-label="Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-150 hover:-rotate-6"
          >
            <StickerAvatar avatar={avatar} seed={studentName} size={34} />
          </button>
          {profileOpen && <ProfileDropdown onClose={() => setProfileOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
