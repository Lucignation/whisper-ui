import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { setSelectedConversation } from "../../../../features/company/companyReducer";
import { Conversation } from "../../../../data/ChatData";
import { cn } from "../../../../lib/utils";

interface PreviewMessageProps {
  chat: Conversation;
  isActive: boolean;
  onSelect: () => void;
}

// ─── Avatar ────────────────────────────────────────────────────────────────────

const Avatar = ({
  imageUrl,
  name,
  isOnline,
  size = "md",
}: {
  imageUrl?: string;
  name: string;
  isOnline?: boolean;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const dotSize = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <div className="relative flex-shrink-0">
      <div
        className={cn(
          dim,
          "rounded-full overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center"
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold text-xs">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={cn(
            dotSize,
            "absolute bottom-0 right-0 rounded-full border-2 border-[#1C1E27]",
            isOnline ? "bg-[#4ADE80]" : "bg-[#635E7A]"
          )}
        />
      )}
    </div>
  );
};

// ─── Channel Icon ──────────────────────────────────────────────────────────────

const ChannelHashIcon = ({ active }: { active: boolean }) => (
  <div
    className={cn(
      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg font-bold transition-colors duration-150",
      active
        ? "bg-[#3B2C5C] text-[#C084FC]"
        : "bg-white/5 text-[#635E7A] group-hover:text-[#9B98B0]"
    )}
  >
    #
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const PreviewMessage = ({ chat, isActive, onSelect }: PreviewMessageProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedConversation(chat));
    onSelect();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-2 py-2 rounded-xl transition-all duration-150 text-left group",
        isActive
          ? "bg-[#2D2157] text-[#E8E6F2]"
          : "text-[#9B98B0] hover:bg-white/[0.04] hover:text-[#E8E6F2]"
      )}
    >
      {/* Icon / Avatar */}
      {chat.type === "channel" ? (
        <ChannelHashIcon active={isActive} />
      ) : (
        <Avatar
          imageUrl={chat.imageUrl}
          name={chat.displayName}
          isOnline={chat.isOnline}
        />
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span
            className={cn(
              "text-sm font-medium truncate",
              isActive ? "text-[#E8E6F2]" : "text-[#C4C2D4] group-hover:text-[#E8E6F2]",
              chat.unreadCount > 0 && "font-semibold text-[#E8E6F2]"
            )}
          >
            {chat.type === "channel" ? `# ${chat.displayName}` : chat.displayName}
          </span>
          <span className="text-[11px] text-[#635E7A] flex-shrink-0">
            {chat.lastMessageTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <p
            className={cn(
              "text-[12px] truncate",
              chat.unreadCount > 0
                ? "text-[#9B98B0] font-medium"
                : "text-[#635E7A]"
            )}
          >
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="flex-shrink-0 h-4 min-w-4 px-1 rounded-full bg-[#7C3AED] text-[10px] font-bold text-white flex items-center justify-center">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default PreviewMessage;
