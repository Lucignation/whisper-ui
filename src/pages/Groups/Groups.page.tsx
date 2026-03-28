import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoAddOutline,
  IoSearchOutline,
  IoLockClosedOutline,
  IoGlobeOutline,
  IoEllipsisHorizontal,
  IoPersonAddOutline,
  IoNotificationsOutline,
  IoBookmarkOutline,
  IoCheckmarkOutline,
  IoVolumeOffOutline,
  IoExitOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";

// ─── Types & mock data ─────────────────────────────────────────────────────

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  unread: number;
  type: "public" | "private";
  lastActive: string;
  color: string;
  pinned?: boolean;
  muted?: boolean;
}

const initialGroups: Group[] = [
  { id: 1, name: "general", description: "Company-wide announcements and watercooler chat", members: 24, unread: 3, type: "public", lastActive: "2m ago", color: "from-violet-500 to-purple-600", pinned: true },
  { id: 2, name: "engineering", description: "All things code — bugs, releases, standups", members: 18, unread: 7, type: "private", lastActive: "5m ago", color: "from-blue-500 to-cyan-600", pinned: true },
  { id: 3, name: "product", description: "Roadmap, specs, and feature discussions", members: 12, unread: 0, type: "public", lastActive: "12m ago", color: "from-emerald-500 to-teal-600" },
  { id: 4, name: "design", description: "UI/UX design system, Figma files, and reviews", members: 8, unread: 1, type: "private", lastActive: "1h ago", color: "from-pink-500 to-rose-600" },
  { id: 5, name: "marketing", description: "Campaigns, content, and growth discussions", members: 10, unread: 0, type: "public", lastActive: "2h ago", color: "from-orange-500 to-amber-600" },
  { id: 6, name: "sales", description: "Deals, leads, and pipeline updates", members: 14, unread: 5, type: "private", lastActive: "3h ago", color: "from-indigo-500 to-blue-600" },
  { id: 7, name: "devops", description: "Infrastructure, deployments, and on-call", members: 6, unread: 0, type: "private", lastActive: "4h ago", color: "from-slate-500 to-slate-600" },
  { id: 8, name: "random", description: "Off-topic chat, memes, and fun stuff", members: 22, unread: 0, type: "public", lastActive: "6h ago", color: "from-fuchsia-500 to-purple-600" },
];

const initialSuggested = [
  { name: "legal", members: 5, type: "private" as const },
  { name: "data-science", members: 9, type: "public" as const },
  { name: "customer-success", members: 11, type: "public" as const },
];

// ─── Row dropdown ──────────────────────────────────────────────────────────

