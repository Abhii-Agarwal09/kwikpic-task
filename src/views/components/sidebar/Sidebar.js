import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Sidebar = (props) => {
  const [params] = useSearchParams();
  const groupID = params.get("groupId");
  const { userType } = JSON.parse(localStorage.getItem("user"));

  const isPhotographer = userType === "PHOTOGRAPHER";

  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        {props.groupSettings && (
          <ul>
            <li className="sidebarHeading">
              <h6>Group Settings</h6>
            </li>
            {props.isAdmin && (
              <>
                <SidebarCol
                  link={"/settings/general?groupId=" + groupID}
                  name="General Setting"
                />
                <SidebarCol
                  link={"/settings/participants?groupId=" + groupID}
                  name="Participants"
                />
                <SidebarCol
                  link={"/settings/privacy?groupId=" + groupID}
                  name="Privacy Setting"
                />
                <SidebarCol
                  link={"/settings/folders?groupId=" + groupID}
                  name="Folders"
                />
                <SidebarCol
                  link={"/settings/design?groupId=" + groupID}
                  name="Design"
                  icon={true}
                />
                <SidebarCol
                  link={"/settings/download?groupId=" + groupID}
                  name="Download Setting"
                  icon={true}
                />
                {isPhotographer && (
                  <SidebarCol
                    link={"/settings/client?groupId=" + groupID}
                    name="Client Favourite"
                    icon={true}
                  />
                )}
              </>
            )}
            {!props.isAdmin && (
              <>
                <SidebarCol
                  link={"/settings/general/?groupId=" + groupID}
                  name="General Setting"
                />
                <SidebarCol
                  link={"/settings/participants/?groupId=" + groupID}
                  name="Participants"
                />
              </>
            )}
          </ul>
        )}
        {!props.groupSettings && (
          <ul className="nk-menu">
            <li className="sidebarHeading">
              <h6>
                {isPhotographer ? "Business Settings" : "Profile settings"}
              </h6>
            </li>
            <li className="nk-menu-item">
              <Link to={"/profile-settings/profile"} className="nk-menu-link">
                <span className="nk-menu-text">Your Profile</span>
              </Link>
            </li>
            {isPhotographer && (
              <li className="nk-menu-item">
                <Link
                  to={"/profile-settings/business"}
                  className="nk-menu-link"
                >
                  <span className="nk-menu-text">Business Branding</span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

const SidebarCol = (props) => {
  return (
    <li className="sidebarItem">
      <Link to={props.link} className="d-flex align-items-center">
        <span>{props.name}</span>
        {props.icon && (
          <img
            src="../../../assets/images/icons/premium.png"
            className="small ms-1"
            width={"16px"}
            alt="icon"
          />
        )}
      </Link>
    </li>
  );
};

export default Sidebar;
