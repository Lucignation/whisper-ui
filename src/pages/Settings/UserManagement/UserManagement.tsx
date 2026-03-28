import { useState, useRef, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoPersonAddOutline,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoPersonOutline,
  IoEllipsisVertical,
  IoCheckmarkOutline,
  IoTrashOutline,
  IoBanOutline,
} from "react-icons/io5";

// ─── Types ─────────────────────────────────────────────────────────────────

type Role = "Owner" | "Admin" | "Member";
type Status = "Active" | "Pending" | "Deactivated";

interface Member {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  initials: string;
  color: string;
  joined: string;
}

const initialMembers: Member[] = [
  { id: 1, name: "James Mide", email: "james@whisper.io", role: "Owner", status: "Active", initials: "JM", color: "from-indigo-500 to-violet-600", joined: "Jan 2024" },
  { id: 2, name: "Sophia Henry", email: "sophia@whisper.io", role: "Admin", status: "Active", initials: "SH", color: "from-pink-500 to-rose-600", joined: "Feb 2024" },
  { id: 3, name: "Peter Femi", email: "peter@whisper.io", role: "Member", status: "Active", initials: "PF", color: "from-emerald-500 to-teal-600", joined: "Mar 2024" },
  { id: 4, name: "David Chen", email: "david@whisper.io", role: "Member", status: "Active", initials: "DC", color: "from-blue-500 to-cyan-600", joined: "Mar 2024" },
  { id: 5, name: "Amara Osei", email: "amara@whisper.io", role: "Member", status: "Active", initials: "AO", color: "from-orange-500 to-amber-600", joined: "Apr 2024" },
  { id: 6, name: "Lin Wei", email: "lin@whisper.io", role: "Member", status: "Pending", initials: "LW", color: "from-purple-500 to-fuchsia-600", joined: "—" },
  { id: 7, name: "Marcus Silva", email: "marcus@whisper.io", role: "Member", status: "Deactivated", initials: "MS", color: "from-slate-500 to-slate-600", joined: "Dec 2023" },
];

// ─── Badges ────────────────────────────────────────────────────────────────