const GroupMenu = ({
  group,
  onMute,
  onPin,
  onLeave,
  onClose,
}: {
  group: Group;
  onMute: () => void;
  onPin: () => void;
  onLeave: () => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 z-30 w-44 bg-[#252836] border border-white/[0.08] rounded-xl shadow-2xl py-1 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {[
        { icon: IoVolumeOffOutline, label: group.muted ? "Unmute" : "Mute", action: onMute },
        { icon: IoBookmarkOutline, label: group.pinned ? "Unpin" : "Pin to top", action: onPin },
        { icon: IoSettingsOutline, label: "Settings", action: () => { toast("Group settings coming soon"); onClose(); } },
        { icon: IoExitOutline, label: "Leave group", action: onLeave, danger: true },
      ].map(({ icon: Icon, label, action, danger }) => (
        <button
          key={label}
          onClick={() => { action(); onClose(); }}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/[0.06] transition-colors text-left ${danger ? "text-red-400" : "text-[#9B98B0]"}`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
};

// ─── Group row ─────────────────────────────────────────────────────────────

const GroupRow = ({
  g,
  openMenuId,
  onOpenMenu,
  onCloseMenu,
  onMute,
  onPin,
  onLeave,
  onClick,
}: {
  g: Group;
  openMenuId: number | null;
  onOpenMenu: (id: number) => void;
  onCloseMenu: () => void;
  onMute: (id: number) => void;
  onPin: (id: number) => void;
  onLeave: (id: number) => void;
  onClick: (g: Group) => void;
}) => (
  <div
    className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-white/[0.04] last:border-0 group"
    onClick={() => onClick(g)}
  >
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
      <span className="text-white font-bold text-[13px]">#</span>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-0.5">
        <p className="text-[13px] font-semibold text-[#E8E6F2] truncate"># {g.name}</p>
        {g.pinned && <IoBookmarkOutline size={10} className="text-[#635E7A] flex-shrink-0" />}
        {g.muted && <IoVolumeOffOutline size={10} className="text-[#635E7A] flex-shrink-0" />}
        {g.type === "private" ? (
          <IoLockClosedOutline size={10} className="text-[#635E7A] flex-shrink-0" />
        ) : (
          <IoGlobeOutline size={10} className="text-[#635E7A] flex-shrink-0" />
        )}
      </div>
      <p className="text-[12px] text-[#635E7A] truncate">{g.description}</p>
    </div>

    <div className="flex items-center gap-2.5 flex-shrink-0">
      <span className="text-[11px] text-[#635E7A] hidden sm:block">{g.members} members</span>
      <span className="text-[11px] text-[#635E7A] hidden md:block">{g.lastActive}</span>
      {g.unread > 0 && (
        <span className="h-4 min-w-4 px-1 rounded-full bg-[#7C3AED] text-[10px] font-bold text-white flex items-center justify-center">
          {g.unread}
        </span>
      )}
      <div className="relative">
        <button
          className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all"
          onClick={(e) => { e.stopPropagation(); onOpenMenu(g.id); }}
        >
          <IoEllipsisHorizontal size={15} />
        </button>
        {openMenuId === g.id && (
          <GroupMenu
            group={g}
            onMute={() => onMute(g.id)}
            onPin={() => onPin(g.id)}
            onLeave={() => onLeave(g.id)}
            onClose={onCloseMenu}
          />
        )}
      </div>
    </div>
  </div>
);

// ─── Create group modal content ────────────────────────────────────────────

const CreateGroupModal = ({ onClose, onCreate }: { onClose: () => void; onCreate: (g: Group) => void }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState<"public" | "private">("public");
  const [invitees, setInvitees] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) { toast.error("Group name is required"); return; }
    setLoading(true);
    setTimeout(() => {
      const newGroup: Group = {
        id: Date.now(), name: name.trim().toLowerCase().replace(/\s+/g, "-"),
        description: desc || "No description yet.", members: 1,
        unread: 0, type, lastActive: "just now",
        color: "from-violet-500 to-purple-600", pinned: false,
      };
      onCreate(newGroup);
      toast.success(`# ${newGroup.name} created`);
      onClose();
    }, 800);
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Group name <span className="text-red-400">*</span></label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A] text-[13px]">#</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. customer-success"
            className="w-full h-10 pl-7 pr-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's this group about?"
          className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#9B98B0]">Visibility</label>
        <div className="flex gap-2">
          {(["public", "private"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[13px] transition-all ${
                type === t ? "border-[#7C3AED]/60 bg-[#7C3AED]/10 text-[#C084FC]" : "border-white/[0.08] text-[#635E7A] hover:border-white/[0.15]"
              }`}
            >
              {t === "public" ? <IoGlobeOutline size={14} /> : <IoLockClosedOutline size={14} />}
              <span className="capitalize">{t}</span>
              {type === t && <IoCheckmarkOutline size={13} className="ml-auto" />}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-[#635E7A]">
          {type === "public" ? "Anyone in the workspace can join." : "Members must be invited."}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Invite members <span className="text-[#635E7A] font-normal">(optional)</span></label>
        <textarea
          value={invitees}
          onChange={(e) => setInvitees(e.target.value)}
          placeholder="james, sophia, david…"
          rows={2}
          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50 resize-none"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={onClose}
          className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          disabled={loading}
          className="flex-1 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create group"}
        </button>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Groups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [suggested, setSuggested] = useState(initialSuggested);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const handleGroupClick = (_g: Group) => {
    navigate("/app/personal_chat");
  };

  const handleMute = (id: number) => {
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, muted: !g.muted } : g));
    const g = groups.find((x) => x.id === id)!;
    toast(g.muted ? `# ${g.name} unmuted` : `# ${g.name} muted`);
  };

  const handlePin = (id: number) => {
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, pinned: !g.pinned } : g));
    const g = groups.find((x) => x.id === id)!;
    toast(g.pinned ? `# ${g.name} unpinned` : `# ${g.name} pinned`);
  };

  const handleLeave = (id: number) => {
    const g = groups.find((x) => x.id === id)!;
    setGroups((prev) => prev.filter((x) => x.id !== id));
    toast.success(`Left # ${g.name}`);
  };

  const handleJoin = (name: string) => {
    setSuggested((prev) => prev.filter((s) => s.name !== name));
    const newGroup: Group = {
      id: Date.now(), name,
      description: "Welcome to the group!",
      members: 1, unread: 0, type: "public",
      lastActive: "just now", color: "from-violet-500 to-purple-600",
    };
    setGroups((prev) => [...prev, newGroup]);
    toast.success(`Joined # ${name}`);
  };

  const filtered = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = groups.reduce((a, g) => a + g.unread, 0);

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Groups</h1>
              <p className="text-[14px] text-[#635E7A] mt-1">Channels and groups your team communicates in.</p>
            </div>
            <button
              onClick={() => setCreateOpen(true)}
              className="flex items-center gap-2 h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20"
            >
              <IoAddOutline size={16} />
              New group
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total groups", value: groups.length },
              { label: "You're in", value: Math.min(groups.length, 6) },
              { label: "Unread", value: totalUnread },
            ].map((s) => (
              <div key={s.label} className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl px-5 py-4">
                <p className="text-[24px] font-bold text-[#E8E6F2]">{s.value}</p>
                <p className="text-[12px] text-[#635E7A] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Group list */}
            <div className="lg:col-span-2">
              <div className="relative mb-4">
                <IoSearchOutline size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A]" />
                <input
                  type="text"
                  placeholder="Search groups…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50 transition-colors"
                />
              </div>

              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <h2 className="text-[13px] font-semibold text-[#E8E6F2]">Your groups</h2>
                  <span className="text-[11px] text-[#635E7A]">{filtered.length} of {groups.length}</span>
                </div>
                {filtered.length === 0 ? (
                  <p className="text-[13px] text-[#635E7A] px-4 py-8 text-center">No groups match your search.</p>
                ) : (
                  filtered.map((g) => (
                    <GroupRow
                      key={g.id}
                      g={g}
                      openMenuId={openMenuId}
                      onOpenMenu={setOpenMenuId}
                      onCloseMenu={() => setOpenMenuId(null)}
                      onMute={handleMute}
                      onPin={handlePin}
                      onLeave={handleLeave}
                      onClick={handleGroupClick}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {suggested.length > 0 && (
                <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <h2 className="text-[13px] font-semibold text-[#E8E6F2]">Suggested for you</h2>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {suggested.map((s) => (
                      <div key={s.name} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-[#2D2157] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#C084FC] font-bold text-sm">#</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#E8E6F2] truncate"># {s.name}</p>
                          <p className="text-[11px] text-[#635E7A]">{s.members} members · {s.type}</p>
                        </div>
                        <button
                          onClick={() => handleJoin(s.name)}
                          className="h-7 px-2.5 rounded-lg bg-white/[0.05] hover:bg-[#7C3AED]/20 hover:text-[#C084FC] text-[#9B98B0] text-[11px] font-medium transition-all flex items-center gap-1"
                        >
                          <IoPersonAddOutline size={11} />
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <div className="bg-gradient-to-br from-[#2D1F52] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-5">
                <h3 className="text-[13px] font-semibold text-[#C4C2D4] mb-3">Quick actions</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: IoAddOutline, label: "Create a group", action: () => setCreateOpen(true) },
                    { icon: IoPersonAddOutline, label: "Invite members", action: () => navigate("/app/admin/settings") },
                    { icon: BsChatSquareDots, label: "Browse all groups", action: () => setSearch("") },
                    { icon: IoNotificationsOutline, label: "Notification settings", action: () => navigate("/app/admin/settings") },
                  ].map(({ icon: Icon, label, action }) => (
                    <button key={label} onClick={action} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] transition-all text-[13px] text-[#C4C2D4] text-left">
                      <Icon size={14} className="text-[#A78BFA]" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create group modal */}
      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create a group">
        <CreateGroupModal onClose={() => setCreateOpen(false)} onCreate={(g) => setGroups((prev) => [g, ...prev])} />
      </Modal>
    </ContentLayout>
  );
};

export default Groups;
