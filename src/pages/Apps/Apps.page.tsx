import { useState } from "react";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { toast } from "sonner";
import {
  IoSearchOutline,
  IoAddOutline,
  IoCheckmarkCircle,
  IoStarOutline,
  IoGridOutline,
  IoCodeSlashOutline,
  IoBarChartOutline,
  IoDocumentTextOutline,
  IoCloudOutline,
  IoShieldCheckmarkOutline,
  IoCloseOutline,
  IoOpenOutline,
} from "react-icons/io5";

// ─── Types & data ──────────────────────────────────────────────────────────

interface App {
  id: number;
  name: string;
  description: string;
  longDesc: string;
  category: string;
  rating: number;
  installs: string;
  color: string;
  emoji: string;
  features: string[];
}

const appsData: App[] = [
  { id: 1, name: "GitHub", description: "Get notified about pull requests, issues, and commits directly in Whisper.", longDesc: "Connect GitHub to Whisper and receive instant notifications for pull requests, issues, CI builds, and code reviews — all without leaving your channels.", category: "Developer Tools", rating: 4.9, installs: "120K+", color: "from-slate-600 to-slate-800", emoji: "🐙", features: ["PR review notifications", "Issue tracking in channels", "CI/CD status updates", "Branch mentions"] },
  { id: 2, name: "Jira", description: "Create and manage issues, track sprints, and sync your backlog with channels.", longDesc: "Bring Jira into your Whisper workflow. Create issues, update statuses, and get sprint notifications directly in your project channels.", category: "Project Management", rating: 4.7, installs: "98K+", color: "from-blue-600 to-blue-800", emoji: "📋", features: ["Create issues from messages", "Sprint notifications", "Backlog sync", "Board view in channels"] },
  { id: 3, name: "Google Drive", description: "Share, preview, and collaborate on Google Docs, Sheets and Slides.", longDesc: "Share Drive files in Whisper and get rich previews for Docs, Sheets, and Slides. Comment directly on shared files from your channels.", category: "File Storage", rating: 4.8, installs: "200K+", color: "from-yellow-500 to-orange-600", emoji: "📁", features: ["File previews in chat", "Inline comments", "Permission management", "Real-time collaboration"] },
  { id: 4, name: "Zoom", description: "Launch Zoom meetings and join calls directly from any Whisper channel.", longDesc: "Start or join Zoom meetings with a single click from any Whisper channel or DM. Meeting links are automatically shared with participants.", category: "Video Calls", rating: 4.6, installs: "85K+", color: "from-blue-400 to-cyan-600", emoji: "📹", features: ["One-click meetings", "Auto-share links", "Meeting summaries", "Calendar integration"] },
  { id: 5, name: "Notion", description: "Link Notion pages and databases, and post updates to Whisper channels.", longDesc: "Embed Notion pages and databases in your channels. Get notified when a page is updated or a new entry is added to a database you follow.", category: "Documentation", rating: 4.8, installs: "75K+", color: "from-gray-600 to-gray-800", emoji: "📝", features: ["Page previews", "Database notifications", "Comment sync", "Auto-updates"] },
  { id: 6, name: "Figma", description: "Preview Figma frames and share design updates without leaving Whisper.", longDesc: "Share Figma files in Whisper channels and get live previews of frames, components, and prototypes. Comment on designs without switching tools.", category: "Design", rating: 4.9, installs: "60K+", color: "from-purple-500 to-pink-600", emoji: "🎨", features: ["Frame previews", "Comment threads", "Version notifications", "Prototype sharing"] },
  { id: 7, name: "Linear", description: "Sync Linear issues, projects, and cycles into your workflow channels.", longDesc: "Integrate Linear with Whisper to track engineering velocity in your channels. Get cycle updates, priority changes, and issue assignments in real time.", category: "Project Management", rating: 4.8, installs: "40K+", color: "from-violet-600 to-purple-800", emoji: "⚡", features: ["Cycle updates", "Issue assignment", "Priority alerts", "Roadmap updates"] },
  { id: 8, name: "Datadog", description: "Get real-time alerts and monitoring dashboards in your #devops channel.", longDesc: "Pipe Datadog alerts, anomalies, and monitoring summaries straight into your engineering channels. Never miss an incident with real-time alerting.", category: "Analytics", rating: 4.6, installs: "35K+", color: "from-orange-500 to-red-600", emoji: "📊", features: ["Real-time alerts", "Dashboard snapshots", "Incident management", "SLO tracking"] },
  { id: 9, name: "Sentry", description: "Receive error alerts and crash reports directly in your engineering channels.", longDesc: "Connect Sentry to Whisper for instant error notifications and crash reports in your engineering channels. Assign issues and track resolutions without leaving chat.", category: "Developer Tools", rating: 4.7, installs: "55K+", color: "from-violet-500 to-fuchsia-600", emoji: "🛡️", features: ["Error alerts", "Crash reports", "Issue assignment", "Release tracking"] },
  { id: 10, name: "Salesforce", description: "Track deals, leads, and CRM activity alongside your sales conversations.", longDesc: "Bring CRM data into your sales channels. Get deal updates, lead assignments, and pipeline alerts from Salesforce right where your team communicates.", category: "CRM", rating: 4.5, installs: "30K+", color: "from-blue-500 to-sky-600", emoji: "☁️", features: ["Deal alerts", "Lead tracking", "Pipeline updates", "Contact lookup"] },
  { id: 11, name: "Zapier", description: "Connect Whisper with 5,000+ apps and automate your team's workflows.", longDesc: "Use Zapier to connect Whisper with thousands of other apps and build automated workflows. Trigger messages, channels, and actions from any event in your stack.", category: "Automation", rating: 4.7, installs: "90K+", color: "from-orange-400 to-amber-600", emoji: "⚡", features: ["5,000+ app connections", "Workflow automation", "No-code builder", "Multi-step zaps"] },
  { id: 12, name: "HubSpot", description: "Sync contacts, deals, and pipeline updates to your sales channels.", longDesc: "Integrate HubSpot with Whisper to keep your sales team informed. Get contact updates, deal stage changes, and task reminders in your CRM-linked channels.", category: "CRM", rating: 4.6, installs: "45K+", color: "from-orange-500 to-red-500", emoji: "🧲", features: ["Contact sync", "Deal notifications", "Task reminders", "Pipeline view"] },
];

