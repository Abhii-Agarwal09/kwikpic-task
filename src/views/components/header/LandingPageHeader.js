import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";

const LandingPageHeader = () => {

  const navigator = useNavigate();
  const login = () => {
    navigator("/auth/login");
  }
  return (
    <Navbar sticky="top" key="lg" expand="lg" className=" navbar-bg thick-font">
      <Container className="landing-header">
        <Navbar.Brand >
          <Link to="/landing/home">
            <img className="logo" src="../../../assets/images/global-images/logo.svg" alt="logo" />
          </Link>
        </Navbar.Brand>
        <div className="create-join-sub maring-auto">
          <Link className="sub-menu" to="/">Create</Link>
          <Link className="sub-menu" to="/join">Join</Link>
        </div>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-lg"
            >
              <Link to="/landing/home">
                <img
                  className="logo"
                  src="../../../assets/images/global-images/logo.svg"
                  alt="logo"
                />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="px-4 font-14">
              <Nav.Link> <Link className="semi-black-text" to="/landing/photographer-dashboard" > Photographer Benefits </Link></Nav.Link>
              <Nav.Link> <Link className="semi-black-text" to="/landing/aboutus" > About Us </Link></Nav.Link>
              <Nav.Link> <Link className="semi-black-text" to="/landing/contactus" > Contact Us </Link></Nav.Link>
            </Nav>
            <Nav className="px-4 font-14">
              <Nav.Link> <Link className="blue-text" to="/join" > Join a Group </Link></Nav.Link>
              <Nav.Link> <Link className="blue-text" to="/" > Create a Group </Link></Nav.Link>
            </Nav>
            <button className="signUp maring-auto signUp-desktop">Sign Up or Login</button>
            <div className="button-box maring-auto">
              <button className="download-button bottom-margin-16">Download Kwikpic</button>
              <button className="signUp" onClick={login}>Sign Up or Login</button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default LandingPageHeader;
