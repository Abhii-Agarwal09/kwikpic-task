import useLogoutHandler from "hooks/useLogoutHandler";
import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
// import { logoutHandler } from "../header/GallaryHeader";

const MenuDrawer = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { logoutHandler } = useLogoutHandler();
  const { userType, name, lastName, avatar } = JSON.parse(localStorage.getItem("user"));
  const userName = (name || "User") + " " + (lastName || "");
  const isPhotographer = userType === "PHOTOGRAPHER";
  return (
      <>
        <button onClick={toggleDrawer} className="drawerMenu">
          { props?.alwaysWhite ?
              <img className="drawer-menu-light-hamburger" src="/assets/images/menu-white.svg" alt="menu icon" /> 
            :
              <>
                <img className="light-menu-hamburger" src="../../../../assets/images/menu.png" alt="menu icon" />
                <img className="dark-menu-hamburger drawer-menu-light-hamburger" src="/assets/images/menu-white.svg" alt="menu icon" />
              </> 
          }
        </button>
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            className="bla bla bla"
        >
          <div className="drawerContainer">
            <div className="drawerTop">
              <div className="userImage">
                <img
                    className="h-60 aspect-square rounded-full"
                    src={avatar || "../../../../assets/images/icons/user.png"}
                    alt="menu icon"
                />
              </div>
              <h5>{userName}</h5>
          </div>
          <div className="drawerItems">
            <ul>
              {isPhotographer ? (
                <>
                  <li className="for-pc">
                    <Link to={"/profile-settings/business"}>
                      <img
                        src={"../../../../assets/images/icons/setting.png"}
                        alt="menu icon"
                      />
                      Business Settings
                    </Link>
                  </li>
                  <li className="for-mobile">
                    <Link to={"/profile-settings/list"}>
                      <img
                        src={"../../../../assets/images/icons/setting.png"}
                        alt="menu icon"
                      />
                      Business Settings
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/profile-settings/profile">
                    <img
                      src={"../../../../assets/images/icons/setting.png"}
                      alt="menu icon"
                    />
                    Profile Settings
                  </Link>
                </li>
              )}

              <li>
                <Link to="/">
                  <img
                    src={"../../../../assets/images/icons/level.png"}
                    alt="menu icon"
                  />
                  Analytics
                </Link>
              </li>

              <li>
                <Link to="/">
                  <img
                    src={"../../../../assets/images/icons/infoq.png"}
                    alt="menu icon"
                  />
                  Help and Support
                </Link>
              </li>

              <li>
                <Link to="/">
                  <img
                    src={"../../../../assets/images/icons/info.png"}
                    alt="menu icon"
                  />
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/" onClick={logoutHandler}>
                  <img
                    src={"../../../../assets/images/icons/download.png"}
                    alt="menu icon"
                  />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
