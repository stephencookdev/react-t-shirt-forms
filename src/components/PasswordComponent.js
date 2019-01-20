import React from "react";

const PasswordComponent = ({ onChange, onBlur, value, label, error }) => (
  <label
    className={
      "ReFormJS-component__label ReFormJS-password__label" +
      (error ? " ReFormJS-component__label--error" : "")
    }
  >
    {label}
    <input
      type="password"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default PasswordComponent;
