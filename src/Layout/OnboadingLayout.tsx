import { IoHome } from "react-icons/io5";

const OnboardingLayout = ({
  rightContent,
  children,
  leftContent,
  inititial,
}: any) => {
  return (
    <div className="flex w-full h-screen justify-between gap-[3px] pt-[50px] bg-[#201E43]">
      <div className="w-[70px] mx-auto mt-[10px] flex flex-col items-center gap-[20px]">
        <p
          className={`text-[18px] py-2 font-bold ${
            inititial && "bg-[#201E4350]"
          } text-[#ffffff70] px-4 rounded-md`}
        >
          {inititial}
        </p>
        <div className="bg-[#201E4350] px-3 py-2 rounded-md">
          <IoHome size={20} color="#ffffff70" />
        </div>
        <p className="text-[18px] py-2 font-bold text-[#ffffff70]">...</p>
      </div>
      <div className="flex-grow w-[30%] bg-[#134B7020] rounded-l-[5px]">
        {" "}
        {leftContent}
      </div>
      <div className=" flex-grow-[2] w-full bg-[#00000060]">{children}</div>
      {rightContent && (
        <div className="flex-grow w-[40%] rounded-r-[5px] bg-[#00000090]">
          {rightContent}
        </div>
      )}
    </div>
  );
};

export default OnboardingLayout;
