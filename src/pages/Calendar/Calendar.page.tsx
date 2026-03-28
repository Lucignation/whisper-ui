import { useState } from "react";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoAddOutline,
  IoVideocamOutline,
  IoCallOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoLinkOutline,
  IoCopyOutline,
} from "react-icons/io5";

// ─── Types ─────────────────────────────────────────────────────────────────

type MeetingType = "video" | "call" | "standup";

interface Meeting {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: MeetingType;
  attendees: { initials: string; color: string; name: string }[];
  channel?: string;
  link?: string;
  today?: boolean;
  description?: string;
}

const typeConfig: Record<MeetingType, { icon: React.ElementType; label: string; color: string }> = {
  video: { icon: IoVideocamOutline, label: "Video", color: "text-[#60A5FA] bg-blue-500/10 border-blue-500/20" },
  call: { icon: IoCallOutline, label: "Call", color: "text-[#4ADE80] bg-green-500/10 border-green-500/20" },
  standup: { icon: IoPeopleOutline, label: "Standup", color: "text-[#A78BFA] bg-purple-500/10 border-purple-500/20" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const initialMeetings: Meeting[] = [
  { id: 1, title: "Daily Standup — Engineering", time: "9:00 AM", duration: "15m", type: "standup", channel: "#engineering", today: true, attendees: [{ initials: "JM", color: "from-indigo-500 to-violet-600", name: "James Mide" }, { initials: "SH", color: "from-pink-500 to-rose-600", name: "Sophia Henry" }, { initials: "PF", color: "from-emerald-500 to-teal-600", name: "Peter Femi" }, { initials: "DC", color: "from-blue-500 to-cyan-600", name: "David Chen" }], description: "Daily engineering standup. What did you do yesterday, what will you do today, any blockers?" },
  { id: 2, title: "Product Review Q2 Roadmap", time: "11:00 AM", duration: "1h", type: "video", channel: "#product", today: true, attendees: [{ initials: "DC", color: "from-blue-500 to-cyan-600", name: "David Chen" }, { initials: "SH", color: "from-pink-500 to-rose-600", name: "Sophia Henry" }, { initials: "AO", color: "from-orange-500 to-amber-600", name: "Amara Osei" }], link: "whisper.io/meet/q2-review", description: "Review the Q2 roadmap and align on priorities for the upcoming sprint." },
  { id: 3, title: "1:1 with James Mide", time: "2:00 PM", duration: "30m", type: "call", today: true, attendees: [{ initials: "JM", color: "from-indigo-500 to-violet-600", name: "James Mide" }], description: "Weekly 1:1 check-in." },
  { id: 4, title: "Design System Sync", time: "4:30 PM", duration: "45m", type: "video", channel: "#design", today: true, attendees: [{ initials: "SH", color: "from-pink-500 to-rose-600", name: "Sophia Henry" }, { initials: "AO", color: "from-orange-500 to-amber-600", name: "Amara Osei" }], link: "whisper.io/meet/design-sync", description: "Review latest component updates and design tokens." },
  { id: 5, title: "All-hands — March 2026", time: "10:00 AM", duration: "1h 30m", type: "video", channel: "#general", today: false, attendees: [{ initials: "JM", color: "from-indigo-500 to-violet-600", name: "James Mide" }, { initials: "SH", color: "from-pink-500 to-rose-600", name: "Sophia Henry" }, { initials: "PF", color: "from-emerald-500 to-teal-600", name: "Peter Femi" }, { initials: "DC", color: "from-blue-500 to-cyan-600", name: "David Chen" }, { initials: "AO", color: "from-orange-500 to-amber-600", name: "Amara Osei" }], link: "whisper.io/meet/allhands", description: "Company-wide all-hands. Q1 results, product updates, team highlights." },
];

const TODAY = 28;

// ─── Mini calendar ──────────────────────────────────────────────────────────

const MiniCalendar = ({ onDateClick }: { onDateClick: (d: number) => void }) => {
  const [month, setMonth] = useState(2); // 0-indexed, March = 2
  const [year, setYear] = useState(2026);
  const [selected, setSelected] = useState(TODAY);

  const firstDay = new Date(year, month, 1).getDay();
  const days = DAYS_IN_MONTH[month] + (month === 1 && year % 4 === 0 ? 1 : 0);
  const hasMeeting = (d: number) => month === 2 && year === 2026 && [28, 29, 30].includes(d);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-[#E8E6F2]">{MONTHS[month]} {year}</h3>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="w-6 h-6 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all">
            <IoChevronBackOutline size={13} />
          </button>
          <button onClick={next} className="w-6 h-6 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all">
            <IoChevronForwardOutline size={13} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => <div key={d} className="text-center text-[10px] font-semibold text-[#635E7A] py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const isToday = month === 2 && year === 2026 && d === TODAY;
          const isSel = d === selected;
          const dot = hasMeeting(d) && !isToday;
          return (
            <button
              key={d}
              onClick={() => { setSelected(d); onDateClick(d); }}
              className={`relative h-7 w-7 mx-auto flex items-center justify-center rounded-lg text-[12px] transition-all ${
                isToday ? "bg-[#7C3AED] text-white font-semibold shadow-lg shadow-purple-900/30"
                  : isSel ? "bg-white/[0.10] text-[#E8E6F2]"
                  : "text-[#635E7A] hover:bg-white/[0.05] hover:text-[#9B98B0]"
              }`}
            >
              {d}
              {dot && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7C3AED]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Schedule Meeting Modal ────────────────────────────────────────────────

const ScheduleMeetingModal = ({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (m: Meeting) => void;
}) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState("30m");
  const [type, setType] = useState<MeetingType>("video");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (!title.trim()) { toast.error("Meeting title is required"); return; }
    setLoading(true);
    setTimeout(() => {
      const [h, m] = time.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const displayTime = `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${ampm}`;
      const meeting: Meeting = {
        id: Date.now(),
        title: title.trim(),
        time: displayTime,
        duration,
        type,
        today: true,
        description: desc,
        attendees: [{ initials: "SH", color: "from-pink-500 to-rose-600", name: "You" }],
        link: `whisper.io/meet/${Math.random().toString(36).slice(2, 8)}`,
      };
      onCreate(meeting);
      toast.success(`"${meeting.title}" scheduled for ${displayTime}`);
      onClose();
    }, 700);
  };

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Title <span className="text-red-400">*</span></label>
        <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sprint planning" className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#9B98B0]">Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] outline-none focus:border-[#7C3AED]/50 [color-scheme:dark]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#9B98B0]">Duration</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] outline-none focus:border-[#7C3AED]/50 [color-scheme:dark]">
            {["15m", "30m", "45m", "1h", "1h 30m", "2h"].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-[#9B98B0]">Type</label>
        <div className="flex gap-2">
          {(Object.entries(typeConfig) as [MeetingType, typeof typeConfig[MeetingType]][]).map(([key, { icon: Icon, label }]) => (
            <button key={key} onClick={() => setType(key)} className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border text-[12px] font-medium transition-all ${type === key ? "border-[#7C3AED]/60 bg-[#7C3AED]/10 text-[#C084FC]" : "border-white/[0.08] text-[#635E7A] hover:border-white/[0.15]"}`}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#9B98B0]">Description <span className="text-[#635E7A] font-normal">(optional)</span></label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Agenda, context…" rows={2} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50 resize-none" />
      </div>

      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all">Cancel</button>
        <button onClick={handleCreate} disabled={loading} className="flex-1 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 disabled:opacity-60">
          {loading ? "Scheduling…" : "Schedule meeting"}
        </button>
      </div>
    </div>
  );
};

// ─── Meeting Detail Modal ──────────────────────────────────────────────────

const MeetingDetailModal = ({ meeting, onClose }: { meeting: Meeting; onClose: () => void }) => {
  const cfg = typeConfig[meeting.type];
  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[12px] font-medium ${cfg.color}`}>
          <cfg.icon size={12} />
          {cfg.label}
        </span>
        {meeting.channel && <span className="text-[12px] text-[#635E7A]">{meeting.channel}</span>}
      </div>
      <p className="text-[17px] font-semibold text-[#E8E6F2]">{meeting.title}</p>
      <div className="flex items-center gap-4 text-[13px] text-[#9B98B0]">
        <span>{meeting.time}</span>
        <span>·</span>
        <span>{meeting.duration}</span>
        <span>·</span>
        <span>Today</span>
      </div>
      {meeting.description && <p className="text-[13px] text-[#9B98B0] leading-relaxed border-t border-white/[0.06] pt-4">{meeting.description}</p>}
      <div>
        <p className="text-[12px] font-semibold text-[#635E7A] uppercase tracking-wider mb-2">Attendees ({meeting.attendees.length})</p>
        <div className="flex flex-col gap-2">
          {meeting.attendees.map((a) => (
            <div key={a.name} className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center`}>
                <span className="text-white text-[9px] font-bold">{a.initials}</span>
              </div>
              <span className="text-[13px] text-[#E8E6F2]">{a.name}</span>
            </div>
          ))}
        </div>
      </div>
      {meeting.link && (
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5">
          <IoLinkOutline size={13} className="text-[#635E7A] flex-shrink-0" />
          <span className="text-[12px] text-[#7C3AED] flex-1 truncate">{meeting.link}</span>
          <button onClick={() => { navigator.clipboard.writeText(meeting.link!).catch(() => {}); toast("Link copied"); }} className="flex-shrink-0">
            <IoCopyOutline size={13} className="text-[#635E7A] hover:text-[#9B98B0]" />
          </button>
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all">Close</button>
        <button
          onClick={() => { toast.success(`Joined: ${meeting.title}`); onClose(); }}
          className="flex-1 h-10 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
        >
          <cfg.icon size={14} />
          Join now
        </button>
      </div>
    </div>
  );
};

// ─── Meeting card ──────────────────────────────────────────────────────────

const MeetingCard = ({
  m,
  onDetails,
}: {
  m: Meeting;
  onDetails: (m: Meeting) => void;
}) => {
  const cfg = typeConfig[m.type];
  const shown = m.attendees.slice(0, 3);
  const extra = m.attendees.length - 3;

  return (
    <div className="flex gap-4 group">
      <div className="w-16 flex-shrink-0 text-right pt-0.5">
        <p className="text-[12px] font-semibold text-[#E8E6F2]">{m.time}</p>
        <p className="text-[11px] text-[#635E7A]">{m.duration}</p>
      </div>
      <div className="flex-1 bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-4 hover:border-white/[0.12] transition-all cursor-pointer mb-3" onClick={() => onDetails(m)}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${cfg.color}`}>
                <cfg.icon size={11} />
                {cfg.label}
              </span>
              {m.channel && <span className="text-[11px] text-[#635E7A]">{m.channel}</span>}
            </div>
            <p className="text-[14px] font-semibold text-[#E8E6F2] truncate">{m.title}</p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <div className="flex -space-x-2">
              {shown.map((a, i) => (
                <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${a.color} border-2 border-[#1C1E27] flex items-center justify-center`}>
                  <span className="text-white text-[8px] font-bold">{a.initials}</span>
                </div>
              ))}
            </div>
            {extra > 0 && <span className="ml-1.5 text-[11px] text-[#635E7A]">+{extra}</span>}
          </div>
        </div>
        {m.link && (
          <div className="flex items-center gap-1.5 mt-2">
            <IoLinkOutline size={11} className="text-[#635E7A]" />
            <span className="text-[11px] text-[#7C3AED]">{m.link}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { toast.success(`Joined: ${m.title}`); }}
            className="h-7 px-3 rounded-lg bg-[#7C3AED]/20 text-[#C084FC] text-[12px] font-medium hover:bg-[#7C3AED]/40 transition-all flex items-center gap-1.5"
          >
            <cfg.icon size={12} />
            Join
          </button>
          <button
            onClick={() => onDetails(m)}
            className="h-7 px-3 rounded-lg bg-white/[0.05] text-[#9B98B0] text-[12px] hover:bg-white/[0.10] transition-all"
          >
            Details
          </button>
          {m.link && (
            <button
              onClick={() => { navigator.clipboard.writeText(m.link!).catch(() => {}); toast("Link copied"); }}
              className="h-7 px-3 rounded-lg bg-white/[0.05] text-[#9B98B0] text-[12px] hover:bg-white/[0.10] transition-all flex items-center gap-1"
            >
              <IoCopyOutline size={11} />
              Copy link
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────

const Calendar = () => {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [detailMeeting, setDetailMeeting] = useState<Meeting | null>(null);

  const todaysMeetings = meetings.filter((m) => m.today);
  const upcoming = meetings.filter((m) => !m.today);

  const handleDateClick = (d: number) => {
    if (d !== TODAY) toast(`Viewing March ${d} — no meetings scheduled`);
  };

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-5xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Calendar</h1>
              <p className="text-[14px] text-[#635E7A] mt-1">Meetings, standups, and scheduled calls.</p>
            </div>
            <button onClick={() => setScheduleOpen(true)} className="flex items-center gap-2 h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20">
              <IoAddOutline size={16} />
              Schedule meeting
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-900/30">
                  <span className="text-white font-bold text-[14px]">{TODAY}</span>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#E8E6F2]">Today</p>
                  <p className="text-[12px] text-[#635E7A]">Saturday, March 28 · {todaysMeetings.length} meetings</p>
                </div>
              </div>
              {todaysMeetings.map((m) => <MeetingCard key={m.id} m={m} onDetails={setDetailMeeting} />)}

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider">Upcoming</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              {upcoming.map((m) => <MeetingCard key={m.id} m={m} onDetails={setDetailMeeting} />)}
            </div>

            <div className="flex flex-col gap-5">
              <MiniCalendar onDateClick={handleDateClick} />
              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5">
                <h3 className="text-[13px] font-semibold text-[#E8E6F2] mb-3 flex items-center gap-2">
                  <IoTimeOutline size={14} className="text-[#A78BFA]" />
                  Team time zones
                </h3>
                {[
                  { city: "Lagos", time: "2:30 PM", tz: "WAT", online: true },
                  { city: "London", time: "1:30 PM", tz: "GMT", online: true },
                  { city: "New York", time: "8:30 AM", tz: "EST", online: false },
                  { city: "Singapore", time: "9:30 PM", tz: "SGT", online: true },
                ].map((t) => (
                  <div key={t.city} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${t.online ? "bg-[#4ADE80]" : "bg-[#635E7A]"}`} />
                      <span className="text-[12px] text-[#9B98B0]">{t.city}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-medium text-[#E8E6F2]">{t.time}</p>
                      <p className="text-[10px] text-[#635E7A]">{t.tz}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} title="Schedule a meeting">
        <ScheduleMeetingModal onClose={() => setScheduleOpen(false)} onCreate={(m) => setMeetings((prev) => [...prev, m])} />
      </Modal>

      <Modal isOpen={!!detailMeeting} onClose={() => setDetailMeeting(null)} title="Meeting details">
        {detailMeeting && <MeetingDetailModal meeting={detailMeeting} onClose={() => setDetailMeeting(null)} />}
      </Modal>
    </ContentLayout>
  );
};

export default Calendar;
