import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import GoogleSignIn from "../../components/GoogleSignIn";
import MicrosoftSignIn from "../../components/MicrosoftSignIn";
import { Link, useNavigate } from "react-router-dom";
import Playstore from "../../assets/googleplay.png";
import AppStore from "../../assets/appstore.svg";
import Dashabord from "../../assets/bg.png";
import { IoMdArrowForward } from "react-icons/io";

const Signin = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });
  }, []);

  const handleContinue = () => {
    navigate("/auth/verify-account");
  };
  return (
    <div className="h-full flex flex-col items-center">
      {/* <p className="mb-[50px]">Whisper</p> */}
      <div className="flex w-full items-center justify-center">
        <div className="w-[50%] flex flex-col items-center">
          <div className="mb-[50px]">
            <img
              src="https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg"
              alt="Logo"
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <div className="leading-[1.4] text-center mb-[30px] w-[500px]">
            <p className="text-[35px] font-bold">Sign in to Whisper</p>
            <p>We suggest using the email address you use at work.</p>
          </div>
          <div className="w-[400px] flex flex-col gap-[15px]">
            <Input
              type="text"
              className="py-[20px]"
              placeholder="name@work-email.com"
            />
            <Button
              variant="outline"
              color="#134B70"
              size="lg"
              className="bg-[#201E43] py-[20px] w-dull text-white"
              onClick={handleContinue}
            >
              Continue
            </Button>

            <div className="bg-[#eee] px-[15px] py-[20px] rounded-md">
              <p>🚀 We’ll email you a code for a password-free sign in. 🤩</p>
            </div>
          </div>

          <div className="border-b-[1px] border-[#EEEEEE] w-[400px] mt-[30px] flex items-center justify-center relative">
            <p className="absolute bg-[#fff] px-2">OR</p>
          </div>

          <div className="flex flex w-[400px] gap-[15px] mt-[30px]">
            <GoogleSignIn />
            <MicrosoftSignIn />
          </div>

          <div className="mt-[30px] relative">
            <p className="text-[#201E43] text-[14px]">
              Don't have an account?
              <span className="text-[#508C9B] underline">
                <Link to="/auth/get-started">Create one</Link>
              </span>
            </p>
          </div>
          <div className="w-full flex mt-[60px] flex-col items-center gap-[20px] p-[20px] bg-[#F9F9F9]">
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

            <div className="flex absolute bottom-0 items-center gap-[10px] text-[14px]">
              <Link to="/" className="text-[#201E43]">
                Privacy & Terms
              </Link>
              <Link to="/" className="text-[#201E43]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[50%] bg-[#201E43] h-screen relative py-[50px] overflow-hidden">
          <img
            src={Dashabord}
            alt="dashboard"
            className="w-auto mx-auto h-[420px] mt-[5px] rounded-[12px]"
          />
          <div className="absolute top-[350px] right-[20px] border ml-[100px] h-[400px] rounded-[10px] border-4 border-[#fff] my-[50px]">
            {/* <TfiMicrosoftAlt color="#ffffff50" size={50} /> */}
            <h2 className="text-[102px] text-white font-bold leading-[1] bg-[#201E43] mt-[50px] ml-[-50px] ">
              Work from anywhere
            </h2>
            <p className="text-white text-[16px]  leading-[1.4] ml-[50px]">
              <span className="text-[#508C9B]">Whisper</span> has a plan for
              every team, ensuring seamless collaboration, security, and
              scalability. Stay connected and work efficiently with the perfect
              plan for your needs.{" "}
              <span className="inline-flex text-[#508C9B] items-center underline  gap-[3px]">
                <Link to="/" className="text-[#508C9B]">
                  Find your plan
                </Link>
                <span>
                  <IoMdArrowForward color="#508C9B" />{" "}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
