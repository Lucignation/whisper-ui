import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { selectCompanyValue } from "../../features/companySelectors";
import { setCompanyName } from "../../features/company/companyReducer";
import { CompanyNameSchema } from "../../schemas/onboarding.schema";
import { ONBOARDING_STEPS } from "../../enums/onboarding.enum";
import Upload from "../../components/Onboard/Uploader";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { PremiumFeatures } from "../../data/PremiumFeatures";
import OnboardingLayout from "../../Layout/OnboadingLayout";
import {
  IoArrowForward,
  IoLinkOutline,
  IoCopyOutline,
  IoRocketOutline,
  IoFlashOutline,
} from "react-icons/io5";
import { cn } from "../../lib/utils";
import CS from "../../assets/customer-care.gif";

// ─── Step label map ────────────────────────────────────────────────────────────

const stepLabels: Record<ONBOARDING_STEPS, string> = {
  [ONBOARDING_STEPS.COMPANY_NAME]: "Name your workspace",
  [ONBOARDING_STEPS.YOUR_NAME]: "Set up your profile",
  [ONBOARDING_STEPS.INVITE_TEAMS]: "Invite your team",
  [ONBOARDING_STEPS.FINAL_STEP]: "You're all set!",
};

const stepNumbers: Record<ONBOARDING_STEPS, number> = {
  [ONBOARDING_STEPS.COMPANY_NAME]: 1,
  [ONBOARDING_STEPS.YOUR_NAME]: 2,
  [ONBOARDING_STEPS.INVITE_TEAMS]: 3,
  [ONBOARDING_STEPS.FINAL_STEP]: 4,
};

// ─── Shared form field wrapper ─────────────────────────────────────────────────

