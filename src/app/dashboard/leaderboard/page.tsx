"use client";

import { useEffect, useState, useMemo } from "react";
import posthog from "posthog-js";
import { collection, getDocs } from "firebase/firestore";
import { getDbInstance } from "@/lib/firebase";
import { useAuth } from "@/providers/auth-provider";
import { useStore } from "@/store/use-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentWeekStart } from "@/lib/leaderboard";

interface LeaderboardEntry {
  uid: string;
  name: string;
  streak: number;
  totalHours: number;
  chaptersDone: number;
  weekStart: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const leaderboardOptIn = useStore((s) => s.leaderboardOptIn);
  const setField = useStore((s) => s.setField);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"week" | "all">("week");

  useEffect(() => {
    posthog.capture("leaderboard_viewed");
    loadLeaderboard();
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
    posthog.capture("leaderboard_opted_in");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>Leaderboard</h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          See how you stack up against other students.
        </p>
      </div>

      {/* Opt-in banner */}
      {!leaderboardOptIn && (
        <Card style={{ background: "linear-gradient(135deg, #7b61ff, #1a73e8)" }}>
          <div className="text-center py-4">
            <p className="text-white font-semibold mb-2">Join the Leaderboard</p>
            <p className="text-white/80 text-sm mb-4">
              Your name will appear anonymized (e.g. &quot;Aadhithya B.&quot;). Opt in from Settings anytime.
            </p>
            <Button onClick={handleOptIn} style={{ background: "#fff", color: "#7b61ff" }}>
              Join Leaderboard
            </Button>
          </div>
        </Card>
      )}

      {/* Tab toggle */}
      <div className="flex gap-2">
        {(["week", "all"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: tab === t ? "var(--primary)" : "var(--bg-card)",
              color: tab === t ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${tab === t ? "var(--primary)" : "var(--border)"}`,
            }}
          >
            {t === "week" ? "This Week" : "All Time"}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="!p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-solid rounded-full animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No participants yet. Be the first to join!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="text-left text-xs font-semibold px-4 py-3" style={{ color: "var(--text-secondary)" }}>#</th>
                <th className="text-left text-xs font-semibold px-4 py-3" style={{ color: "var(--text-secondary)" }}>Name</th>
                <th className="text-center text-xs font-semibold px-4 py-3" style={{ color: "var(--text-secondary)" }}>Streak</th>
                <th className="text-center text-xs font-semibold px-4 py-3" style={{ color: "var(--text-secondary)" }}>Hours</th>
                <th className="text-center text-xs font-semibold px-4 py-3" style={{ color: "var(--text-secondary)" }}>Chapters</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => {
                const isMe = entry.uid === user?.uid;
                return (
                  <tr
                    key={entry.uid}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: isMe ? "var(--primary-light)" : "transparent",
                    }}
                  >
                    <td className="px-4 py-3 text-sm font-bold" style={{ color: i < 3 ? "var(--primary)" : "var(--text-secondary)" }}>
                      {i === 0 ? "\uD83E\uDD47" : i === 1 ? "\uD83E\uDD48" : i === 2 ? "\uD83E\uDD49" : i + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--text)" }}>
                      {entry.name} {isMe && <span className="text-xs" style={{ color: "var(--primary)" }}>(you)</span>}
                    </td>
                    <td className="px-4 py-3 text-center text-sm" style={{ color: "var(--warning)" }}>
                      {entry.streak > 0 && "\uD83D\uDD25"}{entry.streak}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-medium" style={{ color: "var(--text)" }}>
                      {entry.totalHours.toFixed(1)}h
                    </td>
                    <td className="px-4 py-3 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      {entry.chaptersDone}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
