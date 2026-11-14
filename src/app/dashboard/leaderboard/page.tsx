"use client";

import { useEffect, useState, useMemo } from "react";
import { capture } from "@/lib/analytics";
import { collection, getDocs } from "firebase/firestore";
import { getDbInstance } from "@/lib/firebase";
import { useAuth } from "@/providers/auth-provider";
import { useStore } from "@/store/use-store";
import { pushLeaderboardData } from "@/store/firebase-sync";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarSticker } from "@/components/brand/sticker";
import { StickerAvatar } from "@/components/brand/avatars";
import { getCurrentWeekStart } from "@/lib/leaderboard";

interface LeaderboardEntry {
  uid: string;
  name: string;
  streak: number;
  totalHours: number;
  chaptersDone: number;
  weekStart: string;
  /** Sticker avatar key; older entries have none and get one from their name */
  avatar?: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const leaderboardOptIn = useStore((s) => s.leaderboardOptIn);
  const setField = useStore((s) => s.setField);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"week" | "all">("week");

  useEffect(() => {
    capture("leaderboard_viewed");
    // Ensure current user's data is in Firestore before loading
    pushLeaderboardData().then(() => loadLeaderboard());
  }, []);

  async function loadLeaderboard() {
    try {
      const snap = await getDocs(collection(getDbInstance(), "leaderboard"));
      const data: LeaderboardEntry[] = [];
      snap.forEach((doc) => {
        data.push({ uid: doc.id, ...(doc.data() as Omit<LeaderboardEntry, "uid">) });
      });
      setEntries(data);
    } catch (e) {
      console.error("Failed to load leaderboard:", e);
    } finally {
      setLoading(false);
    }
  }

  const weekStart = getCurrentWeekStart();

  const sorted = useMemo(() => {
    const filtered = tab === "week" ? entries.filter((e) => e.weekStart === weekStart) : entries;
    return [...filtered].sort((a, b) => b.totalHours - a.totalHours);
  }, [entries, tab, weekStart]);

  const handleOptIn = () => {
    setField("leaderboardOptIn", true);
    capture("leaderboard_opted_in");
    // Push data immediately after opting in
    setTimeout(() => pushLeaderboardData().then(() => loadLeaderboard()), 500);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-[30px] sm:text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em]" style={{ color: "var(--text)" }}>Leaderboard</h2>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          See how you stack up against other students.
        </p>
      </div>

      {/* Opt-out notice */}
      {!leaderboardOptIn && (
        <Card>
          <div className="text-center py-4">
            <p className="font-display text-lg font-extrabold tracking-[-0.01em] mb-2" style={{ color: "var(--text)" }}>You&apos;ve left the leaderboard</p>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Your name appears anonymized (e.g. &quot;Aadhithya B.&quot;). Re-join anytime.
            </p>
            <Button onClick={handleOptIn}>
              Re-join leaderboard
            </Button>
          </div>
        </Card>
      )}

      {/* Tab toggle: pill chips, the active one in solid ink */}
      <div className="flex gap-2">
        {(["week", "all"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`h-9 px-4 rounded-full text-sm cursor-pointer transition-colors duration-150 ${
              tab === t
                ? "font-bold bg-[var(--text)] text-[var(--bg)]"
                : "font-medium bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--paper)]"
            }`}
            style={{ border: "2px solid var(--outline)" }}
          >
            {t === "week" ? "This week" : "All time"}
          </button>
        ))}
      </div>

      {/* Ranking: each student is a separate outlined row; your row is on sunshine */}
      {loading ? (
        <Card className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-solid rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
        </Card>
      ) : sorted.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {tab === "week" ? "No study data this week yet. Start a study session to appear here." : "No data yet. Study data will appear here automatically."}
          </p>
        </Card>
      ) : (
        <table className="w-full border-separate [border-spacing:0_8px] -my-2">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium px-4 w-14" style={{ color: "var(--text-muted)" }}>#</th>
              <th className="text-left text-xs font-medium px-4" style={{ color: "var(--text-muted)" }}>Name</th>
              <th className="text-center text-xs font-medium px-3" style={{ color: "var(--text-muted)" }}>Streak</th>
              <th className="text-center text-xs font-medium px-3" style={{ color: "var(--text-muted)" }}>Hours</th>
              <th className="text-center text-xs font-medium px-4" style={{ color: "var(--text-muted)" }}>Chapters</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((entry, i) => {
              const isMe = entry.uid === user?.uid;
              const ink = isMe ? "#000" : "var(--text)";
              const quiet = isMe ? "#000" : "var(--text-secondary)";
              const cell: React.CSSProperties = {
                background: isMe ? "var(--sun)" : "var(--bg-card)",
                borderTop: "2px solid var(--outline)",
                borderBottom: "2px solid var(--outline)",
              };
              return (
                <tr key={entry.uid} aria-current={isMe ? "true" : undefined}>
                  <td
                    className="px-4 h-14 rounded-l-2xl font-display text-xl font-extrabold leading-none tabular-nums"
                    style={{ ...cell, borderLeft: "2px solid var(--outline)", color: ink }}
                  >
                    {i + 1}
                  </td>
                  <td className={`px-4 h-14 text-[15px] ${isMe ? "font-bold" : "font-medium"}`} style={{ ...cell, color: ink }}>
                    <span className="inline-flex items-center gap-2.5 align-middle">
                      <StickerAvatar avatar={entry.avatar} seed={entry.name} size={32} tilt={isMe ? -8 : 0} />
                      <span>
                        {entry.name} {isMe && <span className="text-xs font-bold" style={{ color: quiet }}>(you)</span>}
                      </span>
                      {i === 0 && <StarSticker size={28} />}
                    </span>
                  </td>
                  <td className="px-3 h-14 text-center text-sm font-bold tabular-nums" style={{ ...cell, color: ink }}>
                    {entry.streak}
                  </td>
                  <td className="px-3 h-14 text-center text-sm font-bold tabular-nums" style={{ ...cell, color: ink }}>
                    {entry.totalHours.toFixed(1)}h
                  </td>
                  <td
                    className="px-4 h-14 rounded-r-2xl text-center text-sm tabular-nums"
                    style={{ ...cell, borderRight: "2px solid var(--outline)", color: quiet }}
                  >
                    {entry.chaptersDone}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
