import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/nav";

const Layout = () => {
  return (
    <div>
      <Nav />
      <main className="p-6">
        <Outlet /> {/* This will render child pages */}
      </main>
    </div>
  );
};

export default Layout;
