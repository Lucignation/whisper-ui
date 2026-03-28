import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import GoogleSignIn from "../../components/GoogleSignIn";
import MicrosoftSignIn from "../../components/MicrosoftSignIn";
import {
  IoFlashOutline,
  IoArrowForward,
  IoCheckmarkCircle,
} from "react-icons/io5";
import { cn } from "../../lib/utils";

// ─── Right decorative panel ────────────────────────────────────────────────────

const AuthRightPanel = () => (
  <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#1A0D2B] via-[#1C0E30] to-[#0D0E14] p-12 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-[100px] pointer-events-none" />

    {/* Logo */}
    <div className="relative flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-900/40">
        <IoFlashOutline size={18} className="text-white" />
      </div>
      <span className="text-white font-bold text-xl tracking-tight">Whisper</span>
    </div>

    {/* Feature highlights */}
    <div className="relative flex-1 flex flex-col justify-center gap-8">
      <h2 className="text-[28px] font-bold text-[#E8E6F2] leading-tight">
        Everything your team
        <br />
        needs to move fast
      </h2>
      <ul className="flex flex-col gap-4">
        {[
          "Channels for every project and topic",
          "Direct messages with file sharing",
          "2,000+ integrations with your tools",
          "End-to-end encrypted by default",
          "Works on web, desktop, and mobile",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 text-[15px] text-[#C4C2D4]">
            <IoCheckmarkCircle size={18} className="text-[#A78BFA] flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Trust badges */}
    <div className="relative border-t border-white/[0.06] pt-8">
      <p className="text-[12px] text-[#635E7A] mb-4 uppercase tracking-wider font-semibold">
        Trusted by teams at
      </p>
      <div className="flex gap-4 flex-wrap">
        {["Acme Corp", "Finlink", "Axiom", "Kiosk Labs"].map((company) => (
          <span
            key={company}
            className="text-[13px] text-[#9B98B0] bg-white/[0.05] border border-white/[0.08] px-3 py-1 rounded-lg"
          >
            {company}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const OrDivider = () => (
  <div className="relative flex items-center my-6">
    <div className="flex-1 h-px bg-[#2A2D3E]" />
    <span className="mx-3 text-[12px] text-[#635E7A] font-medium">OR</span>
    <div className="flex-1 h-px bg-[#2A2D3E]" />
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const Signup = () => {
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
            to="/auth/login"
            className="text-[13px] text-[#9B98B0] hover:text-[#E8E6F2] flex items-center gap-1 transition-colors"
          >
            Sign in <IoArrowForward size={13} />
          </Link>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[400px]">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-[#E8E6F2] tracking-tight mb-2">
                Create your account
              </h1>
              <p className="text-[15px] text-[#9B98B0]">
                Use the email address you use at work.
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

              <Button
                onClick={handleContinue}
                disabled={!email.trim()}
                className="h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-40"
              >
                Continue
              </Button>
            </div>

            <p className="mt-4 text-[12px] text-[#635E7A] leading-relaxed">
              By continuing, you agree to Whisper's{" "}
              <a href="#" className="text-[#A78BFA] hover:text-[#C084FC] transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#A78BFA] hover:text-[#C084FC] transition-colors">
                Privacy Policy
              </a>
              .
            </p>

            {/* Footer link */}
            <p className="mt-6 text-center text-[13px] text-[#635E7A]">
              Already have a workspace?{" "}
              <Link
                to="/auth/login"
                className="text-[#A78BFA] hover:text-[#C084FC] font-medium transition-colors"
              >
                Sign in
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

export default Signup;
