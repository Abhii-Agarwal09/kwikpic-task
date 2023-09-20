import React from "react";

const SecondaryButton = (props) => {
  return (
    <button className="secondaryButton max-180" style={props?.style || {}} onClick={props.onClick}>
      {/* {props.icon && (
        <img src="../../../assets/images/icons/premium.png" alt="icon" />
      )} */}
      {props.title}
    </button>
  );
};
export default SecondaryButton;
