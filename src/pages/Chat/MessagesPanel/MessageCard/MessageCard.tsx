import { IoCheckmarkDone } from "react-icons/io5";

const MessageCard = ({ conversation }: any) => {
  console.log({ conversation });

  return (
    <div className="flex items-center px-[20px] mb-[30px] gap-[10px] w-[80%]">
      <div className="relative">
        <div className="w-[50px]  h-[50px] rounded-full border border-[#508C9B] overflow-hidden">
          {conversation.imageUrl ? (
            <img
              // src="https://img.freepik.com/free-vector/boy-using-laptop-online-learning_1308-118105.jpg"
              src={conversation.imageUrl}
              alt="guy"
              className="w-[90px] h-full"
            />
          ) : (
            <p className="flex items-center h-[100%] justify-center text-[23px] rounded-full">
              {conversation.name.charAt(0)}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-[35px] border-2 border-[#eee] w-[15px] h-[15px] bg-[#32CD32] rounded-full"></div>
      </div>
      <div className="mt-[10px]">
        <div className="flex items-center gap-[7px]">
          <p className="text-[16px] font-medium">{conversation.name}</p>{" "}
          <span className="text-[12px] text-[#201E4390]">
            {conversation.time}
          </span>{" "}
          <IoCheckmarkDone color="#336AEA" />
        </div>
        <p className="text-[#201E4390] leading-[1.4] bg-[#508C9B40] rounded-[10px] px-[15px] py-[10px]">
          {conversation.message}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
