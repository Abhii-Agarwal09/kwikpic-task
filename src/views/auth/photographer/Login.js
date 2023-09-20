import React, { useEffect, useState } from "react";
import AuthTextLeft from "../components/AuthTextLeft";
import { Form } from "react-bootstrap";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultButton from "../../components/button/DefaultButton";
import { isValidEmail, isValidPhoneNumber } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { clearGoBackType, clearStatusAndOTPResponse, clearUser, setLoading } from "../../../redux-store/slices/auth";
import { useNavigate } from "react-router-dom";
import { REGISTER_REQUEST } from "../../../redux-store/sagas/saga-actions";
import { toast } from "react-toastify";
import Spinner from "../../components/loader/Spinner";
import CountryJson from "../components/CountryJson";
import { clearUpdatePhoneOrEmailSendOTPResponse } from "redux-store/slices/settings";

const Login = () => {
  const [countryCode, setCountryCode] = useState("+91");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState();
  const {
    registerResponse: { status, message },
    loading,
    goBackType,
  } = useSelector((state) => state.auth);
  const [val, setVal] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", {
        replace: true,
      });
    } else {
      localStorage.clear();
    }
  }, []);
  
  useEffect(() => {
    if (goBackType !== "login") {
      if (status === 200) {
        toast.success(message);
        navigate("/auth/otp");
      } else if (status === 400) {
        toast.success(message);
      }
    } else {
      dispatch(clearGoBackType())
      dispatch(clearUser())
      dispatch(clearStatusAndOTPResponse())
      dispatch(clearUpdatePhoneOrEmailSendOTPResponse())
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginCredentialInput = e.target.loginCredential.value;
    let credentials = {};

    if (loginCredentialInput === "") {
      setError("Please enter your email or phone number");
      return;
    }

    if (isValidPhoneNumber(loginCredentialInput)) {
      credentials.phoneNumber = loginCredentialInput;
      credentials.loginType = "PHONE";
      credentials.countryCode = countryCode; // need to set the actual country code.
    } else if (isValidEmail(loginCredentialInput)) {
      credentials.email = loginCredentialInput;
      credentials.loginType = "EMAIL";
    }

    if (Object.keys(credentials).length > 0) {
      dispatch(setLoading(true));
      dispatch({
        type: REGISTER_REQUEST,
        payload: credentials,
      });
    } else {
      setError("Please enter a valid email or phone number");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <Spinner loading={loading} />
        <AuthTextLeft class="col7" />
        <div className="col5">
          <div className="authFormContainer">
            <div className="authHeader"></div>
            <div className="authFormCard">
              <div>
                <h2>Sign in to Kwikpic</h2>
                <span>Enter your Email ID or Phone Number to continue</span>
              </div>
              <Form onSubmit={handleSubmit}>
                <div className="mt-3">
                  <div
                    className={
                      val.length >= 1 && !isNaN(val)
                        ? "showDropdown d-flex justify-content-end"
                        : "d-flex hideDropdown"
                    }
                  >
                    {/* <div> */}
                    <div className="countryJson mx-1">
                      {val.length >= 1 && !isNaN(val) && (
                        <CountryJson
                          setCountryCode={setCountryCode}
                          countryCode={countryCode}
                        />
                      )}
                    </div>
                    <DefaultInput
                      name="loginCredential"
                      placeholder="Email ID/Phone Number"
                      error={error}
                      onChange={(e) => setVal(e.target.value)}
                    />
                    {/* </div> */}
                  </div>
                </div>
                <div className="mt-3"></div>
                <DefaultButton title="Continue" type="submit" />
              </Form>
            </div>
            <div className="authFooter"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
