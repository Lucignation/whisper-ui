import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import { toast } from "sonner";
import {
  IoCheckmarkDoneOutline,
  IoSettingsOutline,
  IoChatbubbleOutline,
  IoPersonAddOutline,
  IoMegaphoneOutline,
  IoCallOutline,
  IoAtOutline,
  IoHeartOutline,
  IoNotificationsOffOutline,
  IoTrashOutline,
} from "react-icons/io5";

// ─── Types ─────────────────────────────────────────────────────────────────

type NotifType = "mention" | "message" | "reaction" | "invite" | "call" | "announcement";

interface Notification {
  id: number;
  type: NotifType;
  actor: { name: string; initials: string; color: string };
  body: string;
  time: string;
  channel?: string;
  read: boolean;
  linkTo: string;
}

const typeConfig: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  mention: { icon: IoAtOutline, color: "text-[#A78BFA]", bg: "bg-purple-500/10 border-purple-500/20" },
  message: { icon: IoChatbubbleOutline, color: "text-[#60A5FA]", bg: "bg-blue-500/10 border-blue-500/20" },
  reaction: { icon: IoHeartOutline, color: "text-[#F472B6]", bg: "bg-pink-500/10 border-pink-500/20" },
  invite: { icon: IoPersonAddOutline, color: "text-[#4ADE80]", bg: "bg-green-500/10 border-green-500/20" },
  call: { icon: IoCallOutline, color: "text-[#34D399]", bg: "bg-emerald-500/10 border-emerald-500/20" },
  announcement: { icon: IoMegaphoneOutline, color: "text-[#FBBF24]", bg: "bg-yellow-500/10 border-yellow-500/20" },
};

const FILTERS = ["All", "Mentions", "Messages", "Reactions", "Calls"] as const;
type Filter = typeof FILTERS[number];

const initialNotifications: Notification[] = [
  { id: 1, type: "mention", actor: { name: "James Mide", initials: "JM", color: "from-indigo-500 to-violet-600" }, body: "mentioned you in #engineering: \"@sophia can you review the PR?\"", time: "2m ago", channel: "#engineering", read: false, linkTo: "/app/personal_chat" },
  { id: 2, type: "call", actor: { name: "Peter Femi", initials: "PF", color: "from-emerald-500 to-teal-600" }, body: "started a video call in #devops", time: "8m ago", channel: "#devops", read: false, linkTo: "/app/calls" },
  { id: 3, type: "reaction", actor: { name: "Amara Osei", initials: "AO", color: "from-orange-500 to-amber-600" }, body: "reacted 🎉 to your message in #product", time: "15m ago", channel: "#product", read: false, linkTo: "/app/personal_chat" },
  { id: 4, type: "invite", actor: { name: "David Chen", initials: "DC", color: "from-blue-500 to-cyan-600" }, body: "invited you to join #data-science", time: "1h ago", read: false, linkTo: "/app/groups" },
  { id: 5, type: "announcement", actor: { name: "Workspace Admin", initials: "WA", color: "from-violet-500 to-purple-600" }, body: "Posted an announcement in #general: \"All-hands meeting this Friday at 10am\"", time: "2h ago", channel: "#general", read: true, linkTo: "/app/personal_chat" },
  { id: 6, type: "message", actor: { name: "Sophia Henry", initials: "SH", color: "from-pink-500 to-rose-600" }, body: "sent you a direct message: \"Hey, are you free for a quick call?\"", time: "3h ago", read: true, linkTo: "/app/personal_chat" },
  { id: 7, type: "mention", actor: { name: "Lin Wei", initials: "LW", color: "from-purple-500 to-fuchsia-600" }, body: "mentioned you in #design: \"@sophia this looks great!\"", time: "4h ago", channel: "#design", read: true, linkTo: "/app/personal_chat" },
  { id: 8, type: "reaction", actor: { name: "James Mide", initials: "JM", color: "from-indigo-500 to-violet-600" }, body: "reacted 👍 to your message in #engineering", time: "5h ago", channel: "#engineering", read: true, linkTo: "/app/personal_chat" },
  { id: 9, type: "announcement", actor: { name: "Workspace Admin", initials: "WA", color: "from-violet-500 to-purple-600" }, body: "The workspace was upgraded to Pro plan", time: "1d ago", read: true, linkTo: "/app/admin/settings" },
];

