import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { selectCompanyValue } from "../../../features/companySelectors";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  IoClose,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { cn } from "../../../lib/utils";

interface CoWorkerInformationProps {
  showUserDetail: boolean;
  onClose?: () => void;
}

// ─── Shared files mock ─────────────────────────────────────────────────────────

const sharedFiles = [
  { name: "Q1-Report.pdf", size: "2.4 MB", type: "pdf" },
  { name: "Design-Spec.fig", size: "14 MB", type: "fig" },
  { name: "Screenshot.png", size: "820 KB", type: "img" },
];

const FileIcon = ({ type }: { type: string }) => {
  const colors: Record<string, string> = {
    pdf: "bg-red-900/40 text-red-400",
    fig: "bg-purple-900/40 text-purple-400",
    img: "bg-blue-900/40 text-blue-400",
  };
  const labels: Record<string, string> = {
    pdf: "PDF",
    fig: "FIG",
    img: "IMG",
  };
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0",
        colors[type] || "bg-white/10 text-white/60"
      )}
    >
      {labels[type] || "FILE"}
    </div>
  );
};

// ─── Info Row ──────────────────────────────────────────────────────────────────

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0">
    <span className="text-[#635E7A] mt-0.5 flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-[13px] text-[#C4C2D4] truncate">{value}</p>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const CoWorkerInformation = ({
  showUserDetail,
  onClose,
}: CoWorkerInformationProps) => {
  const appState = useSelector((state: RootState) => selectCompanyValue(state));
  const conversation = appState.selectedConversation;

  if (!showUserDetail) {
    return (
      <div className="flex flex-col h-full p-4 gap-3">
        <Skeleton className="h-24 w-full bg-white/[0.05] rounded-2xl" />
        <Skeleton className="h-4 w-3/4 bg-white/[0.04]" />
        <Skeleton className="h-4 w-1/2 bg-white/[0.04]" />
        <Skeleton className="h-4 w-2/3 bg-white/[0.04]" />
        <div className="mt-4">
          <Skeleton className="h-32 w-full bg-white/[0.05] rounded-2xl" />
        </div>
      </div>
    );
  }

  const displayName =
    conversation?.displayName || conversation?.name || "James Odun";
  const isChannel = conversation?.type === "channel";

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05] flex-shrink-0">
        <h3 className="text-[#E8E6F2] font-semibold text-sm">
          {isChannel ? "Channel info" : "Profile"}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#635E7A] hover:bg-white/[0.06] hover:text-[#9B98B0] transition-all duration-150"
          >
            <IoClose size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile section */}
        <div className="px-4 py-6 flex flex-col items-center text-center border-b border-white/[0.05]">
          <div className="relative mb-3">
            {isChannel ? (
              <div className="w-16 h-16 rounded-2xl bg-[#3B2C5C] flex items-center justify-center">
                <span className="text-[#C084FC] font-bold text-3xl">#</span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                  {conversation?.imageUrl ? (
                    <img
                      src={conversation.imageUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {displayName.charAt(0)}
                    </span>
                  )}
                </div>
                {/* Online badge */}
                <span
                  className={cn(
                    "absolute bottom-1 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#1C1E27]",
                    conversation?.isOnline ? "bg-[#4ADE80]" : "bg-[#635E7A]"
                  )}
                />
              </>
            )}
          </div>

          <h2 className="text-[#E8E6F2] font-semibold text-base leading-tight">
            {isChannel ? `# ${displayName}` : displayName}
          </h2>
          <p className="text-[#635E7A] text-xs mt-1">
            {isChannel
              ? `${conversation?.memberCount || 0} members`
              : conversation?.isOnline
              ? "🟢 Active now"
              : "⚫ Offline"}
          </p>

          {/* Quick actions */}
          {!isChannel && (
            <div className="flex items-center gap-3 mt-4">
              <button className="flex flex-col items-center gap-1 group">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#635E7A] group-hover:bg-[#3B2C5C] group-hover:text-[#C084FC] transition-all duration-150">
                  <IoCallOutline size={18} />
                </span>
                <span className="text-[10px] text-[#635E7A]">Call</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#635E7A] group-hover:bg-[#3B2C5C] group-hover:text-[#C084FC] transition-all duration-150">
                  <IoMailOutline size={18} />
                </span>
                <span className="text-[10px] text-[#635E7A]">Email</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#635E7A] group-hover:bg-[#3B2C5C] group-hover:text-[#C084FC] transition-all duration-150">
                  <IoDocumentTextOutline size={18} />
                </span>
                <span className="text-[10px] text-[#635E7A]">Files</span>
              </button>
            </div>
          )}
        </div>

        {/* Contact details (DM only) */}
        {!isChannel && (
          <div className="px-4 py-2">
            <InfoRow
              icon={<IoMailOutline size={16} />}
              label="Email"
              value="samuel@whisper.com"
            />
            <InfoRow
              icon={<IoCallOutline size={16} />}
              label="Mobile"
              value="+234 (0) 807 382 9943"
            />
            <InfoRow
              icon={<IoLocationOutline size={16} />}
              label="Location"
              value="Manchester, UK"
            />
            <InfoRow
              icon={<IoPeopleOutline size={16} />}
              label="Reports to"
              value="James Henry"
            />
          </div>
        )}

        {/* Shared files */}
        <div className="px-4 py-4 mt-2">
          <h4 className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider mb-3">
            Shared Files
          </h4>
          <div className="space-y-2">
            {sharedFiles.map((file) => (
              <button
                key={file.name}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all duration-150 text-left"
              >
                <FileIcon type={file.type} />
                <div className="min-w-0">
                  <p className="text-[13px] text-[#C4C2D4] font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-[#635E7A]">{file.size}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Channel description (channels only) */}
        {isChannel && (
          <div className="px-4 py-4">
            <h4 className="text-[11px] font-semibold text-[#635E7A] uppercase tracking-wider mb-3">
              Description
            </h4>
            <p className="text-[13px] text-[#9B98B0] leading-relaxed">
              {conversation?.type === "channel"
                ? `Workspace-wide updates, announcements, and conversations for the ${conversation.displayName} team.`
                : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoWorkerInformation;
