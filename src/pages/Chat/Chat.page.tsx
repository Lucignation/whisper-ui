import ContentLayout from "../../DashboardLayout/DashboardLayout";
import UsersPanel from "./UsersPanel/UsersPanel";
import MessagesPanel from "./MessagesPanel/MessagesPanel";

const Chat = () => {
  return (
    <ContentLayout>
      <div className="flex items-start gap-[12px]">
        <UsersPanel />
        <MessagesPanel />
      </div>
    </ContentLayout>
  );
};

export default Chat;
