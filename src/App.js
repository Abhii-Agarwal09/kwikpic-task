import React from "react";
import { store } from "./redux-store/store";
import "./App.css";
import AuthRoute from "./views/routes/AuthRoute";
import Login from "./views/auth/photographer/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRoute from "./views/routes/MainRoute";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/main/home/Home";
import OtpScreen from "./views/auth/photographer/OtpScreen";
import SelectUser from "./views/auth/photographer/SelectUser";
import Register from "./views/auth/photographer/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import LoginViaLink from "./views/auth/user/LoginViaLink";
import ClickSelfie from "./views/auth/user/ClickSelfie";
import RegisterUser from "./views/auth/user/RegisterUser";
import NotFound from "views/notFound/NotFound";
import Analytics from "views/main/home/components/Analytics/Analytics";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
        rtl={false}
      />
      <BrowserRouter>
        <Routes>

          {/* landing page routerlinks */}

          <Route path="/auth" name="auth" element={<AuthRoute />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/otp" element={<OtpScreen />} />
            <Route path="/auth/selectUser" element={<SelectUser />} />
            <Route path="/auth/register" element={<Register />} />

            <Route path="/auth/register-user" element={<RegisterUser />} />
            {/* <Route path="/auth/user-login" element={<UserLogin />} /> */}
            <Route path="/auth/login-link" element={<LoginViaLink />} />
            <Route path="/auth/click-selfie" element={<ClickSelfie />} />
          </Route>

          <Route path="/" name="home" element={<MainRoute />}>
            <Route index element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>

          {/* 404 route */}
          <Route path="*" name="not found" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
