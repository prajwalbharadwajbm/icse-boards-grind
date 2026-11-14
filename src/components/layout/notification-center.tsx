"use client";

import { useNotifications } from "@/store/use-notifications";

interface Props {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: Props) {
  const { notifications, markAllRead } = useNotifications();

  return (
    <div
      className="absolute right-0 top-full mt-2 w-80 max-h-96 rounded-[20px] overflow-hidden z-50 flex flex-col"
      style={{ background: "var(--bg-card)", border: "2px solid var(--outline)", boxShadow: "4px 4px 0 var(--outline)" }}
    >
      <div className="flex items-center justify-between px-4 h-12 shrink-0" style={{ borderBottom: "1px solid var(--divider)" }}>
        <span className="font-display text-lg font-extrabold tracking-[-0.01em]" style={{ color: "var(--text)" }}>Notifications</span>
        <button
          onClick={() => { markAllRead(); onClose(); }}
          className="text-xs font-bold underline underline-offset-4 decoration-2 cursor-pointer"
          style={{ color: "var(--text)" }}
        >
          Mark all read
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-[13px]" style={{ color: "var(--text-muted)" }}>
            No notifications yet
          </div>
        ) : (
          notifications.slice(0, 10).map((n) => (
            <div
              key={n.id}
              className="px-4 py-2.5 min-h-10 border-b last:border-b-0 flex gap-3"
              style={{
                borderColor: "var(--divider)",
                background: n.read ? "transparent" : "var(--primary-light)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                style={{
                  background: n.type === "error" ? "var(--danger)"
                    : n.type === "warning" ? "var(--warning)"
                    : n.type === "success" ? "var(--success)"
                    : "var(--primary)",
                }}
              />
              <div className="min-w-0">
                <p className={`text-[13px] ${n.read ? "font-medium" : "font-bold"}`} style={{ color: "var(--text)" }}>{n.title}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
