import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/nav";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
