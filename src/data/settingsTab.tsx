import { FaUser } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { Si2Fas } from "react-icons/si";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";

export const settingsTab = [
  {
    value: "tab1",
    label: "Personal Account",
    Icon: () => <FaUser />,
  },
  {
    value: "tab2",
    label: "Workspace",
    Icon: () => <BsPersonWorkspace />,
  },
  {
    value: "tab3",
    label: "SSO",
    Icon: () => <Si2Fas size={15} />,
  },
  {
    value: "tab4",
    label: "User management",
    Icon: () => <MdOutlineSupervisorAccount size={20} />,
  },
  {
    value: "tab5",
    label: "Billing",
    Icon: () => <FaMoneyBills size={16} />,
  },
];
