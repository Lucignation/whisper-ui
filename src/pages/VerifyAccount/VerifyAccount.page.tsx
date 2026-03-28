import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { IoFlashOutline, IoMailOutline, IoReloadOutline } from "react-icons/io5";
import { cn } from "../../lib/utils";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) return;
    const timer = setInterval(() => setCount((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  useEffect(() => {
    if (otp.length === 6) handleVerify();
  }, [otp]);

  const handleVerify = () => {
    navigate("/auth/get-started/account_authenticated?authenticated=true");
  };

  const handleResend = () => {
    if (count > 0) return;
    setCount(60);
    setOtp("");
  };

  const formattedTime = `${String(Math.floor(count / 60)).padStart(2, "0")}:${String(count % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#0D0E14] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center px-8 py-5">
        <Link to="/" className="flex items-center gap-2 text-[#E8E6F2]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
            <IoFlashOutline size={16} className="text-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight">Whisper</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[440px]">

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B1F6B] to-[#2D1F52] border border-[#7C3AED]/30 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-900/30">
            <IoMailOutline size={24} className="text-[#A78BFA]" />
          </div>

          {/* Text */}
          <div className="text-center mb-10">
            <h1 className="text-[26px] font-bold text-[#E8E6F2] tracking-tight mb-3">
              Check your email
            </h1>
            <p className="text-[15px] text-[#9B98B0] leading-relaxed">
              We sent a 6-digit verification code to{" "}
              <span className="text-[#C4C2D4] font-medium">
                name@company.com
              </span>
              . Enter it below to continue.
            </p>
          </div>

          {/* OTP input */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={
              <span className="w-2 flex-shrink-0 text-[#635E7A] text-lg text-center">
                ·
              </span>
            }
            renderInput={(props) => (
              <input
                {...props}
                className={cn(
                  "flex-1 h-14 rounded-xl text-center text-[24px] font-bold tracking-widest",
                  "bg-white/[0.05] border border-white/[0.1] text-[#E8E6F2]",
                  "focus:outline-none focus:border-[#7C3AED]/70 focus:ring-2 focus:ring-[#7C3AED]/20",
                  "transition-all duration-150 caret-[#7C3AED]",
                  "uppercase"
                )}
              />
            )}
            containerStyle="flex items-center gap-1.5 w-full"
            inputStyle="flex-1 min-w-0"
          />

          {/* Resend */}
          <div className="mt-6 text-center">
            {count > 0 ? (
              <p className="text-[14px] text-[#635E7A]">
                Resend code in{" "}
                <span className="font-mono text-[#9B98B0] font-semibold">
                  {formattedTime}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-[14px] text-[#A78BFA] hover:text-[#C084FC] font-medium flex items-center gap-1.5 mx-auto transition-colors"
              >
                <IoReloadOutline size={15} />
                Resend code
              </button>
            )}
          </div>

          {/* Back link */}
          <p className="mt-8 text-center text-[13px] text-[#635E7A]">
            Wrong email?{" "}
            <Link
              to="/auth/login"
              className="text-[#A78BFA] hover:text-[#C084FC] font-medium transition-colors"
            >
              Go back
            </Link>
          </p>

          {/* Security note */}
          <div className="mt-8 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-[12px] text-[#635E7A] text-center">
            The code expires in 10 minutes. Can't find it? Check your spam
            folder.
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

export default VerifyAccount;
