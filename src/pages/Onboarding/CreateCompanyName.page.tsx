import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import OnboardingLayout from "../../Layout/OnboadingLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyNameSchema } from "../../schemas/onboarding.schema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { selectCompanyValue } from "../../features/companySelectors";
import { useEffect, useState } from "react";
import { setCompanyName } from "../../features/company/companyReducer";
import { ONBOARDING_STEPS } from "../../enums/onboarding.enum";
import Upload from "../../components/Onboard/Uploader";
import { Textarea } from "../../components/ui/textarea";
import { IoIosLink } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { PremiumFeatures } from "../../data/PremiumFeatures";
import WorkingMan from "../../assets/working-man.gif";
import CS from "../../assets/customer-care.gif";

const CreateCompanyName = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", username: "", invitees: "" },
    resolver: yupResolver(CompanyNameSchema),
  });

  const appState = useSelector((state: RootState) => selectCompanyValue(state));
  const [companyError, setCompanyError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<ONBOARDING_STEPS>(
    ONBOARDING_STEPS.COMPANY_NAME
  );

  const name = watch("name");
  const username = watch("username");
  const invitees = watch("invitees");

  useEffect(() => {
    dispatch(setCompanyName(name));
  }, [name]);

  console.log({ name, appState });

  // Function to handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const validateCompanyName = () => {
    console.log({ name });
    if (name === "" || name.length < 3) {
      setCompanyError(
        "Company/Team is required and must be at least 3 character long"
      );

      return setTimeout(() => {
        setCompanyError("");
      }, 4000);
    }

    setCurrentStep(ONBOARDING_STEPS.YOUR_NAME);
  };

  const validateUsernameName = () => {
    console.log({ username });
    if (username === "" || username.length < 3) {
      setUserNameError(
        "user name is required and must be at least 3 character long"
      );

      return setTimeout(() => {
        setUserNameError("");
      }, 4000);
    }
    setCurrentStep(ONBOARDING_STEPS.INVITE_TEAMS);
  };

  const handleSendMessagesToInvitees = () => {
    console.log({ invitees });
    setCurrentStep(ONBOARDING_STEPS.FINAL_STEP);
  };

  const createOnboardingUI = () => {
    switch (currentStep) {
      case ONBOARDING_STEPS.COMPANY_NAME:
        return (
          <div className="w-[70%] px-[4%] py-[6%]">
            <h1 className="text-white text-[45px] font-bold mb-[20px] leading-[1.2]">
              What's the name of your company or team?
            </h1>
            <p className="text-white text-[16px] mb-[30px] leading-[1.5]">
              This will be the name of your Whisper workspace—pick something
              your team will easily recognize.
            </p>

            <div className="mb-[20px]">
              <Input
                placeholder="Ex: HexEd Engineering or HexEd Company"
                className="mb-[10px] text-[#EEEEEE]"
                {...register("name")}
                maxLength={50}
              />
              {companyError && (
                <p className="text-red-500 text-[12px] italic">
                  {companyError}
                </p>
              )}
            </div>

            <Button
              className="bg-[#134B7090] text-[#eee] shadow-lg"
              onClick={validateCompanyName}
            >
              Continue
            </Button>
          </div>
        );

      case ONBOARDING_STEPS.YOUR_NAME:
        return (
          <div className="w-[70%] px-[4%] py-[6%] leading-[1]">
            <h1 className="text-white text-[45px] font-bold mb-[20px]">
              What's your name?
            </h1>
            <p className="text-white text-[16px] mb-[30px] leading-[1.5]">
              Adding your name and profile photo helps your teammates recognize
              and connect with you more easily.
            </p>

            <div className="mb-[20px]">
              <Input
                placeholder="Ex: John Doe"
                className="mb-[10px] text-[#EEEEEE]"
                {...register("username")}
                maxLength={50}
              />
              {userNameError && (
                <p className="text-red-500 text-[12px] italic">
                  {userNameError}
                </p>
              )}
            </div>

            <div className="mb-[35px] mt-[45px]">
              <p className="text-[14px] text-[#eee] mb-[10px]">
                Your profile photo{" "}
                <span className="text-[#eeeeee50]">(optional)</span>
              </p>
              <p className="text-[14px] text-[#eee]">
                Help your teammates know they're talking to the right person.
              </p>

              <div>
                <Upload />
              </div>
            </div>

            <Button
              className="bg-[#134B7090] text-[#eee] shadow-lg"
              onClick={validateUsernameName}
            >
              Continue
            </Button>
          </div>
        );

      case ONBOARDING_STEPS.INVITE_TEAMS:
        return (
          <div className="w-[70%] px-[4%] py-[6%] leading-[1]">
            <h1 className="text-white text-[55px] font-bold mb-[20px]">
              Who else is on the{" "}
              <span className="text-[#508C9B]">{appState.companyName}</span>{" "}
              team?
            </h1>
            <p className="text-white text-[14px] mb-[10px]">
              Add teams by email
            </p>

            <Textarea
              placeholder="Eg: john@email.com, doe@email.com"
              rows={6}
              className="text-[#eee]"
              {...register("invitees")}
            />

            <div className="flex items-center gap-[20px] mt-[25px]">
              <Button
                className="bg-[#134B7090] text-[#eee] shadow-lg"
                onClick={handleSendMessagesToInvitees}
              >
                Continue
              </Button>
              <Button className="border border-[#eee] text-[#eee]">
                <IoIosLink />
                <span>Copy Invite Link</span>
              </Button>
              <p
                className="text-[#eeeeee80] cursor-pointer"
                onClick={handleSendMessagesToInvitees}
              >
                Skip to next step
              </p>
            </div>
          </div>
        );

      case ONBOARDING_STEPS.FINAL_STEP:
        return (
          <div className="w-[70%] px-[4%] py-[6%] leading-[.6]">
            <p className="text-[#eeeeee] text-[13px]">
              Your workspace is ready to go! 🥳
            </p>
            <p className="text-[#eeeeee] text-[45px] mt-[4px] font-bold mb-[30px] leading-[1.1]">
              Wanna go with Whisper Pro?
            </p>
            <Accordion
              type="single"
              collapsible
              className="w-full text-[#eeeeee]"
            >
              {PremiumFeatures.map((p: any) => (
                <AccordionItem value={`item-${p.id}`}>
                  <AccordionTrigger>{p.title}</AccordionTrigger>
                  <AccordionContent>{p.desc}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex flex-col mt-[40px] w-[330px] bg-[#201E43] px-[20px] rounded-[10px] py-[20px]">
              <div className="flex items-center mb-[20px] gap-[10px]">
                <span className="text-[50px] shadow-lg">🎁</span>
                <div>
                  <h3 className="text-[#eee] text-[20px]">50% off 3 months</h3>
                  <p className="text-[#eee] text-[13px]">
                    $4.38 USD per person/month
                  </p>
                </div>
              </div>
              <Button className="w-full bg-[#508C9B] text-[#eee]">
                Go with Premium
              </Button>
            </div>
            <Button className="mt-[20px] mx-auto bg-[#134B70] text-[#eee]">
              Start with limited features
            </Button>
          </div>
        );

      default:
        return (
          <div className="w-[70%] px-[4%] py-[6%] leading-[1]">
            <Button
              className="bg-[#134B7090] text-[#eee] shadow-lg"
              onClick={() => setCurrentStep(ONBOARDING_STEPS.COMPANY_NAME)}
            >
              Continue
            </Button>
          </div>
        );
    }
  };

  const leftContent = (
    <div className="w-[250px] p-[20px]">
      <h1 className="text-[#eee] text-[18px]">{appState.companyName}</h1>
      {currentStep === ONBOARDING_STEPS.FINAL_STEP ? (
        <div className="mb-[10px]">
          <p className="text-[#eee] text-[14px]">Boardroom</p>
          <p className="text-[#eee] text-[14px]"># general</p>
        </div>
      ) : null}
      {currentStep === ONBOARDING_STEPS.INVITE_TEAMS ||
      currentStep === ONBOARDING_STEPS.FINAL_STEP ? (
        <p className="text-[#eee] text-[14px]">Direct messages</p>
      ) : null}
    </div>
  );

  const rightContent = (
    <div className="flex items-center h-full justify-center">
      <div>
        <img src={CS} alt="staff working " />
        {/* <p className="text-[#eee] text-center">
          Talk to our customer service 24/7
        </p> */}
      </div>
    </div>
  );
  return (
    <OnboardingLayout
      leftContent={leftContent}
      rightContent={
        currentStep === ONBOARDING_STEPS.FINAL_STEP ? rightContent : null
      }
      inititial={appState.companyName?.charAt(0).toUpperCase()}
    >
      {createOnboardingUI()}
    </OnboardingLayout>
  );
};

export default CreateCompanyName;
