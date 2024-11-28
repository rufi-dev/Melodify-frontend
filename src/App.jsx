import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyUser from "./pages/VerifyUser/VerifyUser.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import LoginWithCode from "./pages/LoginWithCode/LoginWithCode.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Update from "./pages/Update/Update.jsx";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:verificationToken" element={<VerifyUser />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/update/" element={<Update />} />
          <Route path="/profile/changePassword" element={<ChangePassword />} />
          <Route
            path="/resetPassword/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/loginWithCode/:username" element={<LoginWithCode />} />
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
