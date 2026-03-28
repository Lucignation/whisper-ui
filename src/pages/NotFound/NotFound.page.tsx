import { Link } from "react-router-dom";
import { IoFlashOutline, IoArrowBack, IoHomeOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0D0E14] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-8 py-5 border-b border-white/[0.05]">
        <Link to="/" className="flex items-center gap-2 text-[#E8E6F2]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
            <IoFlashOutline size={16} className="text-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">Whisper</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="text-center max-w-md">
          {/* Decorative number */}
          <div className="relative mb-8 select-none">
            <p className="text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent">
              404
            </p>
            {/* Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#3B1F6B] to-[#2D1F52] border border-[#7C3AED]/20 flex items-center justify-center shadow-2xl shadow-purple-900/40">
                <IoFlashOutline size={32} className="text-[#A78BFA]" />
              </div>
            </div>
          </div>

          <h1 className="text-[28px] md:text-[32px] font-bold text-[#E8E6F2] tracking-tight mb-3">
            Page not found
          </h1>
          <p className="text-[15px] text-[#635E7A] leading-relaxed mb-8">
            Looks like this channel doesn't exist — or you don't have access to
            it. Check the URL or head back home.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 h-11 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              <IoHomeOutline size={16} />
              Back to home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 h-11 px-6 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-[#9B98B0] font-medium rounded-xl text-[14px] transition-all duration-200"
            >
              <IoArrowBack size={16} />
              Go back
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-white/[0.05] flex items-center justify-between text-[12px] text-[#635E7A]">
        <span>© 2025 Whisper Technologies</span>
        <div className="flex gap-4">
          <Link to="#" className="hover:text-[#9B98B0] transition-colors">Help</Link>
          <Link to="#" className="hover:text-[#9B98B0] transition-colors">Privacy</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
