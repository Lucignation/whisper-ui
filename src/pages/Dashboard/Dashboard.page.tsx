import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoChatbubblesOutline,
  IoPersonAddOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoNotificationsOutline,
  IoArrowForward,
  IoEllipsisHorizontal,
  IoFlashOutline,
  IoCallOutline,
  IoAddOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";

// ─── Mock data ─────────────────────────────────────────────────────────────

const stats = [
  { label: "Total messages today", value: "2,841", change: "+12%", positive: true, icon: IoChatbubblesOutline, color: "from-violet-500 to-purple-600", to: "/app/personal_chat" },
  { label: "Active teammates", value: "18 / 24", change: "75% online", positive: true, icon: IoPeopleOutline, color: "from-emerald-500 to-teal-600", to: "/app/groups" },
  { label: "Open channels", value: "12", change: "+2 this week", positive: true, icon: BsChatSquareDots, color: "from-blue-500 to-cyan-600", to: "/app/groups" },
  { label: "Calls this week", value: "34", change: "-5% vs last week", positive: false, icon: IoCallOutline, color: "from-orange-500 to-amber-600", to: "/app/calls" },
];

const recentActivity = [
  { name: "James Mide", action: "posted in # general", time: "2 min ago", initials: "JM", color: "from-indigo-500 to-violet-600" },
  { name: "Sophia Henry", action: "shared a file in # design", time: "8 min ago", initials: "SH", color: "from-pink-500 to-rose-600" },
  { name: "Peter Femi", action: "started a call in # engineering", time: "15 min ago", initials: "PF", color: "from-emerald-500 to-teal-600" },
  { name: "David Chen", action: "joined # product", time: "23 min ago", initials: "DC", color: "from-blue-500 to-cyan-600" },
  { name: "Amara Osei", action: "reacted 🎉 in # marketing", time: "41 min ago", initials: "AO", color: "from-orange-500 to-amber-600" },
];

const pinnedChannels = [
  { name: "general", members: 24, unread: 3, lastMsg: "James: Ready for the stand-up?" },
  { name: "engineering", members: 18, unread: 7, lastMsg: "Sophia: Let's debug it together." },
  { name: "product", members: 12, unread: 0, lastMsg: "David: MVP deadline moved to Friday 🚀" },
  { name: "design", members: 8, unread: 1, lastMsg: "Sophia: Updated the component library" },
];

const teamMembers = [
  { name: "James Mide", role: "Backend Engineer", status: "online", initials: "JM", color: "from-indigo-500 to-violet-600" },
  { name: "Sophia Henry", role: "Frontend Engineer", status: "online", initials: "SH", color: "from-pink-500 to-rose-600" },
  { name: "Peter Femi", role: "QA Engineer", status: "away", initials: "PF", color: "from-emerald-500 to-teal-600" },
  { name: "David Chen", role: "Product Manager", status: "online", initials: "DC", color: "from-blue-500 to-cyan-600" },
  { name: "Amara Osei", role: "Designer", status: "offline", initials: "AO", color: "from-orange-500 to-amber-600" },
];

const statusColors: Record<string, string> = {
  online: "bg-[#4ADE80]",
  away: "bg-[#F59E0B]",
  offline: "bg-[#635E7A]",
};

// ─── Stat card ─────────────────────────────────────────────────────────────

const StatCard = ({ label, value, change, positive, icon: Icon, color, to }: typeof stats[0]) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5 flex items-start gap-4 cursor-pointer hover:border-white/[0.14] transition-all"
      onClick={() => navigate(to)}
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#635E7A] mb-1">{label}</p>
        <p className="text-[24px] font-bold text-[#E8E6F2] leading-none mb-1.5">{value}</p>
        <p className={`text-[12px] font-medium ${positive ? "text-[#4ADE80]" : "text-[#F87171]"}`}>{change}</p>
      </div>
    </div>
  );
};

// ─── Invite modal ──────────────────────────────────────────────────────────

