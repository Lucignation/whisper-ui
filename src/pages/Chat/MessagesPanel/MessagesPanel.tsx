import { useEffect, useState } from "react";
import MessageCard from "./MessageCard/MessageCard";
import PanelHeader from "./PanelHeader/PanelHeader";
import { ChatData } from "../../../data/ChatData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { selectCompanyValue } from "../../../features/companySelectors";
import { setSelectedConversation } from "../../../features/company/companyReducer";

const MessagesPanel = () => {
  const [conversation, setConversation] = useState<any>(ChatData[0]);
  const dispatch: AppDispatch = useDispatch();
  const appState = useSelector((state: RootState) => selectCompanyValue(state));

  useEffect(() => {
    if (!conversation) {
      setConversation(ChatData[0]);
    } else {
      setConversation(appState.selectedConversation);
    }
  }, [appState, conversation]);

  console.log(conversation);

  return (
    <div className="bg-[#eeeeee80] flex-grow rounded-md">
      <PanelHeader />

      <div className="mt-[40px] min-h-screen">
        {conversation.messages?.map((message: any, index: number) => (
          <MessageCard key={index} conversation={message} />
        ))}
      </div>
    </div>
  );
};

export default MessagesPanel;
