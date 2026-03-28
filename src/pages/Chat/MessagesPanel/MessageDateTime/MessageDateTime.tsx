const MessageDateTime = ({ dateHeader }: { dateHeader: string }) => {
  return (
    <div className="flex items-center gap-3 my-6 px-4">
      <div className="flex-1 h-px bg-white/[0.07]" />
      <span className="text-[11px] font-semibold text-[#635E7A] tracking-wide px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] whitespace-nowrap">
        {dateHeader}
      </span>
      <div className="flex-1 h-px bg-white/[0.07]" />
    </div>
  );
};

export default MessageDateTime;
