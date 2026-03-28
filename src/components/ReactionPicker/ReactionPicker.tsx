const emojis = ["👍", "❤️", "😂", "😮", "👀", "🚀"];

const ReactionPicker = ({
  messageId,
  onReact,
}: {
  messageId: number;
  onReact: (id: number, emoji: string) => void;
}) => {
  return (
    <div className="flex items-center gap-0.5 px-1">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          onClick={(e) => {
            e.stopPropagation();
            onReact(messageId, emoji);
          }}
          className="w-8 h-7 flex items-center justify-center rounded-lg text-base hover:bg-white/10 transition-all duration-100 hover:scale-110"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default ReactionPicker;