const Field = ({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-[14px] font-medium text-[#C4C2D4] mb-1.5">
      {label}
    </label>
    {children}
    {hint && !error && (
      <p className="mt-1.5 text-[12px] text-[#635E7A]">{hint}</p>
    )}
    {error && (
      <p className="mt-1.5 text-[12px] text-red-400 font-medium">{error}</p>
    )}
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

const CreateCompanyName = () => {
  const {
    register,
    setValue,
    watch,
  } = useForm({
    defaultValues: { name: "", username: "", invitees: "" },
    resolver: yupResolver(CompanyNameSchema),
  });

  const appState = useSelector((state: RootState) => selectCompanyValue(state));
  const dispatch: AppDispatch = useDispatch();
  const [companyError, setCompanyError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [currentStep, setCurrentStep] = useState<ONBOARDING_STEPS>(
    ONBOARDING_STEPS.COMPANY_NAME
  );
  const navigate = useNavigate();

  const name = watch("name");
  const username = watch("username");
  const invitees = watch("invitees");

  useEffect(() => {
    dispatch(setCompanyName(name));
  }, [name]);

  const validateCompanyName = () => {
    if (!name || name.length < 3) {
      setCompanyError("Must be at least 3 characters long");
      setTimeout(() => setCompanyError(""), 4000);
      return;
    }
    setCurrentStep(ONBOARDING_STEPS.YOUR_NAME);
  };

  const validateUsername = () => {
    if (!username || username.length < 3) {
      setUserNameError("Must be at least 3 characters long");
      setTimeout(() => setUserNameError(""), 4000);
      return;
    }
    setCurrentStep(ONBOARDING_STEPS.INVITE_TEAMS);
  };

  const handleInviteStep = () => {
    setCurrentStep(ONBOARDING_STEPS.FINAL_STEP);
  };

  // ─── Step content ────────────────────────────────────────────────────────────

  const stepContent = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.COMPANY_NAME:
        return (
          <div className="flex flex-col max-w-xl">
            <h1 className="text-[32px] md:text-[38px] font-bold text-[#E8E6F2] leading-tight tracking-tight mb-3">
              What's the name of your company or team?
            </h1>
            <p className="text-[16px] text-[#9B98B0] mb-8 leading-relaxed">
              This will be the name of your Whisper workspace — pick something
              your team will easily recognize.
            </p>

            <Field
              label="Workspace name"
              hint="You can always change this later."
              error={companyError}
            >
              <Input
                placeholder="e.g. Acme Engineering"
                {...register("name")}
                maxLength={50}
                className={cn(
                  "h-11 bg-white/[0.04] border-white/[0.1] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl",
                  "focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60",
                  companyError && "border-red-400/50"
                )}
              />
            </Field>

            <Button
              onClick={validateCompanyName}
              className="mt-6 h-11 w-fit px-7 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              Continue <IoArrowForward size={15} className="ml-1" />
            </Button>
          </div>
        );

      case ONBOARDING_STEPS.YOUR_NAME:
        return (
          <div className="flex flex-col max-w-xl">
            <h1 className="text-[32px] md:text-[38px] font-bold text-[#E8E6F2] leading-tight tracking-tight mb-3">
              What's your name?
            </h1>
            <p className="text-[16px] text-[#9B98B0] mb-8 leading-relaxed">
              Adding your name and photo helps teammates recognise and connect
              with you more easily.
            </p>

            <Field
              label="Your full name"
              error={userNameError}
            >
              <Input
                placeholder="e.g. James Mide"
                {...register("username")}
                maxLength={50}
                className={cn(
                  "h-11 bg-white/[0.04] border-white/[0.1] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl",
                  "focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60",
                  userNameError && "border-red-400/50"
                )}
              />
            </Field>

            <div className="mt-6">
              <p className="text-[13px] font-medium text-[#9B98B0] mb-2">
                Profile photo{" "}
                <span className="text-[#635E7A] font-normal">(optional)</span>
              </p>
              <Upload />
            </div>

            <Button
              onClick={validateUsername}
              className="mt-6 h-11 w-fit px-7 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30"
            >
              Continue <IoArrowForward size={15} className="ml-1" />
            </Button>
          </div>
        );

      case ONBOARDING_STEPS.INVITE_TEAMS:
        return (
          <div className="flex flex-col max-w-xl">
            <h1 className="text-[32px] md:text-[38px] font-bold text-[#E8E6F2] leading-tight tracking-tight mb-3">
              Who's on the{" "}
              <span className="text-[#A78BFA]">{appState.companyName || "your"}</span>{" "}
              team?
            </h1>
            <p className="text-[16px] text-[#9B98B0] mb-8 leading-relaxed">
              Add teammates by email — they'll each get an invite link.
            </p>

            <Field label="Email addresses (one per line)">
              <Textarea
                placeholder="james@company.com&#10;sophia@company.com"
                rows={5}
                {...register("invitees")}
                className={cn(
                  "bg-white/[0.04] border-white/[0.1] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl resize-none",
                  "focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
                )}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Button
                onClick={handleInviteStep}
                className="h-11 px-7 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] transition-all duration-200 shadow-lg shadow-purple-900/30"
              >
                Send invites <IoArrowForward size={15} className="ml-1" />
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5 border-white/[0.12] text-[#9B98B0] hover:bg-white/[0.06] rounded-xl text-[14px] transition-all"
              >
                <IoCopyOutline size={15} className="mr-1.5" />
                Copy invite link
              </Button>
              <button
                onClick={handleInviteStep}
                className="text-[14px] text-[#635E7A] hover:text-[#9B98B0] transition-colors"
              >
                Skip for now →
              </button>
            </div>
          </div>
        );

      case ONBOARDING_STEPS.FINAL_STEP:
        return (
          <div className="flex flex-col max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B1F6B] to-[#2D1F52] border border-[#7C3AED]/20 flex items-center justify-center mb-5 shadow-lg shadow-purple-900/30">
              <IoRocketOutline size={22} className="text-[#A78BFA]" />
            </div>
            <p className="text-[14px] font-semibold text-[#A78BFA] uppercase tracking-wide mb-2">
              Your workspace is ready!
            </p>
            <h1 className="text-[32px] md:text-[38px] font-bold text-[#E8E6F2] leading-tight tracking-tight mb-3">
              Want to unlock the full Whisper?
            </h1>
            <p className="text-[16px] text-[#9B98B0] mb-8 leading-relaxed">
              Pro gives you unlimited history, advanced workflows, and priority
              support.
            </p>

            <Accordion type="single" collapsible className="w-full mb-8">
              {PremiumFeatures.map((p: any) => (
                <AccordionItem
                  key={p.id}
                  value={`item-${p.id}`}
                  className="border-white/[0.07]"
                >
                  <AccordionTrigger className="text-[#C4C2D4] hover:text-[#E8E6F2] text-[14px]">
                    {p.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#9B98B0] text-[13px]">
                    {p.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Offer card */}
            <div className="bg-gradient-to-br from-[#2D1F52] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-6 mb-6 flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">🎁</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-[16px] font-semibold text-[#E8E6F2] mb-1">
                  50% off for 3 months
                </h3>
                <p className="text-[13px] text-[#9B98B0] mb-4">
                  $4.38 USD per person / month · Billed annually
                </p>
                <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[14px] shadow-lg shadow-purple-900/30 h-11 px-6">
                  <IoFlashOutline size={15} className="mr-1.5" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>

            <button
              onClick={() => navigate("/app/main_feeds")}
              className="text-[14px] text-[#635E7A] hover:text-[#9B98B0] transition-colors flex items-center gap-1.5"
            >
              <IoArrowForward size={14} />
              Continue with limited features
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // ─── Left sidebar preview ─────────────────────────────────────────────────────

  const leftContent = (
    <div className="px-2 space-y-1">
      <div className="px-3 py-1 text-[11px] text-[#4A4760] uppercase tracking-widest font-semibold mb-2">
        Channels
      </div>
      {["# general", ...(currentStep >= ONBOARDING_STEPS.FINAL_STEP ? ["# boardroom"] : [])].map(
        (ch) => (
          <div
            key={ch}
            className="px-3 py-1.5 rounded-lg text-[13px] text-[#635E7A]"
          >
            {ch}
          </div>
        )
      )}
      {(currentStep === ONBOARDING_STEPS.INVITE_TEAMS ||
        currentStep === ONBOARDING_STEPS.FINAL_STEP) && (
        <>
          <div className="px-3 py-1 text-[11px] text-[#4A4760] uppercase tracking-widest font-semibold mt-3 mb-2">
            Direct Messages
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] text-[#635E7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
            You
          </div>
        </>
      )}
    </div>
  );

  return (
    <OnboardingLayout
      leftContent={leftContent}
      rightContent={
        currentStep === ONBOARDING_STEPS.FINAL_STEP ? (
          <div className="p-6 flex items-center justify-center h-full">
            <img src={CS} alt="Customer support" className="w-48 opacity-80" />
          </div>
        ) : null
      }
      inititial={appState.companyName?.charAt(0)?.toUpperCase() || "W"}
      step={stepNumbers[currentStep]}
      totalSteps={4}
      stepLabel={stepLabels[currentStep]}
    >
      <div className="flex-1 px-8 md:px-16 py-12">{stepContent()}</div>
    </OnboardingLayout>
  );
};

export default CreateCompanyName;
