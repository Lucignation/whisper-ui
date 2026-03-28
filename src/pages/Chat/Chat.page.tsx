import { useState } from "react";
import ContentLayout from "../../DashboardLayout/DashboardLayout";
import UsersPanel from "./UsersPanel/UsersPanel";
import MessagesPanel from "./MessagesPanel/MessagesPanel";
import CoWorkerInformation from "./CoWorkerInformation/CoWorkerInformation";

type MobileView = "list" | "chat" | "details";

const Chat = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const handleSelectConversation = () => {
    // On mobile, transition to chat view when a conversation is selected
    setMobileView("chat");
  };

  const handleShowDetails = () => {
    setShowDetails(true);
    setMobileView("details");
  };

  const handleBackToList = () => {
    setMobileView("list");
    setShowDetails(false);
  };

  const handleBackToChat = () => {
    setMobileView("chat");
  };

  return (
    <ContentLayout>
      <div className="flex h-full w-full overflow-hidden">

        {/* ─── Conversations Panel (Channels + DMs) ─────────────────────────── */}
        <div
          className={`
            flex-shrink-0 w-full md:w-[280px] lg:w-[300px]
            ${mobileView === "list" ? "flex" : "hidden"}
            md:flex flex-col
            bg-[#1C1E27] border-r border-white/[0.05]
            transition-all duration-300
          `}
        >
          <UsersPanel
            handleShowUserDetail={handleShowDetails}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {/* ─── Main Chat Area ─────────────────────────────────────────────────── */}
        <div
          className={`
            flex-1 min-w-0 flex flex-col
            ${mobileView === "chat" || mobileView === "details" ? "flex" : "hidden"}
            md:flex
            bg-[#1F2231]
          `}
        >
          <MessagesPanel
            onShowDetails={handleShowDetails}
            onBack={handleBackToList}
            showDetailsButton={!showDetails}
          />
        </div>

        {/* ─── Details / Right Sidebar ─────────────────────────────────────────── */}
        <div
          className={`
            flex-shrink-0 w-full md:w-[280px] lg:w-[300px]
            ${mobileView === "details" ? "flex" : "hidden"}
            ${showDetails ? "md:flex" : "md:hidden"}
            flex-col
            bg-[#1C1E27] border-l border-white/[0.05]
            transition-all duration-300
          `}
        >
          <CoWorkerInformation
            showUserDetail={showDetails}
            onClose={() => {
              setShowDetails(false);
              handleBackToChat();
            }}
          />
        </div>
      </div>
    </ContentLayout>
  );
};

export default Chat;
