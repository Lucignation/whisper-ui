import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.page";
import NotFound from "../pages/NotFound/NotFound.page";
import Layout from "../Layout/Layout";
import Signup from "../pages/Signup/Signup.page";
import Signin from "../pages/Signin/signin.page";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount.page";
import AuthenticateAccount from "../pages/AuthenticateAccount/AuthenticateAccount.page";
import CreateCompanyName from "../pages/Onboarding/CreateCompanyName.page";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that include the layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Routes without layout */}
        <Route path="/auth/get-started" element={<Signup />} />
        <Route path="/auth/login" element={<Signin />} />
        <Route path="/auth/verify-account" element={<VerifyAccount />} />
        <Route
          path="/auth/get-started/account_authenticated"
          element={<AuthenticateAccount />}
        />
        <Route
          path="/auth/get-started/create-company-name"
          element={<CreateCompanyName />}
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