const RoleBadge = ({ role }: { role: Role }) => {
  const styles: Record<Role, string> = {
    Owner: "bg-[#7C3AED]/20 text-[#C084FC] border border-[#7C3AED]/30",
    Admin: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Member: "bg-white/[0.04] text-[#9B98B0] border border-white/[0.08]",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${styles[role]}`}>
      {role !== "Member" ? <IoShieldCheckmarkOutline size={10} /> : <IoPersonOutline size={10} />}
      {role}
    </span>
  );
};

const StatusBadge = ({ status }: { status: Status }) => {
  const styles: Record<Status, string> = {
    Active: "text-[#4ADE80]", Pending: "text-[#F59E0B]", Deactivated: "text-[#635E7A]",
  };
  const dots: Record<Status, string> = {
    Active: "bg-[#4ADE80]", Pending: "bg-[#F59E0B]", Deactivated: "bg-[#635E7A]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
};

// ─── Row menu ──────────────────────────────────────────────────────────────

const RowMenu = ({
  member,
  onChangeRole,
  onToggleStatus,
  onRemove,
  onClose,
}: {
  member: Member;
  onChangeRole: (role: Role) => void;
  onToggleStatus: () => void;
  onRemove: () => void;
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

  const roles: Role[] = ["Member", "Admin", "Owner"];

  return (
    <div ref={ref} className="absolute right-0 top-8 z-30 w-52 bg-[#252836] border border-white/[0.08] rounded-xl shadow-2xl py-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div className="px-3 py-1.5">
        <p className="text-[10px] font-semibold text-[#635E7A] uppercase tracking-wider">Change role</p>
      </div>
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => { onChangeRole(r); onClose(); }}
          className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-[#9B98B0] hover:bg-white/[0.06] transition-colors"
        >
          <span>{r}</span>
          {member.role === r && <IoCheckmarkOutline size={13} className="text-[#7C3AED]" />}
        </button>
      ))}
      <div className="border-t border-white/[0.06] mt-1 pt-1">
        <button
          onClick={() => { onToggleStatus(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#F59E0B] hover:bg-white/[0.06] transition-colors"
        >
          <IoBanOutline size={13} />
          {member.status === "Deactivated" ? "Reactivate" : "Deactivate"}
        </button>
        <button
          onClick={() => { onRemove(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-white/[0.06] transition-colors"
        >
          <IoTrashOutline size={13} />
          Remove from workspace
        </button>
      </div>
    </div>
  );
};

// ─── Invite member modal ───────────────────────────────────────────────────

const InviteMemberModal = ({ onClose, onInvite }: { onClose: () => void; onInvite: (email: string, role: Role) => void }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Member");
  const [loading, setLoading] = useState(false);

  const handleInvite = () => {
    if (!email.trim().includes("@")) { toast.error("Enter a valid email"); return; }
    setLoading(true);
    setTimeout(() => {
      onInvite(email.trim(), role);
      toast.success(`Invite sent to ${email.trim()}`);
      onClose();
    }, 700);
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Email address <span className="text-red-400">*</span></label>
        <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="teammate@company.com" onKeyDown={(e) => { if (e.key === "Enter") handleInvite(); }} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Role</label>
        <div className="flex gap-2">
          {(["Member", "Admin"] as Role[]).map((r) => (
            <button key={r} onClick={() => setRole(r)} className={`flex-1 h-9 rounded-xl border text-[13px] font-medium transition-all ${role === r ? "border-[#7C3AED]/60 bg-[#7C3AED]/10 text-[#C084FC]" : "border-white/[0.08] text-[#635E7A] hover:border-white/[0.15]"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all">Cancel</button>
        <button onClick={handleInvite} disabled={loading} className="flex-1 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 disabled:opacity-60">
          {loading ? "Sending…" : "Send invite"}
        </button>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const UserManagement = () => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const changeRole = (id: number, role: Role) => {
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, role } : m));
    const m = members.find((x) => x.id === id)!;
    toast.success(`${m.name} is now ${role}`);
  };

  const toggleStatus = (id: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "Deactivated" ? "Active" : "Deactivated" } : m
      )
    );
    const m = members.find((x) => x.id === id)!;
    toast(m.status === "Deactivated" ? `${m.name} reactivated` : `${m.name} deactivated`);
  };

  const removeMember = (id: number) => {
    const m = members.find((x) => x.id === id)!;
    setMembers((prev) => prev.filter((x) => x.id !== id));
    toast.success(`${m.name} removed from workspace`);
  };

  const handleInvite = (email: string, role: Role) => {
    const initials = email.slice(0, 2).toUpperCase();
    const newMember: Member = {
      id: Date.now(), name: email.split("@")[0], email, role,
      status: "Pending", initials, color: "from-violet-500 to-purple-600", joined: "—",
    };
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[15px] font-semibold text-[#E8E6F2]">Team members</h2>
          <p className="text-[13px] text-[#635E7A] mt-0.5">{members.length} members in this workspace</p>
        </div>
        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20 flex-shrink-0"
        >
          <IoPersonAddOutline size={15} />
          Invite member
        </button>
      </div>

      <div className="relative mb-4">
        <IoSearchOutline size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A]" />
        <input
          type="text"
          placeholder="Search members…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-9 pl-9 pr-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50 transition-colors"
        />
      </div>

      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
          <span className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider">Member</span>
          <span className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider w-20 text-center">Role</span>
          <span className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider w-24 text-center">Status</span>
          <span className="w-8" />
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[13px] text-[#635E7A]">No members match your search.</div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 items-center border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-[11px] font-bold">{m.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#E8E6F2] truncate">{m.name}</p>
                  <p className="text-[11px] text-[#635E7A] truncate">{m.email}</p>
                </div>
              </div>
              <div className="w-20 flex justify-center"><RoleBadge role={m.role} /></div>
              <div className="w-24 flex justify-center"><StatusBadge status={m.status} /></div>
              <div className="relative w-8">
                {m.role !== "Owner" && (
                  <button
                    onClick={() => setOpenMenuId(openMenuId === m.id ? null : m.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all"
                  >
                    <IoEllipsisVertical size={15} />
                  </button>
                )}
                {openMenuId === m.id && (
                  <RowMenu
                    member={m}
                    onChangeRole={(role) => changeRole(m.id, role)}
                    onToggleStatus={() => toggleStatus(m.id)}
                    onRemove={() => removeMember(m.id)}
                    onClose={() => setOpenMenuId(null)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite member">
        <InviteMemberModal onClose={() => setInviteOpen(false)} onInvite={handleInvite} />
      </Modal>
    </div>
  );
};

export default UserManagement;
