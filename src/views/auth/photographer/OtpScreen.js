import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import AuthTextLeft from "../components/AuthTextLeft";
import { Form } from "react-bootstrap";
import DefaultButton from "../../components/button/DefaultButton";
import { useDispatch, useSelector } from "react-redux";
import { VERIFY_OTP_REQUEST } from "../../../redux-store/sagas/saga-actions";
import { setGoBackType, setLoading } from "../../../redux-store/slices/auth";
import Spinner from "../../components/loader/Spinner";
import ConfirmationModal from "views/components/modals/ConfirmationModal";

const OTP_LENGTH = 4;

const OtpScreen = () => {
  const [otp, setOtp] = useState();
  const [error, setError] = useState();
  const [showModalOutlet, setShowModalOutlet] = useOutletContext(false);

  const dispatch = useDispatch();
  const { user, verifyOTPResponse, token, loading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (verifyOTPResponse?.status) {
      const { status } = verifyOTPResponse;
      if (status === 200 || status === 201) {
        if (user?.userType === "PHOTOGRAPHER") {
          localStorage.setItem("token", `Bearer ${token}`);
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/");
        } else if (user?.userType === "USER") {
          const redirectLink = redirectTo(user);
          if (
            redirectLink === userRedirectLinks.USER_PROFILE_REGISTER ||
            redirectLink === userRedirectLinks.USER_AVATAR_VERIFICATION ||
            redirectLink === userRedirectLinks.USER_SELECTION
          ) {
            navigate(redirectLink);
          } else if (redirectLink === userRedirectLinks.USER_PROFILE) {
            localStorage.setItem("token", `Bearer ${token}`);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(redirectLink);
          }
        }
      }
    }
  }, [verifyOTPResponse]);

  const handleError = (value) => {
    setOtp(value);
    if (value > 0) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp && otp.length === OTP_LENGTH && !isNaN(Number(otp))) {
      let payload;
      if (user?.loginType === "PHONE") {
        const { phoneNumber, countryCode } = user;
        payload = { phoneNumber, countryCode };
      } else if (user?.loginType === "EMAIL") {
        const { email } = user;
        payload = { email };
      }

      if (Object.keys(payload).length > 0) {
        dispatch(setLoading(true));
        dispatch({
          type: VERIFY_OTP_REQUEST,
          payload: {
            ...payload,
            otp,
          },
        });
      }
    } else {
      setError("Invalid OTP");
    }
  };

  useEffect(() => {
    if (!user?.loginType) {
      navigate("/auth/login", {
        replace: true,
      });
    }
  }, []);

  return (
    <div className="d-flex align-items-center">
      <ConfirmationModal 
        show={showModalOutlet} 
        title={"Go Back"} 
        message={"Sign in with a different Email ID or Phone Number?"}
        onConfirm={() => {setShowModalOutlet(false); dispatch(setGoBackType("login")); navigate("/auth/login")}}
        onCancel={() => setShowModalOutlet(false)}
      />
      <Spinner loading={loading} />
      <AuthTextLeft class="col7" />
      <div className="col5 login-right-side">
        <div className="login-back-button font-24 font-thick blue-text">
          <a onClick={() => setShowModalOutlet(true)} className="cursor-pointer">
            <img src="../../../assets/images/icons/back-arrow.png" alt="back-arrow" />
            Back
          </a>
        </div>
        <div className="authFormContainer">
          <div className="authHeader"></div>
          <div className="authFormCard">
            <div>
              <h2>Sign in to Kwikpic</h2>
              <span>Enter your Email ID or Phone Number to continue</span>
            </div>
            <Form onSubmit={handleSubmit}>
              <div className="mt-5"></div>
              <OtpInput
                className="otp-input"
                isInputNum={true}
                numInputs={OTP_LENGTH}
                onChange={handleError}
                value={otp}
                separator={<span className="p-1"></span>}
              />

              <span className="text-danger form-group d-flex"></span>
              <p className="input_fields-error">{error}</p>
              <div className="mt-3"></div>
              <div style={{ maxWidth: "275px" }}>
                <DefaultButton title="Continue" type="submit" />
              </div>
            </Form>

            <div className="form-note-s2 pt-2">
              <Link to="/">Resend OTP?</Link>
            </div>
          </div>
          <div className="authFooter"></div>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;

function redirectTo(user) {
  const { name, isAvatarVerified } = user || {};
  if (name === null && !isAvatarVerified) {
    return userRedirectLinks.USER_SELECTION;
  }

  if (!isAvatarVerified && name !== null) {
    return userRedirectLinks.USER_AVATAR_VERIFICATION;
  }

  if (name === null) {
    return userRedirectLinks.USER_PROFILE_REGISTER;
  }

  return userRedirectLinks.USER_PROFILE;
}

const userRedirectLinks = {
  USER_PROFILE: "/",
  USER_SELECTION: "/auth/selectUser",
  USER_PROFILE_REGISTER: "/auth/register-user",
  USER_AVATAR_VERIFICATION: "/auth/click-selfie",
};
