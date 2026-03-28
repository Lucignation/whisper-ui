import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoFlashOutline } from "react-icons/io5";
import { cn } from "../../lib/utils";

const navLinks = [
  { label: "Features", to: "#features" },
  { label: "Pricing", to: "#pricing" },
  { label: "Solutions", to: "#solutions" },
  { label: "Enterprise", to: "#enterprise" },
];

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E14]/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-900/40">
            <IoFlashOutline size={16} className="text-white" />
          </div>
          <span className="text-[#E8E6F2] font-bold text-lg tracking-tight">Whisper</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              className="px-4 py-2 text-[14px] text-[#9B98B0] hover:text-[#E8E6F2] rounded-lg hover:bg-white/[0.05] transition-all duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/auth/login"
            className="px-4 py-2 text-[14px] text-[#9B98B0] hover:text-[#E8E6F2] rounded-lg hover:bg-white/[0.05] transition-all duration-150"
          >
            Sign in
          </Link>
          <Link
            to="/auth/get-started"
            className="px-5 py-2 text-[14px] font-semibold text-white rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] transition-all duration-150 shadow-lg shadow-purple-900/30"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#9B98B0] hover:bg-white/[0.06] transition-all"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0D0E14] px-5 py-4 flex flex-col gap-2">
          {navLinks.map(({ label, to }) => (
            <a
              key={label}
              href={to}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-[15px] text-[#9B98B0] hover:text-[#E8E6F2] rounded-xl hover:bg-white/[0.05] transition-all"
            >
              {label}
            </a>
          ))}
          <div className="border-t border-white/[0.06] mt-2 pt-2 flex flex-col gap-2">
            <Link
              to="/auth/login"
              className="px-4 py-3 text-[15px] text-[#9B98B0] hover:text-[#E8E6F2] rounded-xl hover:bg-white/[0.05] transition-all"
            >
              Sign in
            </Link>
            <Link
              to="/auth/get-started"
              className="px-4 py-3 text-[15px] font-semibold text-white text-center rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] transition-all"
            >
              Get started free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