const initialInstalled = new Set([1, 3, 6]);

const categories = [
  { label: "All", icon: IoGridOutline },
  { label: "Developer Tools", icon: IoCodeSlashOutline },
  { label: "Project Management", icon: IoBarChartOutline },
  { label: "Documentation", icon: IoDocumentTextOutline },
  { label: "File Storage", icon: IoCloudOutline },
  { label: "Analytics", icon: IoBarChartOutline },
  { label: "CRM", icon: IoShieldCheckmarkOutline },
];

// ─── App Detail Modal ──────────────────────────────────────────────────────

const AppDetailModal = ({
  app,
  installed,
  onToggle,
  onClose,
}: {
  app: App;
  installed: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => (
  <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
    {/* Header */}
    <div className="flex items-start gap-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-[26px] flex-shrink-0 shadow-lg`}>
        {app.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[17px] font-bold text-[#E8E6F2]">{app.name}</p>
        <p className="text-[12px] text-[#635E7A]">{app.category}</p>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1">
            <IoStarOutline size={12} className="text-[#F59E0B]" />
            <span className="text-[12px] font-medium text-[#9B98B0]">{app.rating}</span>
          </div>
          <span className="text-[11px] text-[#635E7A]">{app.installs} installs</span>
        </div>
      </div>
    </div>

    <p className="text-[13px] text-[#9B98B0] leading-relaxed">{app.longDesc}</p>

    {/* Features */}
    <div>
      <p className="text-[12px] font-semibold text-[#635E7A] uppercase tracking-wider mb-2">What's included</p>
      <div className="grid grid-cols-2 gap-2">
        {app.features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-[12px] text-[#9B98B0]">
            <IoCheckmarkCircle size={13} className="text-[#4ADE80] flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-2 pt-1">
      <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
        <IoOpenOutline size={14} />
        View docs
      </button>
      <button
        onClick={onToggle}
        className={`flex-1 h-10 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center gap-2 ${
          installed
            ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
            : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-900/20"
        }`}
      >
        {installed ? (
          <><IoCloseOutline size={14} />Remove</>
        ) : (
          <><IoAddOutline size={14} />Add to Whisper</>
        )}
      </button>
    </div>
  </div>
);

// ─── App card ──────────────────────────────────────────────────────────────

const AppCard = ({
  app,
  installed,
  onToggle,
  onOpen,
}: {
  app: App;
  installed: boolean;
  onToggle: (id: number) => void;
  onOpen: (app: App) => void;
}) => (
  <div
    className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.14] transition-all cursor-pointer group flex flex-col gap-4"
    onClick={() => onOpen(app)}
  >
    <div className="flex items-start justify-between gap-3">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-[22px] flex-shrink-0 shadow-lg`}>
        {app.emoji}
      </div>
      {installed ? (
        <span className="flex items-center gap-1 text-[11px] font-medium text-[#4ADE80] bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-lg flex-shrink-0">
          <IoCheckmarkCircle size={11} />
          Installed
        </span>
      ) : (
        <button
          className="flex items-center gap-1 h-7 px-3 rounded-lg bg-[#7C3AED]/20 text-[#C084FC] text-[12px] font-medium hover:bg-[#7C3AED]/40 transition-all flex-shrink-0 opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.stopPropagation(); onToggle(app.id); }}
        >
          <IoAddOutline size={12} />
          Add
        </button>
      )}
    </div>
    <div className="flex-1">
      <p className="text-[14px] font-semibold text-[#E8E6F2] mb-1">{app.name}</p>
      <p className="text-[12px] text-[#635E7A] leading-relaxed line-clamp-2">{app.description}</p>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <IoStarOutline size={12} className="text-[#F59E0B]" />
        <span className="text-[11px] font-medium text-[#9B98B0]">{app.rating}</span>
        <span className="text-[11px] text-[#635E7A] ml-1">{app.installs} installs</span>
      </div>
      <span className="text-[10px] text-[#635E7A] bg-white/[0.04] px-2 py-0.5 rounded-md">{app.category}</span>
    </div>
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────

const Apps = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [installedIds, setInstalledIds] = useState<Set<number>>(initialInstalled);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const toggleInstall = (id: number) => {
    setInstalledIds((prev) => {
      const next = new Set(prev);
      const app = appsData.find((a) => a.id === id)!;
      if (next.has(id)) {
        next.delete(id);
        toast(`${app.name} removed`);
      } else {
        next.add(id);
        toast.success(`${app.name} added to Whisper`);
      }
      return next;
    });
  };

  const toggleFromModal = () => {
    if (!selectedApp) return;
    toggleInstall(selectedApp.id);
    setSelectedApp(null);
  };

  const filtered = appsData.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = appsData.filter((a) => [1, 2, 4].includes(a.id));

  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-6xl mx-auto px-6 py-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Apps & Integrations</h1>
              <p className="text-[14px] text-[#635E7A] mt-1">Connect your favourite tools and automate your team's workflow.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#635E7A]">{installedIds.size} installed</span>
              <button
                onClick={() => setActiveCategory("All")}
                className="flex items-center gap-2 h-9 px-4 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] text-[#9B98B0] text-[13px] font-medium rounded-xl transition-all"
              >
                Manage installed
              </button>
            </div>
          </div>

          {/* Featured banner */}
          <div className="bg-gradient-to-r from-[#2D1F52] via-[#3B2168] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-6 mb-8 flex items-center justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold text-[#A78BFA] uppercase tracking-wider mb-1">Featured this week</p>
              <h2 className="text-[18px] font-bold text-[#E8E6F2] mb-2">GitHub + Whisper</h2>
              <p className="text-[13px] text-[#9B98B0] max-w-sm leading-relaxed">
                Get PR reviews, CI status, and issue updates straight in your channels.
              </p>
              <button
                onClick={() => { toggleInstall(1); }}
                className="mt-4 flex items-center gap-2 h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-[13px] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/30"
              >
                {installedIds.has(1) ? <><IoCheckmarkCircle size={14} />Installed</> : <><IoAddOutline size={15} />Add to Whisper</>}
              </button>
            </div>
            <div className="hidden sm:flex gap-2 flex-shrink-0">
              {featured.map((a) => (
                <button key={a.id} onClick={() => setSelectedApp(a)} className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-[24px] shadow-lg hover:scale-105 transition-transform`}>
                  {a.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Search + categories */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <IoSearchOutline size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A]" />
              <input
                type="text"
                placeholder="Search apps…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-[#7C3AED]/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {categories.map(({ label }) => (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className={`flex-shrink-0 px-3 h-9 rounded-xl text-[12px] font-medium transition-all ${
                    activeCategory === label
                      ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-900/20"
                      : "bg-white/[0.04] text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-[14px] text-[#635E7A]">No apps match your search.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-3 text-[13px] text-[#A78BFA] hover:text-[#C084FC] transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  installed={installedIds.has(app.id)}
                  onToggle={toggleInstall}
                  onOpen={setSelectedApp}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title={selectedApp?.name}>
        {selectedApp && (
          <AppDetailModal
            app={selectedApp}
            installed={installedIds.has(selectedApp.id)}
            onToggle={toggleFromModal}
            onClose={() => setSelectedApp(null)}
          />
        )}
      </Modal>
    </ContentLayout>
  );
};

export default Apps;
