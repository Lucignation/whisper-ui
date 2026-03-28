import { IoFlashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  inititial?: string;
  step?: number;
  totalSteps?: number;
  stepLabel?: string;
}

const OnboardingLayout = ({
  children,
  leftContent,
  rightContent,
  inititial,
  step,
  totalSteps = 4,
  stepLabel,
}: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0D0E14] flex">
      {/* ─── Left sidebar (workspace preview) ─────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 bg-[#1A0D2B] border-r border-white/[0.05]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-900/40">
            <IoFlashOutline size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-[16px] tracking-tight">Whisper</span>
        </div>

        {/* Workspace preview */}
        <div className="flex-1 px-3 py-4">
          {/* Workspace name */}
          {inititial && (
            <div className="flex items-center gap-2 px-2 py-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">{inititial}</span>
              </div>
              <span className="text-[#E8E6F2] text-[13px] font-medium">
                Your workspace
              </span>
            </div>
          )}

          {leftContent}

          {/* Skeleton preview */}
          {!leftContent && (
            <div className="px-2 space-y-1">
              {["# general", "# product", "# design"].map((ch) => (
                <div
                  key={ch}
                  className="px-3 py-2 rounded-lg text-[12px] text-[#635E7A]"
                >
                  {ch}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User avatar placeholder at bottom */}
        <div className="px-5 py-4 border-t border-white/[0.05] flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-bold">
              {inititial || "?"}
            </span>
          </div>
          <span className="text-[#635E7A] text-[12px]">You</span>
        </div>
      </aside>

      {/* ─── Main content ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* Top bar with progress */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.05]">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 text-[#E8E6F2]">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
              <IoFlashOutline size={14} className="text-white" />
            </div>
            <span className="font-bold text-[15px]">Whisper</span>
          </Link>

          {/* Step indicator */}
          {step !== undefined && (
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[13px] text-[#635E7A]">
                {stepLabel || `Step ${step} of ${totalSteps}`}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i < step
                        ? "w-6 bg-[#7C3AED]"
                        : i === step - 1
                        ? "w-6 bg-[#7C3AED]"
                        : "w-4 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step content */}
        <div className="flex-1 flex">
          <div className={`flex-1 flex items-start justify-start ${rightContent ? "" : ""}`}>
            {children}
          </div>

          {/* Optional right decorative panel */}
          {rightContent && (
            <div className="hidden xl:flex w-[340px] flex-shrink-0 bg-[#1C1E27] border-l border-white/[0.05] items-center justify-center">
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
