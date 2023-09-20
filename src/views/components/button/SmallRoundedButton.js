import React from "react";

const SecondaryButton = ({ onClick, type, title, children }) => {
  return (
    <button type={type} className="smallRoundedButton font-15" onClick={onClick}>
      {title || children}
    </button>
  );
};
export default SecondaryButton;
