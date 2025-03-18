import { FC } from "react";

import { AiTwotoneAppstore } from "react-icons/ai";
import { BsChatSquareTextFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import {
  IoCalendarOutline,
  IoCallSharp,
  IoNotifications,
  IoSettingsSharp,
} from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import {
  DashboardHeaderProps,
  DashboardNavLinkInformationType,
} from "../types";

import "./DashboardHeader.scss";

const DashboardHeader: FC<DashboardHeaderProps> = ({
  children,
  toggleSider,
}) => {
  const { pathname } = useLocation();
  const dashboardHeaderLinkInformation: DashboardNavLinkInformationType[] = [
    {
      key: "/app/main_feeds",
      icon: <AiTwotoneAppstore />,
      label: "Apps",
      permissions: [], // No permissions required
    },
    {
      key: "/app/personal_chat",
      icon: <BsChatSquareTextFill />,
      label: "Chat",
      permissions: [],
    },
    {
      key: "/vendors",
      icon: <TiGroup />,
      label: "Group",
      permissions: [],
    },
    {
      key: "/requests",
      icon: <IoCallSharp />,
      label: "Calls",
      permissions: [],
    },
    {
      key: "/audit-log",
      icon: <IoCalendarOutline />,
      label: "Calendar",
      permissions: [],
    },
    {
      key: "/notifications",
      icon: <IoNotifications />,
      label: " Notification",
      permissions: [], // No permissions required
    },
    {
      key: "/settings",
      icon: <IoSettingsSharp />,
      label: "Settings",
      permissions: [],
    },
  ];
  return (
    <header className="dashboard-header">
      <div className="mobile-content-container">
        <button className="sidebar-hamburger-button" onClick={toggleSider}>
          <RxHamburgerMenu />
        </button>
        <div className="mb-[50px]">
          <img
            src="https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg"
            alt="Logo"
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
      </div>

      <div className="main-content">
        {/* This side holds the link being displayed */}
        {dashboardHeaderLinkInformation.map(
          (dashboardHeaderLink, id) =>
            (pathname === dashboardHeaderLink.key ||
              pathname.startsWith(`/${dashboardHeaderLink.key}`)) && (
              <div
                key={id}
                className={`path-holder ${pathname === "/home" && "hide"}`}
              >
                <span>{dashboardHeaderLink.icon}</span>
                <p>{dashboardHeaderLink.label}</p>
              </div>
            )
        )}
        {/* This side holds each page button being passed to the header */}
        <div className="page-button-holder">{children}</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
