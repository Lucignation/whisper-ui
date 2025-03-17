import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";

const Nav = () => {
  return (
    <header className="flex bg-[#201e43] w-full items-center justify-between p-4 shadow-md">
      <Link to="/">
        <p className="text-[#EEEEEE] w-[700px]">Whisper</p>
      </Link>
      <nav className="p-4 text-[#EEEEEE] w-full flex gap-[70px] items-center justify-between">
        <div className="flex justify-between gap-4">
          <Link to="/pricing" className="hover:text-gray-300 text-[#eee]">
            Pricing
          </Link>
          <Link to="/features" className="hover:text-gray-300 text-[#eee]">
            Features
          </Link>
          <Link to="/solutions" className="hover:text-gray-300 text-[#eee]">
            Solutions
          </Link>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link to="/auth/login" className="hover:text-gray-300 text-[#eee]">
            Sign in
          </Link>
          <div className="flex items-center gap-2 border border-[#EEEEEE] px-6 py-2 rounded-[40px]">
            <Link
              to="/auth/get-started"
              className="hover:text-gray-300 text-[#eee]"
            >
              Get started
            </Link>
            <IoMdArrowForward color="#EEEEEE" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
