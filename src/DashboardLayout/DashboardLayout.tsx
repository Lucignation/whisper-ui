import { Layout, Menu, Popover } from "antd";
import { FC, useMemo, useState } from "react";
import { ContentProps, DashboardNavLinkInformationType } from "./types";
import { useWindowWidth } from "@react-hook/window-size";
import { useLocation, useNavigate } from "react-router-dom";
import { AiTwotoneAppstore } from "react-icons/ai";
import { BsChatSquareTextFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import {
  IoCalendarOutline,
  IoCallSharp,
  IoNotifications,
  IoSettingsSharp,
} from "react-icons/io5";
import SidebarLogoutPopover from "./SidebarLogoutPopover/SidebarLogoutPopover";
import { CiLogin } from "react-icons/ci";
import DashboardHeader from "./DashboardHeader/DashboardHeader";

import "./DashboardLayout.scss";

const ContentLayout: FC<ContentProps> = ({ children, headerChildren }: any) => {
  const currentTheme = "light";
  const { Content, Sider } = Layout;
  const screenSize = useWindowWidth();
  const [currentSidebarTab, setCurrentSidebarTab] = useState();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // State for handling SidebarPopOver for users to log out
  const [open, setOpen] = useState(false);

  // Handle showing and hiding of sidebar on mobile
  const [showSidebar, setShowSideBar] = useState(
    screenSize > 768 ? false : true
  );
  const toggleSider = () => {
    setShowSideBar(!showSidebar);
  };

  // Function to handle showing and hiding the popover
  const handlePopoverOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const user = { permission: [""] };

  // Filter topNavLinks based on user permissions
  const filteredNavLinks = useMemo(() => {
    const userPermissions = user?.permission || [];
    const topNavLinks: DashboardNavLinkInformationType[] = [
      {
        key: "/app/main_feeds",
        icon: (
          <AiTwotoneAppstore
            size={25}
            color={`${
              currentSidebarTab === "/app/main_feeds" ? "#134B70" : ""
            }`}
          />
        ),
        label: "Apps",
        permissions: [], // No permissions required
      },
      {
        key: "/app/personal_chat",
        icon: (
          <BsChatSquareTextFill
            size={21}
            color={`${
              currentSidebarTab === "/app/personal_chat" ? "#508C9B" : ""
            }`}
          />
        ),
        label: "Chat",
        permissions: [],
      },
      {
        key: "/vendors",
        icon: <TiGroup size={22} />,
        label: "Group",
        permissions: [],
      },
      {
        key: "/requests",
        icon: <IoCallSharp size={20} />,
        label: "Calls",
        permissions: [],
      },
      {
        key: "/audit-log",
        icon: <IoCalendarOutline size={20} />,
        label: "Calendar",
        permissions: [],
      },
      {
        key: "/notifications",
        icon: <IoNotifications size={20} />,
        label: (
          <span className="notification">
            Notification
            {/* @ts-ignore */}
            {/* {notifications?.totalCount > 0 && (
              <span className="count-icon"> {notifications?.totalCount}</span>
            )} */}
          </span>
        ),
        permissions: [], // No permissions required
      },
      {
        key: "/settings",
        icon: <IoSettingsSharp size={20} />,
        label: "Settings",
        permissions: [],
      },
    ];

    return topNavLinks.filter(
      (link) =>
        link?.permissions?.length === 0 ||
        link?.permissions?.every((permission) =>
          userPermissions.includes(permission)
        )
    );
    // @ts-ignore
    //notifications?.totalCount, user?.permission
  }, []);

  const handleLogout = () => {
    //LOGOUT HERE
    // deleteLocalState("NSIBUser");
    // window.location.href = "/login";
  };

  return (
    <Layout className="content-layout">
      {/* Side Bar component */}
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        theme={currentTheme}
        width={280}
        trigger={null}
        collapsible
        collapsed={showSidebar}
        onCollapse={setShowSideBar}
        className="custom-sider"
      >
        {/* Sidebar Top components */}
        <div className="sidebar-top">
          <button className="sidebar-cancel-button" onClick={toggleSider}>
            {/* <CancelIcon /> */}X
          </button>
          <div className="mb-[90px] flex justify-center">
            <img
              src="https://www.logologo.com/logos/abstract-isometric-logo-design-free-logo.jpg"
              alt="Logo"
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>

          {/* First set of side bar Links */}
          <Menu
            onClick={(currentLink: any) => {
              setCurrentSidebarTab(currentLink.key);
              navigate(currentLink.key);
            }}
            mode="inline"
            selectedKeys={[pathname]}
            className="link-container"
            // items={topNavLinks}
            items={filteredNavLinks}
          />
        </div>

        {/* Sidebar bottom components */}
        <div className="sidebar-bottom">
          {/* Component containing users info */}
          <Popover
            content={<SidebarLogoutPopover hidePopover={handleLogout} />}
            trigger="click"
            className="popover"
            open={open}
            onOpenChange={handlePopoverOpenChange}
          >
            <div className="flex items-center justify-center">
              <span className="icon-text">
                <p className="initials">OJ</p>
                {/* <span className="others">
                  <p>Olumide James</p>
                  <p className="w-full line-clamp-1 text-ellipsis">
                    mide@gmail.com
                  </p>
                </span> */}
              </span>
              {/* <div>
                <CiLogin size={25} />
              </div> */}
            </div>
          </Popover>
        </div>
      </Sider>

      {/* Section for main page content */}
      <Layout className="page-container">
        <div
          className={`mobile-transparent-background ${
            !showSidebar ? "show md:!hidden" : "hide md:!hidden"
          } md:hidden`}
          onClick={() => {
            toggleSider();
          }}
        ></div>
        {/* Component holding the page content including the header and the page content */}
        <Content className="content-container">
          {/* Dashbaord header component */}
          <DashboardHeader toggleSider={toggleSider}>
            {headerChildren}
          </DashboardHeader>

          {/* Main page component passed to the layer component */}
          <main className="">{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContentLayout;
