import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { setSelectedConversation } from "../../../../features/company/companyReducer";

const PreviewMessage = ({ chat }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleSelectConversation = () => {
    dispatch(setSelectedConversation(chat));
  };
  return (
    <div
      className="mt-[30px] cursor-pointer flex items-center gap-[4px] justify-between"
      onClick={() => handleSelectConversation()}
    >
      <div className="flex items-center gap-[15px]">
        <div className="relative">
          <div className="w-[40px]  h-[40px] rounded-full overflow-hidden">
            <img src={chat.imageUrl} alt="guy" className="w-[90px] h-full" />
          </div>
          <div className="absolute bottom-0 left-[30px] border-2 border-[#eee] w-[15px] h-[15px] bg-[#32CD32] rounded-full"></div>
        </div>
        <div className="leading-[1]">
          <p className="text-[#201E4390] text-[16px] font-medium">
            {chat.name}
          </p>
          <p className="text-[13px] text-[#201E4370]">{chat.place}</p>
        </div>
      </div>
      <div>
        <p className="text-[#201E4370]">Now</p>
        <p className="bg-[#508C9B] h-[20px] w-[20px] rounded-full flex items-center justify-center text-[#eee]">
          {chat.messages.length}
        </p>
      </div>
    </div>
  );
};

export default PreviewMessage;
