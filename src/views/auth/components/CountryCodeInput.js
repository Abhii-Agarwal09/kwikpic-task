import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const CountryCodeInput = () => {
  const [value, setValue] = useState();

  return (
    <PhoneInput
      type="text"
      defaultCountry="IN"
      placeholder="Enter phone number"
      onChange={setValue}
      value={value}
    />
  );
};
export default CountryCodeInput;
