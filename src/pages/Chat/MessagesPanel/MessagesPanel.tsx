import { FC, useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { selectCompanyValue } from "../../../features/companySelectors";
import { Textarea } from "../../../components/ui/textarea";
import { IoMdSend } from "react-icons/io";
import { TiAttachment } from "react-icons/ti";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import MessageCard from "./MessageCard/MessageCard";
import PanelHeader from "./PanelHeader/PanelHeader";
import EmptyChat from "../EmptyChat/EmptyChat";
import MessageDateTime from "./MessageDateTime/MessageDateTime";
import TypingIndicator from "./TypingIndicator/TypingIndicator";
import { groupMessagesByDate } from "../../../utils/helper";
import { Message } from "../../../data/ChatData";

interface MessagesPanelProps {
  onShowDetails?: () => void;
  onBack?: () => void;
  showDetailsButton?: boolean;
}

const MessagesPanel: FC<MessagesPanelProps> = ({
  onShowDetails,
  onBack,
  showDetailsButton,
}) => {
  const appState = useSelector((state: RootState) => selectCompanyValue(state));
  const [conversation, setConversation] = useState<any>(null);
  const [groupedMessages, setGroupedMessages] = useState<any>(null);
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiHint, setShowEmojiHint] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const simulatedTypingRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = "user1";

  // Sync selected conversation from Redux
  useEffect(() => {
    const selected = appState.selectedConversation;
    if (selected && selected.id) {
      setConversation(selected);
      const grouped = groupMessagesByDate(selected.messages);
      setGroupedMessages(grouped);
    }
  }, [appState.selectedConversation]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupedMessages]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Simulate the other person "seeing" you type after 1s
    typingTimeoutRef.current = setTimeout(() => {
      if (e.target.value.trim()) {
        // Simulate other person typing response after 2s
        if (simulatedTypingRef.current) clearTimeout(simulatedTypingRef.current);
        simulatedTypingRef.current = setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }, 2000);
      }
    }, 500);
  };

  const handleSend = useCallback(() => {
    if (!value.trim() || !conversation) return;

    const newMessage: Message = {
      id: Date.now(),
      name: "Sophia",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date().toISOString(),
      message: value.trim(),
      reactions: {},
    };

    const updated = {
      ...conversation,
      messages: [...(conversation.messages || []), newMessage],
      lastMessage: `You: ${value.trim()}`,
      lastMessageTime: "Just now",
    };

    setConversation(updated);
    setGroupedMessages(groupMessagesByDate(updated.messages));
    setValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, conversation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReact = (messageId: number, emoji: string) => {
    setConversation((prev: any) => {
      if (!prev) return prev;
      const updatedMessages = prev.messages.map((msg: Message) => {
        if (msg.id !== messageId) return msg;
        const users: string[] = msg.reactions[emoji] || [];
        const hasReacted = users.includes(userId);
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [emoji]: hasReacted
              ? users.filter((u) => u !== userId)
              : [...users, userId],
          },
        };
      });
      const updated = { ...prev, messages: updatedMessages };
      setGroupedMessages(groupMessagesByDate(updated.messages));
      return updated;
    });
  };

  const hasConversation = conversation?.messages?.length > 0;

  return (
    <div className="flex flex-col h-full">
      {hasConversation ? (
        <>
          {/* Header */}
          <PanelHeader
            conversation={conversation}
            onShowDetails={onShowDetails}
            onBack={onBack}
            showDetailsButton={showDetailsButton}
          />

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            {groupedMessages &&
              Object.entries(groupedMessages).map(([dateHeader, msgs]: any) => (
                <div key={dateHeader}>
                  <MessageDateTime dateHeader={dateHeader} />
                  {msgs.map((msg: any, index: number) => (
                    <MessageCard
                      key={`${msg.id}-${index}`}
                      conversation={msg}
                      onReact={handleReact}
                      prevMessage={index > 0 ? msgs[index - 1] : null}
                    />
                  ))}
                </div>
              ))}

            {/* Typing indicator */}
            {isTyping && conversation && (
              <TypingIndicator
                name={conversation.displayName || conversation.name}
                imageUrl={conversation.imageUrl}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="px-4 py-3 border-t border-white/[0.05] bg-[#1F2231]">
            <div className="relative bg-[#2A2D3E] rounded-2xl border border-white/[0.07] overflow-hidden transition-all duration-200 focus-within:border-[#7C3AED]/40 focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]">
              {/* Textarea */}
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={
                  conversation?.type === "channel"
                    ? `Message # ${conversation.name}`
                    : `Message ${conversation?.displayName || ""}…`
                }
                rows={1}
                className="w-full resize-none border-none bg-transparent text-[#E8E6F2] placeholder:text-[#635E7A] text-sm px-4 py-3 pr-24 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[48px] max-h-[160px] leading-relaxed"
                style={{ height: "auto" }}
              />

              {/* Action buttons (right-side) */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <button
                  onClick={() => setShowEmojiHint((v) => !v)}
                  aria-label="Emoji"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/5 transition-all duration-150"
                >
                  <HiOutlineEmojiHappy size={18} />
                </button>
                <button
                  aria-label="Attach file"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/5 transition-all duration-150"
                >
                  <TiAttachment size={18} />
                </button>
                <button
                  onClick={handleSend}
                  aria-label="Send message"
                  disabled={!value.trim()}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:hover:bg-[#7C3AED]"
                >
                  <IoMdSend size={16} />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#635E7A] mt-2 text-center">
              <span className="font-medium text-[#7C3AED]">Enter</span> to send ·{" "}
              <span className="font-medium text-[#7C3AED]">Shift+Enter</span> for new line
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full">
          <PanelHeader
            conversation={null}
            onBack={onBack}
          />
          <div className="flex-1 flex items-center justify-center">
            <EmptyChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPanel;
