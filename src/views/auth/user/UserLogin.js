import React from "react";
import { Form } from "react-bootstrap";
import DefaultInput from "../../components/input/DefaultInput";
import DefaultButton from "../../components/button/DefaultButton";
import AuthTextRight from "../components/AuthTextRight";

const UserLogin = () => {

  return (
    <div className="d-flex align-items-center">
      <AuthTextRight class="col7 rightText" />
      <div className="col5">
        <div className="authFormContainer">
          <div className="authHeader"></div>
          <div className="authFormCard">
            <div>
              <h2>Sign in to Kwikpic</h2>
              <span>Enter your Email ID or Phone Number to continue</span>
            </div>
            <Form>
              <div className="mt-3"></div>
              <DefaultInput
                name="loginCredential"
                placeholder="Email ID/Phone Number"
                // error={error}
                // onChange={(e) => e.target.value && setError("")}
                // onChange={handleChange}
              />
              <div className="mt-3"></div>
              <DefaultButton title="Continue" type="submit" />
            </Form>
          </div>
          <div className="authFooter"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
