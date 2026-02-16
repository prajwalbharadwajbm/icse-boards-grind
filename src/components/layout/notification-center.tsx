"use client";

import { useNotifications } from "@/store/use-notifications";

interface Props {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: Props) {
  const { notifications, markAllRead } = useNotifications();

  return (
    <div
      className="absolute right-0 top-full mt-2 w-80 max-h-96 rounded-xl overflow-hidden z-50 flex flex-col"
      style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-md)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>Notifications</span>
        <button
          onClick={() => { markAllRead(); onClose(); }}
          className="text-xs"
          style={{ color: "var(--primary)" }}
        >
          Mark all read
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            No notifications yet
          </div>
        ) : (
          notifications.slice(0, 10).map((n) => (
            <div
              key={n.id}
              className="px-4 py-3 border-b last:border-b-0 flex gap-3"
              style={{
                borderColor: "var(--border)",
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
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{n.title}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
