import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "sm:max-w-sm", md: "sm:max-w-md", lg: "sm:max-w-lg" };

/**
 * Responsive modal:
 * - Mobile  → bottom sheet (slides up, drag handle, rounded top)
 * - Desktop → centered overlay (rounded-2xl)
 */
const Modal = ({ isOpen, onClose, title, children, size = "md", className }: ModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Positioning wrapper: bottom on mobile, center on sm+ */}
      <div className="absolute inset-x-0 bottom-0 sm:inset-0 flex sm:items-center sm:justify-center sm:px-4 pointer-events-none">
        <div
          className={cn(
            "relative w-full pointer-events-auto bg-[#1C1E27] border border-white/[0.08] shadow-2xl",
            "rounded-t-2xl sm:rounded-2xl",
            sizeMap[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-0 sm:hidden">
            <div className="w-9 h-1 rounded-full bg-white/20" />
          </div>

          {title ? (
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-[15px] font-semibold text-[#E8E6F2]">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all"
              >
                <IoCloseOutline size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-xl text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.06] transition-all"
            >
              <IoCloseOutline size={18} />
            </button>
          )}

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
