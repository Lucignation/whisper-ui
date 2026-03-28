import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoCallOutline,
  IoVideocamOutline,
  IoCallSharp,
  IoArrowUpOutline,
  IoArrowDownOutline,
  IoCloseCircleOutline,
  IoTimeOutline,
  IoPersonAddOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoSearchOutline,
} from "react-icons/io5";

// ─── Types ─────────────────────────────────────────────────────────────────

type CallType = "incoming" | "outgoing" | "missed" | "video";
type Filter = "All" | "Incoming" | "Outgoing" | "Missed" | "Video";

interface CallRecord {
  id: number;
  name: string;
  initials: string;
  color: string;
  type: CallType;
  duration: string;
  time: string;
  date: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

const callData: CallRecord[] = [
  { id: 1, name: "James Mide", initials: "JM", color: "from-indigo-500 to-violet-600", type: "incoming", duration: "12m 44s", time: "9:30 AM", date: "Today" },
  { id: 2, name: "Sophia Henry", initials: "SH", color: "from-pink-500 to-rose-600", type: "video", duration: "45m 02s", time: "11:15 AM", date: "Today" },
  { id: 3, name: "David Chen", initials: "DC", color: "from-blue-500 to-cyan-600", type: "missed", duration: "—", time: "2:00 PM", date: "Today" },
  { id: 4, name: "Peter Femi", initials: "PF", color: "from-emerald-500 to-teal-600", type: "outgoing", duration: "6m 11s", time: "4:45 PM", date: "Yesterday" },
  { id: 5, name: "Amara Osei", initials: "AO", color: "from-orange-500 to-amber-600", type: "incoming", duration: "22m 30s", time: "10:00 AM", date: "Yesterday" },
  { id: 6, name: "Lin Wei", initials: "LW", color: "from-purple-500 to-fuchsia-600", type: "missed", duration: "—", time: "3:15 PM", date: "Yesterday" },
  { id: 7, name: "James Mide", initials: "JM", color: "from-indigo-500 to-violet-600", type: "video", duration: "1h 2m", time: "9:00 AM", date: "Mon, Mar 25" },
  { id: 8, name: "Engineering Team", initials: "ET", color: "from-violet-500 to-purple-600", type: "video", duration: "31m 55s", time: "2:30 PM", date: "Mon, Mar 25" },
];

const teammates = [
  { name: "James Mide", initials: "JM", color: "from-indigo-500 to-violet-600", status: "online" },
  { name: "Sophia Henry", initials: "SH", color: "from-pink-500 to-rose-600", status: "online" },
  { name: "Peter Femi", initials: "PF", color: "from-emerald-500 to-teal-600", status: "away" },
  { name: "David Chen", initials: "DC", color: "from-blue-500 to-cyan-600", status: "online" },
  { name: "Amara Osei", initials: "AO", color: "from-orange-500 to-amber-600", status: "offline" },
  { name: "Lin Wei", initials: "LW", color: "from-purple-500 to-fuchsia-600", status: "online" },
];

const callTypeConfig: Record<CallType, { icon: React.ElementType; color: string; label: string }> = {
  incoming: { icon: IoArrowDownOutline, color: "text-[#4ADE80]", label: "Incoming" },
  outgoing: { icon: IoArrowUpOutline, color: "text-[#A78BFA]", label: "Outgoing" },
  missed: { icon: IoCloseCircleOutline, color: "text-[#F87171]", label: "Missed" },
  video: { icon: IoVideocamOutline, color: "text-[#60A5FA]", label: "Video" },
};

const filterMap: Record<Filter, CallType | null> = {
  All: null, Incoming: "incoming", Outgoing: "outgoing", Missed: "missed", Video: "video",
};

// ─── New Call Modal ────────────────────────────────────────────────────────

const NewCallModal = ({ onClose, isVideo }: { onClose: () => void; isVideo?: boolean }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [video, setVideo] = useState(isVideo ?? false);

  const filtered = teammates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCall = () => {
    if (!selected) { toast.error("Select a person to call"); return; }
    toast.success(`Starting ${video ? "video" : "voice"} call with ${selected}…`);
    onClose();
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      {/* Call type toggle */}
      <div className="flex gap-2">
        {[
          { label: "Voice", icon: IoCallOutline, val: false },
          { label: "Video", icon: IoVideocamOutline, val: true },
        ].map(({ label, icon: Icon, val }) => (
          <button
            key={label}
            onClick={() => setVideo(val)}
            className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-xl text-[13px] font-medium border transition-all ${
              video === val
                ? "bg-[#7C3AED]/20 border-[#7C3AED]/60 text-[#C084FC]"
                : "border-white/[0.08] text-[#635E7A] hover:border-white/[0.15]"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Search teammates */}
      <div className="relative">
        <IoSearchOutline size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A]" />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teammates…"
          className="w-full h-9 pl-8 pr-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50"
        />
      </div>

      {/* Teammate list */}
      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
        {filtered.map((t) => (
          <button
            key={t.name}
            onClick={() => setSelected(t.name)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left ${
              selected === t.name ? "bg-[#7C3AED]/20 border border-[#7C3AED]/40" : "hover:bg-white/[0.04] border border-transparent"
            }`}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-[10px] font-bold">{t.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#E8E6F2]">{t.name}</p>
            </div>
            <span className={`w-2 h-2 rounded-full ${t.status === "online" ? "bg-[#4ADE80]" : t.status === "away" ? "bg-[#F59E0B]" : "bg-[#635E7A]"}`} />
          </button>
        ))}
      </div>

      <button
        onClick={handleCall}
        disabled={!selected}
        className="w-full h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {video ? <IoVideocamOutline size={15} /> : <IoCallOutline size={15} />}
        {video ? "Start video call" : "Call now"}
      </button>
    </div>
  );
};

// ─── Start Meeting Modal ───────────────────────────────────────────────────

const StartMeetingModal = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const link = `whisper.io/meet/${Math.random().toString(36).slice(2, 8)}`;

  const handleStart = () => {
    toast.success(`Meeting "${title || "Untitled"}" started — link copied`);
    navigator.clipboard.writeText(link).catch(() => {});
    onClose();
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Meeting title</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Sprint planning"
          className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Meeting link</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-10 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-[13px] text-[#635E7A] flex items-center truncate">
            {link}
          </div>
          <button
            onClick={() => { navigator.clipboard.writeText(link).catch(() => {}); toast("Link copied"); }}
            className="h-10 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#9B98B0] text-[13px] font-medium transition-all flex-shrink-0"
          >
            Copy
          </button>
        </div>
      </div>
      <button
        onClick={handleStart}
        className="w-full h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
      >
        <IoVideocamOutline size={15} />
        Start meeting now
      </button>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Calls = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("All");
  const [newCallOpen, setNewCallOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [, setCallbackVideo] = useState(false);

  const dateGroups = [...new Set(callData.map((c) => c.date))];

  const visible = callData.filter((c) => {
    const ft = filterMap[filter];
    return ft === null || c.type === ft;
  });

  const handleCallback = (c: CallRecord, video = false) => {
    setCallbackVideo(video);
    toast.success(`Calling ${c.name}…`);
    setTimeout(() => navigate("/app/personal_chat"), 500);
  };

  const missedCount = callData.filter((c) => c.type === "missed").length;

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Calls</h1>
              <p className="text-[14px] text-[#635E7A] mt-1">Voice and video calls with your team.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNewCallOpen(true)}
                className="flex items-center gap-2 h-9 px-4 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#E8E6F2] text-[13px] font-medium rounded-xl transition-all"
              >
                <IoCallOutline size={15} />
                New call
              </button>
              <button
                onClick={() => setMeetingOpen(true)}
                className="flex items-center gap-2 h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20"
              >
                <IoVideocamOutline size={15} />
                Start meeting
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-5 bg-white/[0.03] rounded-xl p-1 w-fit">
            {(Object.keys(filterMap) as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                  filter === f ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/20" : "text-[#635E7A] hover:text-[#9B98B0]"
                }`}
              >
                {f}
                {f === "Missed" && missedCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#F87171]/20 text-[#F87171] text-[9px] font-bold">
                    {missedCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Total calls", value: callData.length, color: "text-[#E8E6F2]" },
                  { label: "Missed", value: missedCount, color: "text-[#F87171]" },
                  { label: "Avg duration", value: "18m", color: "text-[#4ADE80]" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl px-4 py-3.5">
                    <p className={`text-[22px] font-bold ${s.color}`}>{s.value}</p>
                    <p className="text-[12px] text-[#635E7A] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <h2 className="text-[13px] font-semibold text-[#E8E6F2]">Recent calls</h2>
                </div>

                {visible.length === 0 ? (
                  <p className="text-[13px] text-[#635E7A] text-center py-12">No calls in this category.</p>
                ) : (
                  dateGroups.map((date) => {
                    const rows = visible.filter((c) => c.date === date);
                    if (rows.length === 0) return null;
                    return (
                      <div key={date}>
                        <div className="px-4 py-2 bg-white/[0.02]">
                          <span className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider">{date}</span>
                        </div>
                        {rows.map((c) => {
                          const cfg = callTypeConfig[c.type];
                          return (
                            <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-white/[0.04] last:border-0 group">
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-white text-[11px] font-bold">{c.initials}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-[#E8E6F2] truncate">{c.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <cfg.icon size={11} className={cfg.color} />
                                  <span className={`text-[11px] ${cfg.color}`}>{cfg.label}</span>
                                  {c.duration !== "—" && (
                                    <><span className="text-[#635E7A] text-[11px]">·</span>
                                    <span className="text-[11px] text-[#635E7A]">{c.duration}</span></>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-[11px] text-[#635E7A]">{c.time}</span>
                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleCallback(c); }}
                                    title="Voice call back"
                                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#7C3AED]/20 text-[#C084FC] hover:bg-[#7C3AED]/40 transition-all"
                                  >
                                    <IoCallSharp size={12} />
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); handleCallback(c, true); }}
                                    title="Video call back"
                                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#7C3AED]/20 text-[#C084FC] hover:bg-[#7C3AED]/40 transition-all"
                                  >
                                    <IoVideocamOutline size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right panel */}
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-br from-[#2D1F52] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-5">
                <h3 className="text-[13px] font-semibold text-[#C4C2D4] mb-3">Start a call</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: IoCallOutline, label: "Voice call", action: () => setNewCallOpen(true) },
                    { icon: IoVideocamOutline, label: "Video call", action: () => setMeetingOpen(true) },
                    { icon: IoPersonAddOutline, label: "Group call", action: () => setMeetingOpen(true) },
                    { icon: IoMicOutline, label: "Audio only", action: () => setNewCallOpen(true) },
                  ].map(({ icon: Icon, label, action }) => (
                    <button key={label} onClick={action} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] transition-all text-[13px] text-[#C4C2D4] text-left">
                      <Icon size={14} className="text-[#A78BFA]" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5">
                <h3 className="text-[13px] font-semibold text-[#E8E6F2] mb-3">Call types</h3>
                <div className="flex flex-col gap-2.5">
                  {Object.entries(callTypeConfig).map(([key, { icon: Icon, color, label }]) => (
                    <div key={key} className="flex items-center gap-2.5">
                      <Icon size={14} className={color} />
                      <span className="text-[12px] text-[#9B98B0]">{label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5">
                    <IoTimeOutline size={14} className="text-[#635E7A]" />
                    <span className="text-[12px] text-[#9B98B0]">Duration shown per call</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <IoVideocamOffOutline size={18} className="text-[#A78BFA] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-medium text-[#E8E6F2] mb-1">HD video calls</p>
                    <p className="text-[12px] text-[#635E7A] leading-relaxed">
                      Upgrade to Pro for HD video, recording, and calls up to 100 participants.
                    </p>
                    <button
                      onClick={() => navigate("/app/admin/settings")}
                      className="mt-3 text-[12px] text-[#A78BFA] font-medium hover:text-[#C084FC] transition-colors"
                    >
                      Upgrade now →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={newCallOpen} onClose={() => setNewCallOpen(false)} title="New call">
        <NewCallModal onClose={() => setNewCallOpen(false)} />
      </Modal>
      <Modal isOpen={meetingOpen} onClose={() => setMeetingOpen(false)} title="Start a meeting">
        <StartMeetingModal onClose={() => setMeetingOpen(false)} />
      </Modal>
    </ContentLayout>
  );
};

export default Calls;
