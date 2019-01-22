import React from "react";

const EmailInputComponent = ({ onChange, onBlur, value, label, error }) => (
  <label
    className={
      "ReFormJS-component__label ReFormJS-email-input__label" +
      (error ? " ReFormJS-component__label--error" : "")
    }
  >
    {label}
    <input
      type="email"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default EmailInputComponent;
