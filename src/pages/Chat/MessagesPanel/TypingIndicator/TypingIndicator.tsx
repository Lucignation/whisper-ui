interface TypingIndicatorProps {
  name: string;
  imageUrl?: string;
}

const TypingIndicator = ({ name, imageUrl }: TypingIndicatorProps) => {
  return (
    <div className="flex items-end gap-3 px-4 pb-2 mt-3">
      {/* Mini avatar */}
      <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white text-[10px] font-semibold">
            {name.charAt(0)}
          </span>
        )}
      </div>

      {/* Bubble */}
      <div className="bg-[#2A2D3E] rounded-2xl rounded-bl-md px-4 py-2.5 flex items-center gap-1">
        <span className="text-[#9B98B0] text-xs mr-1">{name.split(" ")[0]} is typing</span>
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
