import { IoChatbubblesOutline } from "react-icons/io5";

const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center text-center px-8 max-w-xs">
      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl bg-[#2A2D3E] flex items-center justify-center mb-5 shadow-inner">
        <IoChatbubblesOutline size={36} className="text-[#7C3AED]" />
      </div>

      {/* Text */}
      <h3 className="text-[#E8E6F2] font-semibold text-lg mb-2">
        No conversation selected
      </h3>
      <p className="text-[#635E7A] text-sm leading-relaxed">
        Pick a channel or a direct message from the sidebar to start chatting.
      </p>

      {/* Subtle hint */}
      <div className="mt-6 flex items-center gap-2 text-[#9B98B0] text-xs">
        <span className="w-4 h-px bg-[#635E7A]" />
        <span>or start a new conversation</span>
        <span className="w-4 h-px bg-[#635E7A]" />
      </div>
    </div>
  );
};

export default EmptyChat;
