import React from "react";

const GrayModalBtn = ({ onClick, type, title, children }) => {
    return (
        <button type={type} className="grayModalBtn" onClick={onClick}>
            {title || children}
        </button>
    );
};
export default GrayModalBtn;
