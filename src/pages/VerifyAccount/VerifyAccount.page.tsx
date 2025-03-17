import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Playstore from "../../assets/googleplay.png";
import AppStore from "../../assets/appstore.svg";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState(false);

  const [count, setCount] = useState(60); // Start from 30 seconds

  useEffect(() => {
    if (count <= 0) return; // Stop when count reaches 0

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000); // Decrease every second

    return () => clearInterval(timer); // Cleanup function to prevent memory leaks
  }, [count]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyCode();
    }
  }, [otp]);

  const handleVerifyCode = () => {
    console.log("Verify code", otp);
    navigate(
      `/auth/get-started/account_authenticated?authenticated=${existingUser}`
    );
  };

  // Format the countdown to "00:XXs"
  const formattedTime = `00:${String(count).padStart(2, "0")}`;

  const handleResendCode = () => {
    //resend code logic
    if (count > 0) {
      return;
    }
    setCount(60);
    console.log("Resend code");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-[40px]">
        <img
          src="https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg"
          alt="Logo"
          className="w-[100px] h-[100px] rounded-full mb-[50px]"
        />

        <p className="text-[30px]">Check your email for verification code</p>
        <p className="text-[15px] text-center w-[500px]">
          We've sent a 6-character code to email@work-email.com. The code
          expires shortly, so please enter it soon.
        </p>

        <div className="w-[500px] mx-auto mt-[30px]">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <Input
                {...props}
                size={300}
                color="black"
                style={{
                  width: "300px",
                  height: "80px",
                  fontSize: "30px",
                  textTransform: "uppercase",
                }}
              />
            )}
            inputStyle="w-[30%] h-auto text-center"
            containerStyle="flex justify-between"
          />
        </div>
      </div>
      <div className="mt-[15px] w-[500px] mx-auto ">
        {/* <p>Can't find your code? Check your spam folder!</p> */}
        <div
          style={{ fontSize: "15px" }}
          className={`${
            count > 0 ? "text-[#134B70]" : "text-[#000] cursor-pointer"
          }`}
        >
          <p onClick={handleResendCode}>
            Resend code{" "}
            {count > 0 && (
              <span className="text-[#000]">in {formattedTime}</span>
            )}
          </p>
        </div>
      </div>

      <div className="w-full  absolute bottom-0 flex mt-[60px] flex-col items-center gap-[20px] p-[20px] bg-[#F9F9F9]">
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

export default VerifyAccount;
