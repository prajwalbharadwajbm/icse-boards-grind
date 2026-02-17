"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/use-store";
import { getExams } from "@/lib/constants";
import { today, daysBetween } from "@/lib/utils";
import { MiniTimer } from "@/components/timer/mini-timer";

function useOnlineCount(min = 112, max = 252) {
  const [count, setCount] = useState(() => Math.floor(Math.random() * (max - min + 1)) + min);
  useEffect(() => {
    const tick = () => {
      const delta = Math.floor(Math.random() * 13) - 6; // -6 to +6
      setCount((prev) => Math.min(max, Math.max(min, prev + delta)));
      const next = (Math.random() * 8 + 3) * 1000; // 3-11 seconds
      timeout = setTimeout(tick, next);
    };
    let timeout = setTimeout(tick, (Math.random() * 5 + 3) * 1000);
    return () => clearTimeout(timeout);
  }, [min, max]);
  return count;
}

type NavItem = {
  href: string;
  label: string;
  iconEl: (active: boolean) => React.ReactNode;
  children?: NavItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
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
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    href: "/dashboard/practice",
    label: "Practice",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    children: [
      {
        href: "/dashboard/english",
        label: "English Language",
        iconEl: (active) => (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7V4h16v3" />
            <path d="M9 20h6" />
            <path d="M12 4v16" />
          </svg>
        ),
      },
      {
        href: "/dashboard/english-literature",
        label: "English Literature",
        iconEl: (active) => (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        ),
        children: [
          {
            href: "/dashboard/julius-caesar",
            label: "Julius Caesar",
            iconEl: (active) => (
              <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M3 21v-2a7 7 0 017-7h4a7 7 0 017 7v2" />
              </svg>
            ),
          },
          {
            href: "/dashboard/treasure-trove",
            label: "Treasure Trove",
            iconEl: (active) => (
              <svg width="14" height="14" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
            ),
          },
        ],
      },
    ],
  },
  {
    href: "/dashboard/notes",
    label: "Notes",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    label: "AI Coach",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    href: "/dashboard/timer",
    label: "Timer",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="9" />
        <polyline points="12 9 12 13 15 15" stroke={active ? "var(--bg-sidebar)" : "currentColor"} strokeWidth="2" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="9" y1="1" x2="15" y2="1" />
      </svg>
    ),
  },
  {
    href: "/dashboard/calendar",
    label: "Calendar",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        {active && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2.5" />}
      </svg>
    ),
  },
  {
    href: "/dashboard/leaderboard",
    label: "Leaderboard",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    label: "Parent Report",
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    iconEl: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill={active ? "currentColor" : "none"} />
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
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const name = useStore((s) => s.name) || "Student";
  const lang = useStore((s) => s.selectedLanguage) || "kannada";
  const elective = useStore((s) => s.selectedElective) || "computer";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U";
  const onlineCount = useOnlineCount();

  // F5: Compact exam countdown for sidebar
  const nextExamInfo = useMemo(() => {
    const td = today();
    const exams = getExams(lang, elective);
    const next = exams.find((e) => e.date >= td);
    if (!next) return null;
    const days = daysBetween(td, next.date);
    return { days, subject: next.subject.split(" ")[0] }; // First word of subject name
  }, [lang, elective]);

  // Auto-open subsections with fewer than 3 children
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.children) {
        initial[item.href] = item.children.length < 3 || false;
        // Also initialize nested children sections
        item.children.forEach((child) => {
          if (child.children) {
            initial[child.href] = child.children.length < 4 || false;
          }
        });
      }
    });
    return initial;
  });

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
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
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          background: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-16 shrink-0">
          <img src="/icon1.png" alt="BG" width={36} height={36} className="rounded-xl shrink-0" />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white font-semibold text-sm whitespace-nowrap"
            >
              ICSE Boards Grind
            </motion.span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const isChildActive = item.children?.some((c) => 
              pathname === c.href || 
              pathname.startsWith(c.href + "/") ||
              c.children?.some((gc) => pathname === gc.href || pathname.startsWith(gc.href + "/"))
            );
            const isSectionActive = isActive || isChildActive || (item.href !== "/dashboard" && !item.children && pathname.startsWith(item.href));
            const isOpen = openSections[item.href];

            if (item.children) {
              return (
                <div key={item.href}>
                  <div className="flex items-center mb-0.5">
                    <button
                      onClick={() => toggleSection(item.href)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all flex-1 cursor-pointer
                        ${collapsed ? "justify-center" : ""}
                      `}
                      style={{
                        background: isChildActive ? "rgba(255,255,255,0.05)" : "transparent",
                        color: isSectionActive ? "#fff" : "var(--sidebar-text, #d2d2d6)",
                      }}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="shrink-0">{item.iconEl(isChildActive)}</span>
                      {!collapsed && (
                        <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                      )}
                      {!collapsed && (
                        <motion.svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.15 }}
                          className="shrink-0"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </motion.svg>
                      )}
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && !collapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="relative ml-5 pl-3 border-l-2 border-white/20">
                        {item.children.map((child) => {
                          const childActive = pathname === child.href || pathname.startsWith(child.href + "/");
                          const hasGrandchildren = child.children && child.children.length > 0;
                          const isGrandchildActive = hasGrandchildren && child.children.some((gc) => pathname === gc.href || pathname.startsWith(gc.href + "/"));
                          const isChildOpen = openSections[child.href];

                          if (hasGrandchildren) {
                            return (
                              <div key={child.href}>
                                <button
                                  onClick={() => toggleSection(child.href)}
                                  className="flex items-center gap-2.5 pl-4 pr-3 py-2 rounded-lg mb-0.5 transition-all relative before:content-[''] before:absolute before:left-[-3px] before:top-1/2 before:w-2 before:h-0.5 before:bg-white/20 w-full text-left cursor-pointer"
                                  style={{
                                    background: isGrandchildActive ? "rgba(255,255,255,0.1)" : "transparent",
                                    color: isGrandchildActive ? "#fff" : "var(--sidebar-text, #d2d2d6)",
                                  }}
                                >
                                  <span className="shrink-0">{child.iconEl(isGrandchildActive)}</span>
                                  <span className="text-sm flex-1">{child.label}</span>
                                  <motion.svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    animate={{ rotate: isChildOpen ? 90 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="shrink-0"
                                  >
                                    <polyline points="9 18 15 12 9 6" />
                                  </motion.svg>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isChildOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.15 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="relative ml-4 pl-3 border-l-2 border-white/10">
                                        {child.children.map((grandchild) => {
                                          const gcActive = pathname === grandchild.href || pathname.startsWith(grandchild.href + "/");
                                          return (
                                            <Link
                                              key={grandchild.href}
                                              href={grandchild.href}
                                              onClick={onCloseMobile}
                                              className="flex items-center gap-2 pl-4 pr-3 py-1.5 rounded-lg mb-0.5 transition-all relative before:content-[''] before:absolute before:left-[-3px] before:top-1/2 before:w-2 before:h-0.5 before:bg-white/10"
                                              style={{
                                                background: gcActive ? "rgba(255,255,255,0.1)" : "transparent",
                                                color: gcActive ? "#fff" : "var(--sidebar-text, #d2d2d6)",
                                              }}
                                            >
                                              <span className="shrink-0">{grandchild.iconEl(gcActive)}</span>
                                              <span className="text-xs">{grandchild.label}</span>
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onCloseMobile}
                              className="flex items-center gap-2.5 pl-4 pr-3 py-2 rounded-lg mb-0.5 transition-all relative before:content-[''] before:absolute before:left-[-3px] before:top-1/2 before:w-2 before:h-0.5 before:bg-white/20"
                              style={{
                                background: childActive ? "rgba(255,255,255,0.1)" : "transparent",
                                color: childActive ? "#fff" : "var(--sidebar-text, #d2d2d6)",
                              }}
                            >
                              <span className="shrink-0">{child.iconEl(childActive)}</span>
                              <span className="text-sm">{child.label}</span>
                            </Link>
                          );
                        })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all
                  ${collapsed ? "justify-center" : ""}
                `}
                style={{
                  background: isSectionActive ? "rgba(255,255,255,0.1)" : "transparent",
                  color: isSectionActive ? "#fff" : "var(--sidebar-text, #d2d2d6)",
                }}
                title={collapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.iconEl(isSectionActive)}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mini Timer (visible when timer is active) */}
        <MiniTimer collapsed={collapsed} />

        {/* Grinding counter */}
        <div className={`px-3 py-2 ${collapsed ? "text-center" : ""}`}>
          <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {!collapsed && (
              <span className="text-xs text-white/50">
                <span className="text-green-400 font-semibold">{onlineCount}</span> grinding for ICSE
              </span>
            )}
          </div>
        </div>

        {/* F5: Compact exam countdown */}
        {nextExamInfo && (
          <div className={`px-3 py-1.5 ${collapsed ? "text-center" : ""}`}>
            <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {!collapsed ? (
                <span className="text-xs text-amber-400 font-semibold">
                  {nextExamInfo.days}d to {nextExamInfo.subject}
                </span>
              ) : (
                <span className="text-xs text-amber-400 font-bold">{nextExamInfo.days}d</span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-3 py-3 border-t border-white/10">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: "#5f6368" }}
            >
              {initials}
            </div>
            {!collapsed && (
              <span className="text-sm text-white/80 truncate">{name}</span>
            )}
          </div>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full items-center justify-center text-white/60 hover:text-white"
          style={{ background: "var(--bg-sidebar)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points={collapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
          </svg>
        </button>
      </motion.aside>
    </>
  );
}
