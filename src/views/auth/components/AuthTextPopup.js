import React from "react";
import {Link} from "react-router-dom";

const AuthTextPopup = (props) => {
    return (
        <div className={props.class}>
            <div className="authTextLeft">
                <img
                    src={"../../../../../assets/images/auth/login-banner.svg"}
                    alt="banner"
                />
                <div className="overlayText">
                    <div className="gallaryHeadingRight d-flex align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            <div className="companyLogo">
                                <img
                                    src="../../../../../assets/images/login-banner.svg"
                                    alt="thumb"
                                />
                            </div>
                            <ul className="ps-0 mb-0 d-flex">
                                <li>
                                    <Link to="/">
                                        <img src="../../../assets/images/icons/fb.png" alt="icon"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <img src="../../../assets/images/icons/insta.png" alt="icon"/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <img src="../../../assets/images/icons/linked.png" alt="icon"/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="gallaryHeading d-flex flex-column align-items-center">
                        <h4>Album by Atlas Photography</h4>
                        <p>
                            {props.title} 0 Photos
                        </p>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                       <span>Private Group</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthTextPopup;
