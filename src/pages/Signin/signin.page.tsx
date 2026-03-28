import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import GoogleSignIn from "../../components/GoogleSignIn";
import MicrosoftSignIn from "../../components/MicrosoftSignIn";
import { IoFlashOutline, IoArrowForward } from "react-icons/io5";
import { cn } from "../../lib/utils";

// ─── Shared panel quotes ───────────────────────────────────────────────────────

const rightPanelContent = {
  quote:
    "Whisper transformed how our 200-person team collaborates. Everything is faster, clearer, and more connected.",
  author: "Amara Osei",
  role: "CTO, Kiosk Labs",
  stats: [
    { value: "3×", label: "Faster decisions" },
    { value: "80%", label: "Less email" },
    { value: "50K+", label: "Teams worldwide" },
  ],
};

// ─── Right decorative panel ────────────────────────────────────────────────────

const AuthRightPanel = () => (
  <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#1A0D2B] via-[#1C0E30] to-[#0D0E14] p-12 relative overflow-hidden">
    {/* Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[100px] pointer-events-none" />

    {/* Logo */}
    <div className="relative flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-900/40">
        <IoFlashOutline size={18} className="text-white" />
      </div>
      <span className="text-white font-bold text-xl tracking-tight">Whisper</span>
    </div>

    {/* Quote */}
    <div className="relative flex-1 flex flex-col justify-center">
      <blockquote className="text-[22px] text-[#E8E6F2] font-medium leading-[1.5] mb-8">
        "{rightPanelContent.quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
          <span className="text-white text-xs font-bold">AO</span>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[#E8E6F2]">
            {rightPanelContent.author}
          </p>
          <p className="text-[12px] text-[#635E7A]">{rightPanelContent.role}</p>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="relative grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-8">
      {rightPanelContent.stats.map(({ value, label }) => (
        <div key={label}>
          <p className="text-[28px] font-bold text-[#E8E6F2] leading-none">{value}</p>
          <p className="text-[12px] text-[#635E7A] mt-1">{label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Divider ───────────────────────────────────────────────────────────────────

const OrDivider = () => (
  <div className="relative flex items-center my-6">
    <div className="flex-1 h-px bg-[#2A2D3E]" />
    <span className="mx-3 text-[12px] text-[#635E7A] font-medium">OR</span>
    <div className="flex-1 h-px bg-[#2A2D3E]" />
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const Signin = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!email.trim()) return;
    navigate("/auth/verify-account");
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] grid lg:grid-cols-2">
      {/* ─── Left: Form ─────────────────────────────────────────────────── */}
      <div className="flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5">
          <Link to="/" className="flex items-center gap-2 text-[#E8E6F2]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
              <IoFlashOutline size={16} className="text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight">Whisper</span>
          </Link>
          <Link
            to="/auth/get-started"
            className="text-[13px] text-[#9B98B0] hover:text-[#E8E6F2] flex items-center gap-1 transition-colors"
          >
            Create account <IoArrowForward size={13} />
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-[#E8E6F2] tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-[15px] text-[#9B98B0]">
                Sign in to your Whisper workspace.
              </p>
            </div>

            {/* Social sign-ins */}
            <div className="flex flex-col gap-3 mb-2">
              <GoogleSignIn />
              <MicrosoftSignIn />
            </div>

            <OrDivider />

            {/* Email form */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[13px] font-medium text-[#9B98B0] mb-1.5">
                  Work email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className={cn(
                    "h-11 bg-white/[0.04] border-white/[0.1] text-[#E8E6F2] placeholder:text-[#635E7A]",
                    "focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60 focus-visible:border-[#7C3AED]/50",
                    "rounded-xl"
                  )}
                />
              </div>

              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-xl px-4 py-3 text-[13px] text-[#9B98B0]">
                We'll email you a magic code — no password needed.
              </div>

              <Button
                onClick={handleContinue}
                disabled={!email.trim()}
                className="h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-40"
              >
                Continue with email
              </Button>
            </div>

            {/* Footer link */}
            <p className="mt-6 text-center text-[13px] text-[#635E7A]">
              New to Whisper?{" "}
              <Link
                to="/auth/get-started"
                className="text-[#A78BFA] hover:text-[#C084FC] font-medium transition-colors"
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="px-8 py-5 border-t border-white/[0.05] flex items-center justify-between text-[12px] text-[#635E7A]">
          <span>© 2025 Whisper Technologies</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-[#9B98B0] transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-[#9B98B0] transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* ─── Right: Decorative ───────────────────────────────────────────── */}
      <AuthRightPanel />
    </div>
  );
};

export default Signin;
