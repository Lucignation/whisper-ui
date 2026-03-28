import { FC } from "react";
import {
  HiMagnifyingGlass,
  HiOutlineVideoCamera,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { IoCallOutline, IoChevronBack } from "react-icons/io5";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Conversation } from "../../../../data/ChatData";
import { cn } from "../../../../lib/utils";

interface PanelHeaderProps {
  conversation: Conversation | null;
  onShowDetails?: () => void;
  onBack?: () => void;
  showDetailsButton?: boolean;
}

const ActionButton = ({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) => (
  <button
    aria-label={label}
    onClick={onClick}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-150",
      active
        ? "bg-[#3B2C5C] text-[#C084FC]"
        : "text-[#635E7A] hover:bg-white/[0.06] hover:text-[#9B98B0]"
    )}
  >
    {icon}
  </button>
);

const PanelHeader: FC<PanelHeaderProps> = ({
  conversation,
  onShowDetails,
  onBack,
  showDetailsButton,
}) => {
  const isChannel = conversation?.type === "channel";

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.05] bg-[#1F2231] flex-shrink-0 z-10">

      {/* Mobile back button */}
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Back"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#9B98B0] hover:bg-white/[0.06] transition-all duration-150"
        >
          <IoChevronBack size={20} />
        </button>
      )}

      {/* Avatar / Channel Icon */}
      {conversation ? (
        isChannel ? (
          <div className="w-9 h-9 rounded-xl bg-[#3B2C5C] flex items-center justify-center flex-shrink-0">
            <span className="text-[#C084FC] font-bold text-lg">#</span>
          </div>
        ) : (
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
              {conversation.imageUrl ? (
                <img
                  src={conversation.imageUrl}
                  alt={conversation.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {conversation.displayName.charAt(0)}
                </span>
              )}
            </div>
            {/* Online indicator */}
            <span
              className={cn(
                "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#1F2231]",
                conversation.isOnline ? "bg-[#4ADE80]" : "bg-[#635E7A]"
              )}
            />
          </div>
        )
      ) : null}

      {/* Title + Subtitle */}
      <div className="flex-1 min-w-0">
        {conversation ? (
          <>
            <p className="text-[#E8E6F2] font-semibold text-sm leading-tight truncate">
              {isChannel
                ? `# ${conversation.displayName}`
                : conversation.displayName}
            </p>
            <p className="text-[11px] text-[#635E7A] leading-tight">
              {isChannel
                ? `${conversation.memberCount} members`
                : conversation.isOnline
                ? "Active now"
                : "Offline"}
            </p>
          </>
        ) : (
          <p className="text-[#635E7A] text-sm">Select a conversation</p>
        )}
      </div>

      {/* Action buttons */}
      {conversation && (
        <div className="flex items-center gap-0.5">
          <ActionButton icon={<HiMagnifyingGlass size={17} />} label="Search" />
          <ActionButton icon={<IoCallOutline size={18} />} label="Voice call" />
          <ActionButton icon={<HiOutlineVideoCamera size={18} />} label="Video call" />
          {showDetailsButton !== false && (
            <ActionButton
              icon={<HiOutlineInformationCircle size={18} />}
              label="Member info"
              onClick={onShowDetails}
            />
          )}
          <ActionButton icon={<IoEllipsisHorizontal size={18} />} label="More options" />
        </div>
      )}
    </header>
  );
};

export default PanelHeader;
