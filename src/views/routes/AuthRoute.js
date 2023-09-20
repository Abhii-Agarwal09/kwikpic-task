import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { useEffect } from "react";

const AuthRoute = () => {

  const location = useLocation();
  const [showModalOutlet, setShowModalOutlet] = useState(false)
  const [showBackArrow, setShowBackArrow] = useState(false)

  useEffect(() => {
    //can set showModalOutlet false here if it cannot be set inside the component
    if (location.pathname==="/auth/login") {
      setShowBackArrow(false);
    } else {
      setShowBackArrow(true);
    }
  },[location])

  return (
    <div className="authScreen">
      <div className="mobileHeader">
        <Navbar.Brand href="/">
          { showBackArrow && <img onClick={(e) => {e.preventDefault(); setShowModalOutlet(true)}} className="login-header-back-button" src="../../../assets/images/icons/back-arrow.png" alt="back-arrow" />}
          <img
            src="../../../../assets/images/global-images/logo.svg"
            alt="logo"
          />
        </Navbar.Brand>
      </div>
      <Outlet context={[showModalOutlet, setShowModalOutlet]} />
    </div>
  );
};

export default AuthRoute;
