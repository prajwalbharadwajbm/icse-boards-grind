"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/use-store";
import { getExams } from "@/lib/constants";
import { today, daysBetween } from "@/lib/utils";
import { MiniTimer } from "@/components/timer/mini-timer";
import { StickerMark } from "@/components/brand/sticker";
import { StickerAvatar } from "@/components/brand/avatars";
import { vibeFor } from "@/lib/identity";

type NavItem = {
  href: string;
  label: string;
  iconEl: (active: boolean) => React.ReactNode;
  children?: NavItem[];
};

/** Section labels, keyed by the first item of each group. Order of NAV_ITEMS is unchanged. */
/**
 * Each nav icon sits on a sticker tile, coloured by section so the colour means something:
 * Study = mint, Plan = sunshine, Track = tomato. Sticker colours stay fixed in both themes.
 */
const MINT = { bg: "#45D69B", fg: "#000000" };
const SUN = { bg: "#FFD43B", fg: "#000000" };
const TOMATO = { bg: "#FF5C47", fg: "#000000" };
const TILE: Record<string, { bg: string; fg: string }> = {
  "/dashboard": { bg: "#2F5BFF", fg: "#FFFFFF" },
  "/dashboard/subjects": MINT,
  "/dashboard/english": MINT,
  "/dashboard/notes": MINT,
  "/dashboard/papers": MINT,
  "/dashboard/planner": SUN,
  "/dashboard/coach": SUN,
  "/dashboard/timer": SUN,
  "/dashboard/calendar": SUN,
  "/dashboard/progress": TOMATO,
  "/dashboard/leaderboard": TOMATO,
  "/dashboard/parent-report": TOMATO,
  "/dashboard/settings": { bg: "var(--paper)", fg: "var(--text)" },
};

