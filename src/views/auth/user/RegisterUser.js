import React, { useState } from "react";
import AuthTextLeft from "../components/AuthTextLeft";
import { Form } from "react-bootstrap";
import DefaultInput from "../../components/input/DefaultInput";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import DefaultButton from "../../components/button/DefaultButton";
import { useDispatch, useSelector } from "react-redux";
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidUserName,
} from "../../../utils/helpers";
import { SET_USER_PROFILE } from "../../../redux-store/sagas/saga-actions";
import Spinner from "../../components/loader/Spinner";

const fieldsNames = ["name", "lastName", "phoneNumber", "email"];

const RegisterUser = () => {
  const { user, token } = useSelector((state) => state.auth);

  const {
    updatePhoneOrEmailSendOTPResponse: { status },
    settingLoader,
  } = useSelector((state) => state.settings);

  const [errors, setErrors] = useState([]);
  const [showModalOutlet, setShowModalOutlet] = useOutletContext(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showModalOutlet) {
      setShowModalOutlet(false);
      navigate("/auth/selectUser")
    }
  },[showModalOutlet])

  React.useEffect(() => {
    if (!user?.loginType) {
      navigate("/auth/login", {
        replace: true,
      });
    }
  }, []);

  React.useEffect(() => {
    if (status === 200) {
      navigate("/auth/click-selfie", {
        replace: true,
      });
    }
  }, [status, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const lastName = e.target.lastName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const email = e.target.email.value;

    const allErrors = validate(
      name,
      lastName,
      phoneNumber,
      email,
      user?.loginType
    );

    if (allErrors.length === 0) {
      setErrors([]);

      let data = {
        ...(user?.loginType === "EMAIL" && { email }),
        ...(user?.loginType === "EMAIL" && { secondaryPhone: phoneNumber }),
        ...(user?.loginType === "PHONE" && { phoneNumber }),
        ...(user?.loginType === "PHONE" && { secondaryEmail: email }),
      };

      dispatch({
        type: SET_USER_PROFILE,
        payload: {
          name,
          lastName,
          tocAccepted: false,
          token,
          ...data,
        },
      });
    } else {
      setErrors(allErrors);
      return;
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Spinner loading={settingLoader} />
      <AuthTextLeft class="col7" />
      <div className="col5 login-right-side">
        <div className="login-back-button font-24 font-thick blue-text">
          <Link to="/auth/selectUser" className="cursor-pointer">
            <img src="../../../assets/images/icons/back-arrow.png" alt="back-arrow" />
            Back
          </Link>
        </div>
        <div className="authFormContainer mobile-top-margin">
          {/* <div className="authHeader">
            Not a photographer?{" "}
            <Link to={"/auth/login"} className="ms-1">
              Sign In here
            </Link>
          </div> */}
          <div className="authFormCard">
            <div>
              <h2>Join Kwikpic</h2>
              <span>Be a part of our photographer&apos;s community </span>
            </div>
            <Form onSubmit={handleSubmit}>
              <DefaultInput
                name={fieldsNames[0]}
                placeholder="Enter First Name"
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[0])
                  )
                }
                error={
                  errors.find((error) => error.field === fieldsNames[0])
                    ?.message
                }
              />
              <DefaultInput
                name={fieldsNames[1]}
                placeholder="Enter Last Name"
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[1])
                  )
                }
                error={
                  errors.find((error) => error.field === fieldsNames[1])
                    ?.message
                }
              />
              <DefaultInput
                disabled={user?.loginType === "PHONE"}
                // value={user?.phoneNumber || ""}
                {...(user?.loginType === "PHONE" && {
                  value: user?.phoneNumber || "",
                })}
                name={fieldsNames[2]}
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[2])
                  )
                }
                placeholder="Enter Company Mobile Number"
                error={
                  errors.find((error) => error.field === fieldsNames[2])
                    ?.message
                }
              />
              <DefaultInput
                disabled={user?.loginType === "EMAIL"}
                {...(user?.loginType === "EMAIL" && {
                  value: user?.email || "",
                })}
                name={fieldsNames[3]}
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[3])
                  )
                }
                placeholder="Enter Email"
                error={
                  errors.find((error) => error.field === fieldsNames[3])
                    ?.message
                }
              />
              <div className="mt-3"></div>
              <DefaultButton type="submit" title="Continue" />
            </Form>
          </div>
          <div className="authFooter"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

function validate(name, lastName, phoneNumber, email, loginType) {
  const allErrors = [];
  const inputFields = [name, lastName, phoneNumber, email];

  inputFields.forEach((field, index) => {
    if (field === "") {
      allErrors.push({
        field: fieldsNames[index],
        message: "This field is required",
      });
    }
  });

  if (allErrors.length === 0) {
    if (!isValidUserName(name)) {
      allErrors.push({
        field: "name",
        message: "First name must only contains characters",
      });
    }
    if (!isValidUserName(lastName)) {
      allErrors.push({
        field: "lastName",
        message: "Last name must only contains characters",
      });
    }
    if (loginType === "EMAIL") {
      if (!isValidPhoneNumber(phoneNumber)) {
        allErrors.push({
          field: "phoneNumber",
          message: "Please enter a valid phone number",
        });
      }
    } else if (loginType === "PHONE") {
      if (!isValidEmail(email)) {
        allErrors.push({
          field: "email",
          message: "Please enter a valid email",
        });
      }
    }
  }
  return allErrors;
}
