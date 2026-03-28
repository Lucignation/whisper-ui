import { useState } from "react";
import { IoCheckmarkDone } from "react-icons/io5";
import ReactionPicker from "../../../../components/ReactionPicker/ReactionPicker";
import { cn } from "../../../../lib/utils";

interface MessageCardProps {
  conversation: any;
  onReact: (messageId: number, emoji: string) => void;
  prevMessage?: any;
}

const LOGGED_IN_USER = "Sophia";

// ─── Avatar ────────────────────────────────────────────────────────────────────

const Avatar = ({
  name,
  imageUrl,
  size = "md",
}: {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "w-7 h-7 text-[10px]" : "w-9 h-9 text-xs";

  return (
    <div
      className={cn(
        dim,
        "rounded-full overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0"
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

// ─── Reaction Badge ────────────────────────────────────────────────────────────

const ReactionBadge = ({
  emoji,
  users,
  onClick,
  reacted,
}: {
  emoji: string;
  users: string[];
  onClick: () => void;
  reacted: boolean;
}) => {
  if (users.length === 0) return null;
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] border transition-all duration-150",
        reacted
          ? "bg-[#3B2C5C] border-[#7C3AED]/50 text-[#C084FC]"
          : "bg-white/5 border-white/10 text-[#9B98B0] hover:bg-white/10 hover:border-white/20"
      )}
    >
      <span>{emoji}</span>
      <span className="font-medium">{users.length}</span>
    </button>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

const MessageCard = ({ conversation, onReact, prevMessage }: MessageCardProps) => {
  const [showActions, setShowActions] = useState(false);
  const userId = "user1";

  const isSelf = conversation.name === LOGGED_IN_USER;
  // Group consecutive messages from same sender (collapse avatar/name)
  const isGrouped =
    prevMessage && prevMessage.name === conversation.name;

  const hasReactions = Object.values(conversation.reactions || {}).some(
    (users: any) => users.length > 0
  );

  return (
    <div
      className={cn(
        "relative flex gap-3 px-4 group",
        isSelf ? "flex-row-reverse" : "flex-row",
        isGrouped ? "mt-0.5" : "mt-4"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar — show for non-self, hide when grouped */}
      <div className={cn("w-9 flex-shrink-0", isSelf && "hidden")}>
        {!isGrouped ? (
          <Avatar
            name={conversation.name}
            imageUrl={conversation.imageUrl}
          />
        ) : (
          /* Placeholder so columns stay aligned */
          <div className="w-9" />
        )}
      </div>

      {/* Message content */}
      <div className={cn("flex flex-col max-w-[70%] md:max-w-[60%]", isSelf && "items-end")}>
        {/* Sender name + time (only on first in group) */}
        {!isGrouped && (
          <div
            className={cn(
              "flex items-baseline gap-2 mb-1",
              isSelf ? "flex-row-reverse" : "flex-row"
            )}
          >
            <span className="text-[13px] font-semibold text-[#E8E6F2]">
              {isSelf ? "You" : conversation.name}
            </span>
            <span className="text-[11px] text-[#635E7A]">{conversation.time}</span>
          </div>
        )}

        {/* Bubble */}
        <div className="relative">
          <div
            className={cn(
              "px-4 py-2.5 rounded-2xl text-sm leading-relaxed transition-all duration-150",
              isSelf
                ? "bg-gradient-to-br from-[#4B1D96] to-[#3B1F6B] text-white rounded-tr-md"
                : "bg-[#2A2D3E] text-[#D8D5E8] rounded-tl-md",
              isGrouped && (isSelf ? "rounded-tr-2xl" : "rounded-tl-2xl")
            )}
          >
            {conversation.message}

            {/* Read receipt (self only) */}
            {isSelf && (
              <span className="inline-flex items-center ml-2 opacity-70">
                <IoCheckmarkDone size={14} className="text-[#A78BFA]" />
              </span>
            )}
          </div>

          {/* Hover time stamp (grouped messages) */}
          {isGrouped && showActions && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-[10px] text-[#635E7A] pointer-events-none whitespace-nowrap",
                isSelf ? "right-full mr-2" : "left-full ml-2"
              )}
            >
              {conversation.time}
            </span>
          )}

          {/* Hover action bar */}
          {showActions && (
            <div
              className={cn(
                "absolute -top-8 flex items-center gap-0.5 bg-[#1C1E27] border border-white/10 rounded-xl px-1 py-0.5 shadow-xl z-10",
                isSelf ? "right-0" : "left-0"
              )}
            >
              <ReactionPicker
                messageId={conversation.id}
                onReact={onReact}
              />
            </div>
          )}
        </div>

        {/* Reactions */}
        {hasReactions && (
          <div className={cn("flex flex-wrap gap-1 mt-1.5", isSelf && "justify-end")}>
            {Object.entries(conversation.reactions).map(
              ([emoji, users]: any) => (
                <ReactionBadge
                  key={emoji}
                  emoji={emoji}
                  users={users}
                  reacted={users.includes(userId)}
                  onClick={() => onReact(conversation.id, emoji)}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Online dot (other user, first in group) */}
      {!isSelf && !isGrouped && (
        <span className="absolute bottom-0 left-[46px] w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-[#1F2231]" />
      )}
    </div>
  );
};

export default MessageCard;
