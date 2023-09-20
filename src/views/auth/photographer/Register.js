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
import { REGISTER_PHOTOGRAPHER_PROFILE } from "../../../redux-store/sagas/saga-actions";
import { setLoading } from "../../../redux-store/slices/auth";
import Spinner from "../../components/loader/Spinner";

const fieldsNames = [
  "userName",
  "userLastName",
  "companyName",
  "companyEmail",
  "companyPhoneNumber",
];

const Register = () => {
  const {
    user,
    token,
    registerPhotographerResponse: { status },
    loading,
  } = useSelector((state) => state.auth);
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
      localStorage.setItem("token", "Bearer " + token);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, userType: "PHOTOGRAPHER" })
      );
      navigate("/", {
        replace: true,
      });
    }
  }, [status, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const userLastName = e.target.userLastName.value;
    const companyName = e.target.companyName.value;
    const companyEmail = e.target.companyEmail.value;
    const companyPhoneNumber = e.target.companyPhoneNumber.value;

    const allErrors = validate(
      userName,
      userLastName,
      companyName,
      companyEmail,
      companyPhoneNumber,
      user?.loginType
    );

    if (allErrors.length === 0) {
      setErrors([]);

      dispatch(setLoading(true));
      dispatch({
        type: REGISTER_PHOTOGRAPHER_PROFILE,
        payload: {
          userName,
          userLastName,
          business_name: companyName,
          business_phone: companyPhoneNumber,
          business_email: companyEmail,
          token,
        },
      });
    } else {
      setErrors(allErrors);
      return;
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Spinner loading={loading} />
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
                //onChange={handleChange}
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
                //onChange={handleChange}
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
                name={fieldsNames[2]}
                placeholder="Enter Company Name"
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[2])
                  )
                }
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
                placeholder="Enter Company Email"
                error={
                  errors.find((error) => error.field === fieldsNames[3])
                    ?.message
                }
              />
              <DefaultInput
                disabled={user?.loginType === "PHONE"}
                {...(user?.loginType === "PHONE" && {
                  value: user?.phoneNumber || "",
                })}
                name={fieldsNames[4]}
                onChange={(e) =>
                  e.target.value &&
                  setErrors((prev) =>
                    prev.filter((error) => error.field !== fieldsNames[4])
                  )
                }
                placeholder="Enter Company Mobile Number"
                error={
                  errors.find((error) => error.field === fieldsNames[4])
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

export default Register;

function validate(
  userName,
  userLastName,
  companyName,
  companyEmail,
  companyPhoneNumber,
  loginType
) {
  const allErrors = [];
  const inputFields = [
    userName,
    userLastName,
    companyName,
    companyEmail,
    companyPhoneNumber,
  ];

  inputFields.forEach((field, index) => {
    if (field === "") {
      allErrors.push({
        field: fieldsNames[index],
        message: "This field is required",
      });
    }
  });

  if (allErrors.length === 0) {
    if (!isValidUserName(userName)) {
      allErrors.push({
        field: "userName",
        message: "First name must only contains characters",
      });
    }
    if (!isValidUserName(userLastName)) {
      allErrors.push({
        field: "userLastName",
        message: "Last name must only contains characters",
      });
    }
    if (loginType === "EMAIL") {
      if (!isValidPhoneNumber(companyPhoneNumber)) {
        allErrors.push({
          field: "companyPhoneNumber",
          message: "Please enter a valid phone number",
        });
      }
    } else if (loginType === "PHONE") {
      if (!isValidEmail(companyEmail)) {
        allErrors.push({
          field: "companyEmail",
          message: "Please enter a valid email",
        });
      }
    }
  }
  return allErrors;
}
