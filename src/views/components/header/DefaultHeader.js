import useLogoutHandler from "hooks/useLogoutHandler";
import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuDrawer from "../sidebar/MenuDrawer";

const DefaultHeader = (props) => {
  const { logoutHandler } = useLogoutHandler();
  const { userType, name, lastName, avatar } = JSON.parse(
    localStorage.getItem("user")
  );
  const userName = (name || "User") + " " + (lastName || "");

  const isPhotographer = userType === "PHOTOGRAPHER";

  return (
    <div className="defaultHeader">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container className="position-relative max-w-full">
          <div>
            {props.goBack && (
              <Navbar.Brand
                as={Link}
                to={typeof props.goBack === "string" ? props.goBack : "/"}
              >
                <img
                  width="16px"
                  src="../../../assets/images/icons/back-arrow.png"
                  alt="logo"
                />
              </Navbar.Brand>
            )}
            <Navbar.Brand as={Link} to="/">
              <img
                className="default-header-logo"
                src="../../../assets/images/global-images/logo.svg"
                alt="logo"
              />
            </Navbar.Brand>
          </div>

          <MenuDrawer />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown
                title={
                  <div className="header-user">
                    <div className="header-thumb">
                      <img
                        className="thumbnail-image h-30 aspect-square rounded-full"
                        src={avatar || "../../../assets/images/icons/user.png"}
                        alt="user pic"
                      />
                    </div>
                    {userName}
                    <img
                      className="menu-arrow"
                      src="../../../assets/images/icons/arrow-down.png"
                      alt="user pic"
                    />
                  </div>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/">
                  <img
                    className="thumbnail-image"
                    src="../../../assets/images/icons/setting.png"
                    alt="user pic"
                  />
                  {isPhotographer ? "Business Settings" : "Profile Settings"}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/analytics">
                  <img
                    className="thumbnail-image"
                    src="../../../assets/images/icons/setting.png"
                    alt="user pic"
                  />
                  Analytics
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <img
                    className="thumbnail-image"
                    src="../../../assets/images/icons/infoq.png"
                    alt="user pic"
                  />
                  Help & Support
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  <img
                    className="thumbnail-image"
                    src="../../../assets/images/icons/info.png"
                    alt="user pic"
                  />
                  About
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  <img
                    className="thumbnail-image"
                    src="../../../assets/images/icons/download.png"
                    alt="user pic"
                  />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default DefaultHeader;
