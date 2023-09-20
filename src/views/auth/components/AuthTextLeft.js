import React from "react";

const AuthTextLeft = (props) => {
  return (
    <div className={props.class}>
      <div className="authTextLeft">
        <img
          src={"../../../../../assets/images/auth/login-banner.svg"}
          alt="banner"
        />
        <div className="signup-logo-wrapper">
          <img src="../../../assets/images/global-images/logo_colored_white.svg" alt="logo" />
        </div>
        <div className="overlayText">
          Sharing photos has never been easier! Kwikpic helps you seamlessly
          share photos with everyone at once. Zero hassle.
        </div>
      </div>
    </div>
  );
};

export default AuthTextLeft;
