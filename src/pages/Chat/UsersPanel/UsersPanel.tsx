import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { Input } from "../../../components/ui/input";
import { IoIosArrowUp } from "react-icons/io";
import PreviewMessage from "./PreviewMessage/PreviewMessage";
import { ChatData } from "../../../data/ChatData";

const UsersPanel = () => {
  return (
    <div className="w-[25%] sticky top-[-40px] overflow-y-scroll bg-[#eee] h-screen  px-[18px] py-[30px] rounded-md">
      <div className="relative">
        <Input
          placeholder="Search "
          type="text"
          className="pl-[35px] border border-[#201E4330] focus:ring-[#201E4330]"
        />
        <HiMiniMagnifyingGlass
          size={20}
          color="#201E4340"
          className="absolute top-[7px] left-[10px]"
        />
      </div>
      <div className="flex w-full mt-[30px] justify-between items-center">
        <p>CO-WORKERS</p>
        <div>
          <IoIosArrowUp />
        </div>
      </div>

      {ChatData.map((chat, index) => (
        <PreviewMessage key={index} chat={chat} />
      ))}
    </div>
  );
};

export default UsersPanel;