// ─── Notification item ─────────────────────────────────────────────────────

const NotifItem = ({
  n,
  onRead,
  onDismiss,
  onClick,
}: {
  n: Notification;
  onRead: (id: number) => void;
  onDismiss: (id: number) => void;
  onClick: (n: Notification) => void;
}) => {
  const cfg = typeConfig[n.type];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer group ${!n.read ? "bg-[#2D2157]/20" : ""}`}
      onClick={() => onClick(n)}
    >
      {/* Unread dot */}
      <div className="w-2 flex-shrink-0 flex justify-center pt-2">
        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />}
      </div>

      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${n.actor.color} flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-[11px] font-bold">{n.actor.initials}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] text-[#E8E6F2] leading-relaxed">
            <span className="font-semibold">{n.actor.name}</span>{" "}
            <span className="text-[#9B98B0]">{n.body}</span>
          </p>
          <span className="text-[11px] text-[#635E7A] flex-shrink-0">{n.time}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium ${cfg.bg} ${cfg.color}`}>
            <cfg.icon size={10} />
            {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
          </div>
          {n.channel && <span className="text-[11px] text-[#635E7A]">{n.channel}</span>}
        </div>
      </div>

      {/* Hover actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" onClick={(e) => e.stopPropagation()}>
        {!n.read && (
          <button
            title="Mark as read"
            onClick={() => onRead(n.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#4ADE80] hover:bg-white/[0.06] transition-all"
          >
            <IoCheckmarkDoneOutline size={14} />
          </button>
        )}
        <button
          title="Dismiss"
          onClick={() => onDismiss(n.id)}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#F87171] hover:bg-white/[0.06] transition-all"
        >
          <IoTrashOutline size={13} />
        </button>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<Filter>("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast("Notification dismissed");
  };

  const handleClick = (n: Notification) => {
    markRead(n.id);
    navigate(n.linkTo);
  };

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Mentions") return n.type === "mention";
    if (filter === "Messages") return n.type === "message";
    if (filter === "Reactions") return n.type === "reaction";
    if (filter === "Calls") return n.type === "call";
    return true;
  });

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-4xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="h-6 min-w-6 px-2 rounded-full bg-[#7C3AED] text-[12px] font-bold text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-[14px] text-[#635E7A] mt-1">Stay on top of what's happening in your workspace.</p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-2 h-9 px-4 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#9B98B0] text-[13px] font-medium rounded-xl transition-all"
                >
                  <IoCheckmarkDoneOutline size={15} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => navigate("/app/admin/settings")}
                className="w-9 h-9 flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[#9B98B0] rounded-xl transition-all"
                title="Notification settings"
              >
                <IoSettingsOutline size={16} />
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-5 bg-white/[0.03] rounded-xl p-1 w-fit">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  filter === f ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/20" : "text-[#635E7A] hover:text-[#9B98B0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
                  <IoNotificationsOffOutline size={24} className="text-[#635E7A]" />
                </div>
                <p className="text-[14px] font-medium text-[#E8E6F2] mb-1">No notifications</p>
                <p className="text-[13px] text-[#635E7A]">You're all caught up for this category.</p>
              </div>
            ) : (
              filtered.map((n) => (
                <NotifItem key={n.id} n={n} onRead={markRead} onDismiss={dismiss} onClick={handleClick} />
              ))
            )}
          </div>

          <div className="mt-5 flex items-center gap-2 text-[12px] text-[#635E7A]">
            <IoSettingsOutline size={13} />
            <span>
              Manage notification preferences in{" "}
              <button
                onClick={() => navigate("/app/admin/settings")}
                className="text-[#A78BFA] hover:text-[#C084FC] transition-colors font-medium"
              >
                Settings → Account
              </button>
            </span>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Notifications;
