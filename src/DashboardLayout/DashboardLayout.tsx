import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContentProps } from "./type";
import { BsChatSquareTextFill } from "react-icons/bs";
import {
  IoHomeOutline,
  IoCallSharp,
  IoCalendarOutline,
  IoSettingsSharp,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoGridOutline,
} from "react-icons/io5";
import { cn } from "../lib/utils";

// ─── Nav item definition ───────────────────────────────────────────────────────

const navItems = [
  { path: "/app/main_feeds", icon: IoHomeOutline, label: "Home" },
  { path: "/app/personal_chat", icon: BsChatSquareTextFill, label: "Chat" },
  { path: "/app/groups", icon: IoPeopleOutline, label: "Groups" },
  { path: "/app/calls", icon: IoCallSharp, label: "Calls" },
  { path: "/app/calendar", icon: IoCalendarOutline, label: "Calendar" },
  { path: "/app/apps", icon: IoGridOutline, label: "Apps" },
  { path: "/app/notifications", icon: IoNotificationsOutline, label: "Notifications" },
  { path: "/app/admin/settings", icon: IoSettingsSharp, label: "Settings" },
];

// ─── Tooltip wrapper ───────────────────────────────────────────────────────────

const NavTooltip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="relative group flex items-center justify-center">
    {children}
    <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#2D2F3E] px-3 py-1.5 text-xs font-medium text-[#E8E6F2] opacity-0 shadow-xl transition-all duration-150 group-hover:opacity-100 z-50">
      {label}
    </span>
  </div>
);

// ─── Workspace Sidebar ─────────────────────────────────────────────────────────

const WorkspaceSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col items-center w-[68px] flex-shrink-0 h-full bg-[#1A0D2B] border-r border-white/[0.06] py-4 z-20">
      {/* Logo / Workspace Avatar */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-900/40 cursor-pointer">
          <span className="text-white font-bold text-sm tracking-wide">W</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-white/10 mb-5" />

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-1 flex-1 w-full px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive =
            pathname === path || pathname.startsWith(path + "/");
          return (
            <NavTooltip key={path} label={label}>
              <button
                onClick={() => navigate(path)}
                aria-label={label}
                className={cn(
                  "relative w-11 h-11 flex flex-col items-center justify-center rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-[#3B2C5C] text-[#C084FC]"
                    : "text-[#9B98B0] hover:bg-[#251638] hover:text-[#E8E6F2]"
                )}
              >
                <Icon size={20} />
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-[#9333EA]" />
                )}
              </button>
            </NavTooltip>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="w-8 h-px bg-white/10 mb-4" />

      {/* User Avatar */}
      <NavTooltip label="Sophia Henry (You)">
        <button className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#9333EA]/50 hover:ring-[#9333EA] transition-all duration-200">
          <div className="w-full h-full bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SH</span>
          </div>
        </button>
      </NavTooltip>
    </aside>
  );
};

// ─── Mobile Bottom Nav ─────────────────────────────────────────────────────────

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#1A0D2B] border-t border-white/[0.06] flex items-center justify-around px-2 pb-safe">
      {mobileItems.map(({ path, icon: Icon, label }) => {
        const isActive =
          pathname === path || pathname.startsWith(path + "/");
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            aria-label={label}
            className={cn(
              "flex flex-col items-center gap-0.5 py-3 px-3 rounded-xl transition-all duration-200",
              isActive ? "text-[#C084FC]" : "text-[#635E7A]"
            )}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

// ─── Content Layout ────────────────────────────────────────────────────────────

const ContentLayout: FC<ContentProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#12111A]">
      <WorkspaceSidebar />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden pb-[60px] md:pb-0">
        {children}
      </div>

      <MobileBottomNav />
    </div>
  );
};

export default ContentLayout;
