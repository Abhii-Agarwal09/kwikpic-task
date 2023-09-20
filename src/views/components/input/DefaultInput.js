import React, { forwardRef } from "react";

const DefaultInput = forwardRef((props, ref) => {
  return (
    <label style={{ width: "100%" }}>
      <input
        className="defaultInput"
        ref={ref}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onClick={props.onClick}
      />
      <p className="input_fields-error">{props.error}</p>
    </label>
  );
});
DefaultInput.displayName = "defaultInput";

export default DefaultInput;