/** The icon on its sticker tile; the current page's sticker tilts, others tilt on hover */
function IconSticker({ href, active, small = false, children }: { href: string; active: boolean; small?: boolean; children: React.ReactNode }) {
  const tone = TILE[href] ?? { bg: "var(--paper)", fg: "var(--text)" };
  return (
    <span
      className={`shrink-0 flex items-center justify-center rounded-lg transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] [&>svg]:w-4 [&>svg]:h-4 ${
        small ? "w-6 h-6 [&>svg]:w-3.5 [&>svg]:h-3.5" : "w-7 h-7"
      } ${active ? "-rotate-6" : "group-hover:-rotate-6"}`}
      style={{ background: tone.bg, color: tone.fg, border: `2px solid ${active ? "var(--bg)" : "var(--outline)"}` }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

const SECTION_STARTS: Record<string, string> = {
  "/dashboard/subjects": "Study",
  "/dashboard/planner": "Plan",
  "/dashboard/progress": "Track",
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/dashboard/subjects",
    label: "Subjects",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
    children: [
      {
        href: "/dashboard/english",
        label: "English",
        iconEl: () => (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        ),
      },
    ],
  },
  {
    href: "/dashboard/notes",
    label: "Notes",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    href: "/dashboard/papers",
    label: "Papers",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    href: "/dashboard/planner",
    label: "Planner",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="14" y1="14" x2="16" y2="14" />
        <line x1="8" y1="18" x2="10" y2="18" />
      </svg>
    ),
  },
  {
    href: "/dashboard/coach",
    label: "AI coach",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    href: "/dashboard/timer",
    label: "Timer",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="9" />
        <polyline points="12 9 12 13 15 15" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="9" y1="1" x2="15" y2="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/calendar",
    label: "Calendar",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    href: "/dashboard/progress",
    label: "Progress",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    href: "/dashboard/leaderboard",
    label: "Leaderboard",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0012 0V2z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/parent-report",
    label: "Parent report",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    iconEl: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill="none" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  /** If set, replaces "/dashboard" prefix in nav links (e.g. "/preview") */
  linkPrefix?: string;
  /** Appended to every nav link (e.g. "?uid=xxx") */
  linkSuffix?: string;
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile, linkPrefix, linkSuffix }: SidebarProps) {
  /** Transform a /dashboard/... href to the target prefix (for Link navigation) */
  const transformHref = (href: string) => {
    let h = href;
    if (linkPrefix) h = h.replace(/^\/dashboard/, linkPrefix);
    if (linkSuffix) h = h + linkSuffix;
    return h;
  };

  /** Transform href for active-state matching (no query suffix — pathname never includes it) */
  const matchHref = (href: string) => {
    if (linkPrefix) return href.replace(/^\/dashboard/, linkPrefix);
    return href;
  };
  const pathname = usePathname();
  const name = useStore((s) => s.name) || "Student";
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const groupTwo = useStore((s) => s.groupTwo);
  const avatar = useStore((s) => s.avatar);
  const vibe = vibeFor(useStore((s) => s.studyVibe));

  // Next paper, shown quietly above the profile
  const nextExamInfo = useMemo(() => {
    const td = today();
    const exams = getExams(lang, elective, groupTwo);
    const next = exams.find((e) => e.date >= td);
    if (!next) return null;
    const days = daysBetween(td, next.date);
    return { days, subject: next.subject.replace(/ Paper \d$/, "") };
  }, [lang, elective, groupTwo]);

  // Auto-open subsections with fewer than 3 children
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        initial[item.href] = item.children.length < 3 || false;
      }
    });
    return initial;
  });

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  // Sticker nav: pill rows; the current page is a solid ink pill
  const rowClass = (active: boolean) =>
    `group flex items-center gap-2.5 h-10 px-3.5 rounded-full text-[15px] transition-colors duration-150 ${
      active ? "font-bold" : "font-medium hover:bg-[var(--paper)] hover:text-[var(--text)]"
    } ${collapsed ? "justify-center px-0" : ""}`;
  const rowStyle = (active: boolean): React.CSSProperties => ({
    background: active ? "var(--text)" : undefined,
    color: active ? "var(--bg)" : "var(--text-secondary)",
  });


  const mainItems = NAV_ITEMS.filter((i) => i.href !== "/dashboard/settings");
  const settingsItem = NAV_ITEMS.find((i) => i.href === "/dashboard/settings");

  const renderItem = (item: NavItem) => {
    const mHref = matchHref(item.href);
    const isActive = pathname === mHref;
    const isChildActive = item.children?.some((c) => { const ch = matchHref(c.href); return pathname === ch || pathname.startsWith(ch + "/"); });
    const isSectionActive = isActive || isChildActive || (mHref !== matchHref("/dashboard") && !item.children && pathname.startsWith(mHref));
    const isOpen = openSections[item.href];
    const sectionLabel = SECTION_STARTS[item.href];

    return (
      <div key={item.href}>
        {sectionLabel && (
          collapsed ? (
            <div className="mx-3 mt-4 mb-2 h-px" style={{ background: "var(--divider)" }} />
          ) : (
            <p className="px-3.5 mt-5 mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{sectionLabel}</p>
          )
        )}
        <div className="flex items-center gap-1">
          <Link
            href={transformHref(item.href)}
            onClick={onCloseMobile}
            aria-current={isActive ? "page" : undefined}
            className={`${rowClass(isActive || (!item.children && isSectionActive))} flex-1 min-w-0`}
            style={rowStyle(isActive || (!item.children && isSectionActive))}
            title={collapsed ? item.label : undefined}
          >
            <IconSticker href={item.href} active={isActive || (!item.children && isSectionActive)}>{item.iconEl(isSectionActive)}</IconSticker>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
          {item.children && !collapsed && (
            <button
              onClick={() => toggleSection(item.href)}
              aria-label={isOpen ? `Hide ${item.label} sections` : `Show ${item.label} sections`}
              aria-expanded={isOpen}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--paper)]"
              style={{ color: "var(--text-muted)" }}
            >
              <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
                <polyline points="9 18 15 12 9 6" />
              </motion.svg>
            </button>
          )}
        </div>
        {item.children && (
          <AnimatePresence initial={false}>
            {isOpen && !collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-0.5 flex flex-col gap-0.5"
              >
                {item.children.map((child) => {
                  const ch = matchHref(child.href);
                  const childActive = pathname === ch || pathname.startsWith(ch + "/");
                  return (
                    <Link
                      key={child.href}
                      href={transformHref(child.href)}
                      onClick={onCloseMobile}
                      aria-current={childActive ? "page" : undefined}
                      className={`${rowClass(childActive)} pl-[46px]`}
                      style={rowStyle(childActive)}
                    >
                      <IconSticker href={child.href} active={childActive} small>{child.iconEl(childActive)}</IconSticker>
                      <span className="truncate">{child.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onCloseMobile}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 248 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "var(--bg-sidebar)",
          borderRight: "2px solid var(--outline)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Header */}
        <div className={`flex items-center gap-2.5 h-16 shrink-0 ${collapsed ? "justify-center px-0" : "px-4"}`}>
          <StickerMark size={34} />
          {!collapsed && (
            <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] whitespace-nowrap" style={{ color: "var(--text)" }}>
              Boards Grind
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pt-2 pb-4 overflow-y-auto flex flex-col gap-0.5" aria-label="Main">
          {mainItems.map(renderItem)}
        </nav>

        {/* Mini Timer (visible when timer is active) */}
        <MiniTimer collapsed={collapsed} />

        <div className="px-3 pb-2 flex flex-col gap-0.5">
          {settingsItem && renderItem(settingsItem)}
        </div>

        {/* Next paper + profile */}
        <div className="px-3 py-3 flex flex-col gap-3" style={{ borderTop: "1px solid var(--divider)" }}>
          {nextExamInfo && !collapsed && (
            <div className="px-3">
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Next paper</p>
              <p className="text-[13px] mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                {nextExamInfo.subject}
                <span className="tabular-nums font-bold" style={{ color: "var(--text)" }}>
                  {" "}{nextExamInfo.days === 0 ? "today" : `in ${nextExamInfo.days} ${nextExamInfo.days === 1 ? "day" : "days"}`}
                </span>
              </p>
            </div>
          )}
          {nextExamInfo && collapsed && (
            <p className="text-xs text-center tabular-nums font-bold" style={{ color: "var(--text)" }} title={`${nextExamInfo.subject} in ${nextExamInfo.days} days`}>
              {nextExamInfo.days}d
            </p>
          )}
          <div className={`flex items-center gap-2.5 px-3 ${collapsed ? "justify-center px-0" : ""}`}>
            <StickerAvatar avatar={avatar} seed={name} size={36} tilt={-6} />
            {!collapsed && (
              <span className="min-w-0 flex flex-col leading-tight">
                <span className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{name}</span>
                {vibe && <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{vibe.name}</span>}
              </span>
            )}
          </div>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden lg:flex absolute -right-3.5 top-[72px] w-7 h-7 rounded-full items-center justify-center transition-colors hover:bg-[var(--paper)]"
          style={{ background: "var(--bg-card)", border: "2px solid var(--outline)", color: "var(--text)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={collapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
          </svg>
        </button>
      </motion.aside>
    </>
  );
}
