import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  IoFlashOutline,
  IoArrowForward,
  IoAddCircleOutline,
  IoPeopleOutline,
  IoChevronForward,
} from "react-icons/io5";
import { cn } from "../../lib/utils";

// ─── Mock existing workspace ───────────────────────────────────────────────────

const mockWorkspace = {
  name: "Chrevron Devs",
  members: 7067,
  logoLetter: "C",
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const AuthenticateAccount = () => {
  const [searchParams] = useSearchParams();
  const isAuthenticated = searchParams.get("authenticated");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleCreateWorkspace = () => {
    if (!acceptTerms) return;
    navigate("/auth/get-started/create-company-name");
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.05]">
        <Link to="/" className="flex items-center gap-2 text-[#E8E6F2]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
            <IoFlashOutline size={16} className="text-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">Whisper</span>
        </Link>

        {/* Email pill */}
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5 text-[13px] text-[#9B98B0]">
          name@company.com
          <Link to="/auth/login" className="text-[#A78BFA] hover:text-[#C084FC] transition-colors font-medium">
            Change
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#E8E6F2] tracking-tight mb-3">
              What would you like to do?
            </h1>
            <p className="text-[16px] text-[#9B98B0]">
              Create a new workspace or join an existing one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Create new workspace card */}
            <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B1F6B] to-[#2D1F52] border border-[#7C3AED]/20 flex items-center justify-center mb-5">
                <IoAddCircleOutline size={22} className="text-[#A78BFA]" />
              </div>

              <h2 className="text-[18px] font-semibold text-[#E8E6F2] mb-2">
                Create a new workspace
              </h2>
              <p className="text-[14px] text-[#635E7A] leading-relaxed flex-1 mb-6">
                Start fresh with a dedicated space for your team to collaborate,
                communicate, and work efficiently.
              </p>

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mb-5">
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-150",
                    acceptTerms
                      ? "bg-[#7C3AED] border-[#7C3AED]"
                      : "border-white/20 bg-white/[0.04]"
                  )}
                  onClick={() => setAcceptTerms((v) => !v)}
                >
                  {acceptTerms && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-[#9B98B0] leading-relaxed">
                  I agree to Whisper's{" "}
                  <a href="#" className="text-[#A78BFA] hover:text-[#C084FC] transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#A78BFA] hover:text-[#C084FC] transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <Button
                onClick={handleCreateWorkspace}
                disabled={!acceptTerms}
                className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30 disabled:opacity-30"
              >
                Create workspace <IoArrowForward size={15} className="ml-1" />
              </Button>
            </div>

            {/* Join existing workspace card */}
            {isAuthenticated !== "false" && (
              <div className="bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2E1A] to-[#0D2010] border border-green-900/30 flex items-center justify-center mb-5">
                  <IoPeopleOutline size={22} className="text-[#4ADE80]" />
                </div>

                <h2 className="text-[18px] font-semibold text-[#E8E6F2] mb-2">
                  Join an existing workspace
                </h2>
                <p className="text-[14px] text-[#635E7A] leading-relaxed flex-1 mb-6">
                  Your email is associated with the workspace below. Join it
                  instantly.
                </p>

                {/* Workspace list item */}
                <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.12] transition-all duration-150 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {mockWorkspace.logoLetter}
                    </span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-[14px] font-semibold text-[#E8E6F2] truncate">
                      {mockWorkspace.name}
                    </p>
                    <p className="text-[12px] text-[#635E7A]">
                      {mockWorkspace.members.toLocaleString()} members
                    </p>
                  </div>
                  <IoChevronForward size={16} className="text-[#635E7A] flex-shrink-0" />
                </button>

                <Button
                  variant="outline"
                  className="w-full h-11 border-[#4ADE80]/30 text-[#4ADE80] hover:bg-[#4ADE80]/10 font-semibold rounded-xl text-[14px] transition-all duration-200"
                  onClick={() => navigate("/app/personal_chat")}
                >
                  Join workspace
                </Button>
              </div>
            )}
          </div>
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
  );
};

export default AuthenticateAccount;
