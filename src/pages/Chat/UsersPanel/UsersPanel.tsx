import { FC, useState } from "react";
import { HiMagnifyingGlass, HiPlus } from "react-icons/hi2";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import PreviewMessage from "./PreviewMessage/PreviewMessage";
import { channels, directMessages, Conversation } from "../../../data/ChatData";
import { cn } from "../../../lib/utils";

interface UsersPanelProps {
  handleShowUserDetail: () => void;
  onSelectConversation?: () => void;
}

// ─── Collapsible Section ───────────────────────────────────────────────────────

const Section = ({
  title,
  children,
  badge,
}: {
  title: string;
  children: React.ReactNode;
  badge?: number;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-1.5 px-3 py-1 rounded-md text-[#635E7A] hover:text-[#9B98B0] transition-colors duration-150 group"
      >
        <span className="transition-transform duration-200">
          {open ? (
            <IoChevronDown size={13} />
          ) : (
            <IoChevronForward size={13} />
          )}
        </span>
        <span className="text-[11px] font-semibold tracking-widest uppercase flex-1 text-left">
          {title}
        </span>
        {badge !== undefined && badge > 0 && (
          <span className="h-4 min-w-4 px-1 rounded-full bg-[#EF4444] text-[10px] font-bold text-white flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>

      {open && <div className="mt-1">{children}</div>}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────

const UsersPanel: FC<UsersPanelProps> = ({ handleShowUserDetail, onSelectConversation }) => {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filter = (list: Conversation[]) =>
    list.filter((c) =>
      c.displayName.toLowerCase().includes(search.toLowerCase())
    );

  const totalChannelUnread = channels.reduce((s, c) => s + c.unreadCount, 0);
  const totalDMUnread = directMessages.reduce((s, c) => s + c.unreadCount, 0);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelectConversation?.();
    handleShowUserDetail();
  };

  return (
    <div className="flex flex-col h-full">

      {/* ─── Top bar ────────────────────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#E8E6F2] font-semibold text-[15px] tracking-tight">
            Whisper
          </h2>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-[#9B98B0] hover:bg-white/10 hover:text-[#E8E6F2] transition-all duration-150">
            <HiPlus size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <HiMagnifyingGlass
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#635E7A] pointer-events-none"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations…"
            className={cn(
              "pl-9 h-9 text-sm",
              "bg-white/5 border-white/[0.08] text-[#E8E6F2] placeholder:text-[#635E7A]",
              "focus-visible:ring-1 focus-visible:ring-[#7C3AED]/50 focus-visible:border-[#7C3AED]/50",
              "rounded-lg"
            )}
          />
        </div>
      </div>

      {/* ─── Scrollable list ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

        {/* Channels */}
        <Section title="Channels" badge={totalChannelUnread}>
          {filter(channels).map((chat) => (
            <PreviewMessage
              key={chat.id}
              chat={chat}
              isActive={activeId === chat.id}
              onSelect={() => handleSelect(chat.id)}
            />
          ))}
          {filter(channels).length === 0 && (
            <p className="text-[#635E7A] text-xs px-3 py-2">No channels found</p>
          )}
        </Section>

        {/* Direct Messages */}
        <Section title="Direct Messages" badge={totalDMUnread}>
          {filter(directMessages).map((chat) => (
            <PreviewMessage
              key={chat.id}
              chat={chat}
              isActive={activeId === chat.id}
              onSelect={() => handleSelect(chat.id)}
            />
          ))}
          {filter(directMessages).length === 0 && (
            <p className="text-[#635E7A] text-xs px-3 py-2">No direct messages found</p>
          )}
        </Section>
      </div>

      {/* ─── User profile bar ────────────────────────────────────────────────── */}
      <div className="px-3 py-3 border-t border-white/[0.05] flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">SH</span>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#4ADE80] border-2 border-[#1C1E27]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#E8E6F2] text-sm font-medium truncate">Sophia Henry</p>
          <p className="text-[#635E7A] text-xs truncate">Active now</p>
        </div>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-[#635E7A] hover:bg-white/5 hover:text-[#9B98B0] transition-all duration-150">
          <IoChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default UsersPanel;
