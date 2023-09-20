import React from "react";

const AuthTextRight = (props) => {
  return (
    <div className={props.class}>
      <div className="authTextLeft">
        <img
          src={"../../../../../assets/images/auth/login-banner.svg"}
          alt="banner"
        />
        <div className="overlayText">
          Sharing photos has never been easier! Kwikpic helps you seamlessly
          share photos with everyone at once. Zero hassle.
        </div>
      </div>
    </div>
  );
};

export default AuthTextRight;
