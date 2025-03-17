import { Button } from "../../components/ui/button";
import BG from "../../assets/bg1.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import Playstore from "../../assets/googleplay.png";
import AppStore from "../../assets/appstore.svg";
import { useState } from "react";

const AuthenticateAccount = () => {
  const [searchParams] = useSearchParams();
  const isAuthenticated = searchParams.get("authenticated");
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleCreateWorkspace = () => {
    if (!acceptTerms) {
      return;
    }
    navigate("/auth/get-started/create-company-name");
  };
  return (
    <div className="flex bg-[#EEEEEE] flex-col items-center min-h-screen justify-center gap-[20px]">
      <img
        src="https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg"
        alt="Logo"
        className="w-[100px] h-[100px] rounded-full mt-[50px]"
      />

      <p className="mb-[30px] bg-[#ffffff50] text-[#00000080] text-[15px] py-[5px] px-[15px] rounded-full">
        Continue as <span>name@work-email.com</span>{" "}
        <Link to="/" className="ml-[10px] text-[#508C9B]">
          Change
        </Link>
      </p>

      <div className="flex justify-between items-start w-[70%] mx-auto">
        <div className="w-[50%] leading-[1.5]">
          <h2 className="text-[40px] leading-[1] font-bold mb-[20px]">
            Create a new Whisper workspace
          </h2>
          <p className="text-[16px] mb-[20px]">
            Whisper provides your team with a dedicated space to collaborate,
            communicate, and work efficiently. Click the button below to create
            a new workspace.
          </p>
          <Button
            className="bg-[#201E43] text-[#EEEEEE]"
            onClick={handleCreateWorkspace}
            disabled={!acceptTerms}
          >
            Create a new Workspace
          </Button>

          <div className="mt-[20px]">
            <input
              type="checkbox"
              className="accent-[#134B70]"
              id="terms"
              name="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-[15px] ml-[10px]">
              I agree to the{" "}
              <span className="text-[#134B70] cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#134B70] cursor-pointer">
                Privacy Policy
              </span>
            </label>
          </div>
        </div>
        <div className="w-[50%]">
          <img
            src={BG}
            className="w-[500px]"
            alt="three staffs working remotely"
          />
        </div>
      </div>

      {isAuthenticated !== "false" && (
        <div className="w-[70%] relative mx-auto border-t-[1px] border-[#00000020] pt-[20px]">
          <p className="absolute top-0 bg-[#EEEEEE] mt-[-20px] ml-[50%] p-[10px] rounded-full">
            OR
          </p>
          <h2 className="text-[16px] text-center text-[#134B70] mb-[15px]">
            Want to continue to existing workspace?
          </h2>
          <div>
            <div className="flex items-center justify-between w-[500px] mx-auto bg-[#ffffff80] p-[20px] rounded-md">
              <div className="flex items-center gap-[20px]">
                <img
                  src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                  alt=""
                  className="w-[50px] h-[50px] rounded-md"
                />
                <div>
                  <p className="text-[20px] ">Chrevron Devs</p>
                  <p className="text-[14px]">7067 members</p>
                </div>
              </div>
              <p className="flex items-center gap-[10px] bg-[#201E43] text-[#fff] px-[10px] py-[4px] rounded-md">
                <span>Join</span>
                <IoMdArrowForward color="white" />
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full   flex mt-[60px] flex-col items-center gap-[20px] p-[20px] bg-[#F9F9F9]">
        <p className="text-[14px]">Download and sign-up from your phone</p>
        <div className="flex items-center gap-[12px]">
          <Link to="/">
            <img
              src={Playstore}
              alt="Playstore"
              style={{ width: "150px", height: "45px" }}
            />
          </Link>
          <Link to="/">
            <img
              src={AppStore}
              alt="App store"
              style={{ width: "150px", height: "45px" }}
            />
          </Link>
        </div>

        <div className="flex items-center gap-[10px] text-[14px]">
          <Link to="/" className="text-[#201E43]">
            Privacy & Terms
          </Link>
          <Link to="/" className="text-[#201E43]">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthenticateAccount;