const InviteModal = ({ onClose }: { onClose: () => void }) => {
  const [emails, setEmails] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addField = () => setEmails((prev) => [...prev, ""]);
  const updateEmail = (i: number, val: string) =>
    setEmails((prev) => prev.map((e, idx) => (idx === i ? val : e)));
  const removeField = (i: number) =>
    setEmails((prev) => prev.filter((_, idx) => idx !== i));

  const handleSend = () => {
    const valid = emails.filter((e) => e.trim().includes("@"));
    if (valid.length === 0) { toast.error("Enter at least one valid email"); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success(`Invites sent to ${valid.length} teammate${valid.length > 1 ? "s" : ""}`);
      onClose();
    }, 800);
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <p className="text-[13px] text-[#9B98B0]">
        Invite teammates by email. They'll receive a link to join your workspace.
      </p>
      <div className="flex flex-col gap-2">
        {emails.map((email, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => updateEmail(i, e.target.value)}
              placeholder={`teammate${i + 1}@company.com`}
              className="flex-1 h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50"
            />
            {emails.length > 1 && (
              <button onClick={() => removeField(i)} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#F87171] hover:bg-white/[0.06] transition-all">
                <IoCloseOutline size={16} />
              </button>
            )}
          </div>
        ))}
        <button onClick={addField} className="flex items-center gap-1.5 text-[12px] text-[#7C3AED] hover:text-[#A78BFA] transition-colors mt-1 w-fit">
          <IoAddOutline size={13} />
          Add another
        </button>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all">Cancel</button>
        <button onClick={handleSend} disabled={loading} className="flex-1 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 disabled:opacity-60">
          {loading ? "Sending…" : "Send invites"}
        </button>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[13px] text-[#635E7A] mb-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <h1 className="text-[26px] font-bold text-[#E8E6F2] tracking-tight">Good morning, Sophia 👋</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/app/notifications")}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-[#635E7A] hover:bg-white/[0.08] hover:text-[#9B98B0] transition-all duration-150"
                title="Notifications"
              >
                <IoNotificationsOutline size={18} />
              </button>
              <Link
                to="/app/personal_chat"
                className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[13px] transition-all duration-150 shadow-lg shadow-purple-900/30"
              >
                <IoChatbubblesOutline size={15} />
                Open Chat
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Main content row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Activity feed */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <h2 className="text-[14px] font-semibold text-[#E8E6F2]">Recent Activity</h2>
                  <button className="text-[#635E7A] hover:text-[#9B98B0] transition-colors">
                    <IoEllipsisHorizontal size={18} />
                  </button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {recentActivity.map(({ name, action, time, initials, color }) => (
                    <button
                      key={name + time}
                      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors text-left"
                      onClick={() => navigate("/app/personal_chat")}
                    >
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-[11px] font-bold">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-[#E8E6F2]">
                          <span className="font-semibold">{name}</span>{" "}
                          <span className="text-[#9B98B0]">{action}</span>
                        </p>
                      </div>
                      <span className="text-[11px] text-[#635E7A] flex-shrink-0">{time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pinned channels */}
              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <h2 className="text-[14px] font-semibold text-[#E8E6F2]">Pinned Channels</h2>
                  <Link to="/app/groups" className="text-[12px] text-[#7C3AED] hover:text-[#A78BFA] flex items-center gap-1 transition-colors font-medium">
                    View all <IoArrowForward size={12} />
                  </Link>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {pinnedChannels.map(({ name, unread, lastMsg }) => (
                    <Link to="/app/personal_chat" key={name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-[#2D2157] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#C084FC] font-bold text-sm">#</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-[13px] font-semibold text-[#E8E6F2] truncate"># {name}</p>
                          {unread > 0 && (
                            <span className="flex-shrink-0 h-4 min-w-4 px-1 rounded-full bg-[#7C3AED] text-[10px] font-bold text-white flex items-center justify-center">
                              {unread}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-[#635E7A] truncate">{lastMsg}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Team sidebar */}
            <div className="flex flex-col gap-5">
              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <h2 className="text-[14px] font-semibold text-[#E8E6F2]">Team</h2>
                  <button
                    onClick={() => setInviteOpen(true)}
                    className="flex items-center gap-1 text-[12px] text-[#635E7A] hover:text-[#9B98B0] transition-colors"
                  >
                    <IoPersonAddOutline size={14} />
                    Invite
                  </button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {teamMembers.map(({ name, role, status, initials, color }) => (
                    <button
                      key={name}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors"
                      onClick={() => navigate("/app/personal_chat")}
                    >
                      <div className="relative flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
                          <span className="text-white text-[10px] font-bold">{initials}</span>
                        </div>
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#1C1E27] ${statusColors[status]}`} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[13px] font-medium text-[#E8E6F2] truncate">{name}</p>
                        <p className="text-[11px] text-[#635E7A] truncate">{role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-gradient-to-br from-[#2D1F52] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <IoFlashOutline size={16} className="text-[#A78BFA]" />
                  <h3 className="text-[13px] font-semibold text-[#C4C2D4]">Quick actions</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: IoChatbubblesOutline, label: "New message", to: "/app/personal_chat" },
                    { icon: IoPeopleOutline, label: "Manage team", to: "/app/admin/settings" },
                    { icon: IoTrendingUpOutline, label: "View analytics", to: null, action: () => toast("Analytics coming soon") },
                    { icon: IoPersonAddOutline, label: "Invite teammates", to: null, action: () => setInviteOpen(true) },
                  ].map(({ icon: Icon, label, to, action }) =>
                    to ? (
                      <Link key={label} to={to} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] transition-all text-[13px] text-[#C4C2D4] group">
                        <span className="flex items-center gap-2"><Icon size={14} />{label}</span>
                        <IoArrowForward size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A78BFA]" />
                      </Link>
                    ) : (
                      <button key={label} onClick={action} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] transition-all text-[13px] text-[#C4C2D4] group text-left w-full">
                        <span className="flex items-center gap-2"><Icon size={14} />{label}</span>
                        <IoArrowForward size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#A78BFA]" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite teammates">
        <InviteModal onClose={() => setInviteOpen(false)} />
      </Modal>
    </ContentLayout>
  );
};

export default Dashboard;
