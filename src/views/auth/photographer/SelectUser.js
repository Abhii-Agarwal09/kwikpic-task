import React from "react";
import AuthTextLeft from "../components/AuthTextLeft";
import { Form } from "react-bootstrap";
import DefaultButton from "../../components/button/DefaultButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearGoBackType, clearStatusAndOTPResponse, setGoBackType } from "redux-store/slices/auth";
import ConfirmationModal from "views/components/modals/ConfirmationModal";
import { clearUpdatePhoneOrEmailSendOTPResponse } from "redux-store/slices/settings";

const userType = {
  USER: "user",
  PHOTOGRAPHER: "photographer",
};

const defaultChecked = userType.PHOTOGRAPHER;

const SelectUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const [showModalOutlet, setShowModalOutlet] = useOutletContext(false);
  const { goBackType } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    e.preventDefault();

    const selectedUserType = Array.from(e.target?.flexRadioDefault).find(
      (item) => item.checked
    );

    if (selectedUserType) {
      if (selectedUserType.id === userType.USER) {
        navigate("/auth/register-user");
      } else if (selectedUserType.id === userType.PHOTOGRAPHER) {
        navigate("/auth/register");
      }
    }
  };

  React.useEffect(() => {
    dispatch(clearUpdatePhoneOrEmailSendOTPResponse())
    dispatch(clearStatusAndOTPResponse())
    if (!user?.loginType) {
      navigate("/auth/login", {
        replace: true,
      });
    } else if (goBackType === "selectUser") {
      dispatch(clearGoBackType())
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
              <h2>Sign up to Kwikpic</h2>
              <span>
                Welcome! You are new here. Set up your account as a user or a
                photographer
              </span>
            </div>
            <Form onSubmit={handleChange}>
              <div className="mt-3"></div>
              <UserCard />
              <div className="mt-3"></div>
              <DefaultButton
                title="Continue"
                type="submit"
                // onClick={handleChange}
              />
            </Form>
          </div>
          <div className="authFooter"></div>
        </div>
      </div>
    </div>
  );
};

const UserCard = () => {
  return (
    <div className="userCard">
      <div className="form-check">
        <input
          className="form-check-input d-none"
          type="radio"
          name="flexRadioDefault"
          id={userType.USER}
          checked={userType.USER === defaultChecked}
        />
        <label className="form-check-label" htmlFor={userType.USER}>
          <img src="../../../../assets/images/auth/user.png" alt="user" />
          <span>I’m a User, viewing & uploading photos for my events</span>
          <div className="d-flex align-items-start">
            <span className="checked">
              <img src="../../../../assets/images/icons/tick-white.svg" alt="user" />
            </span>
            <span className="unchecked"></span>
          </div>
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input d-none"
          type="radio"
          name="flexRadioDefault"
          id={userType.PHOTOGRAPHER}
          checked={userType.PHOTOGRAPHER === defaultChecked}
        />
        <label className="form-check-label" htmlFor={userType.PHOTOGRAPHER}>
          <img
            src="../../../../assets/images/auth/photographer.png"
            alt="user"
          />
          <span>I’m a Photographer, delivering photos professionally</span>
          <div>
            <span className="checked">
              <img src="../../../../assets/images/icons/tick-white.svg" alt="user" />
            </span>
            <span className="unchecked"></span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SelectUser;
