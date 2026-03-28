type MessagesPanelProps = {
  onShowDetails?: () => void;
  onBack?: () => void;
  showDetailsButton?: boolean;
};

type PanelHeaderProps = {
  conversation: import("../../data/ChatData").Conversation | null;
  onShowDetails?: () => void;
  onBack?: () => void;
  showDetailsButton?: boolean;
};

type UsersPanelProps = {
  handleShowUserDetail: () => void;
  onSelectConversation?: () => void;
};

type CoWorkerInformationProps = {
  showUserDetail: boolean;
  onClose?: () => void;
};
