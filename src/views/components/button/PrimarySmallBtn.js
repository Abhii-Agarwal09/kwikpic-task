import React from "react";

const PrimarySmallBtn = (props) => {
  return (
    <button className="primarySmallBtn" onClick={props.onClick}>
      {props.title}
    </button>
  );
};
export default PrimarySmallBtn;
