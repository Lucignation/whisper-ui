import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.page";
import NotFound from "../pages/NotFound/NotFound.page";
import Layout from "../Layout/Layout";
import Signup from "../pages/Signup/signup.page";
import Signin from "../pages/Signin/signin.page";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount.page";
import AuthenticateAccount from "../pages/AuthenticateAccount/AuthenticateAccount.page";
import CreateCompanyName from "../pages/Onboarding/CreateCompanyName.page";
import Dashboard from "../pages/Dashboard/Dashboard.page";
import Chat from "../pages/Chat/Chat.page";
import Settings from "../pages/Settings/Settings.page";
import Groups from "../pages/Groups/Groups.page";
import Calls from "../pages/Calls/Calls.page";
import Calendar from "../pages/Calendar/Calendar.page";
import Notifications from "../pages/Notifications/Notifications.page";
import Apps from "../pages/Apps/Apps.page";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public landing */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Auth flow */}
        <Route path="/auth/get-started" element={<Signup />} />
        <Route path="/auth/login" element={<Signin />} />
        <Route path="/auth/verify-account" element={<VerifyAccount />} />
        <Route path="/auth/get-started/account_authenticated" element={<AuthenticateAccount />} />
        <Route path="/auth/get-started/create-company-name" element={<CreateCompanyName />} />

        {/* App */}
        <Route path="/app/main_feeds" element={<Dashboard />} />
        <Route path="/app/personal_chat" element={<Chat />} />
        <Route path="/app/groups" element={<Groups />} />
        <Route path="/app/calls" element={<Calls />} />
        <Route path="/app/calendar" element={<Calendar />} />
        <Route path="/app/apps" element={<Apps />} />
        <Route path="/app/notifications" element={<Notifications />} />
        <Route path="/app/admin/settings" element={<Settings />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
