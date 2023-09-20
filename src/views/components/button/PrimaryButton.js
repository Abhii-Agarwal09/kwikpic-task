import React from "react";
import { Link } from "react-router-dom";

const PrimaryButton = (props) => {
  return (
    <Link className="primaryButton max-180" to={props.onClick ? props.onClick : ""}>
      {props.title}
    </Link>
  );
};

export default PrimaryButton;
