import "./SidebarLogoutPopover.scss";
// import { getSavedState } from "../../utils/localStorage";
// import { getFullNameInitials } from "../../utils/getInitials";
import { CiLogin } from "react-icons/ci";

const SidebarLogoutPopover = ({ hidePopover }: { hidePopover: () => void }) => {
  // const user = getSavedState("NSIBUser");
  const user = { userName: "", fullName: "" };
  const fullName = user?.fullName || "";
  const firstName = fullName?.split(" ")[0] || "";
  const email = user?.userName || "";

  return (
    <div className="popover-content">
      <div className="users-detail">
        <span className="icon-text">
          <p className="initials">OG</p>
          <span className="others">
            <p>{firstName}</p>
            <p className="w-full line-clamp-1 text-ellipsis">{email}</p>
          </span>
        </span>
      </div>
      <hr />
      <button onClick={hidePopover} className="logout-button">
        <CiLogin size={25} />
        Logout
      </button>
    </div>
  );
};

export default SidebarLogoutPopover;
