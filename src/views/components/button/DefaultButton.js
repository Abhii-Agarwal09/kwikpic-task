import React from "react";
const DefaultButton = (props) => {
  const { title, onClick, type } = props;
  return (
    <button className="defaultButtom" type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default DefaultButton;
