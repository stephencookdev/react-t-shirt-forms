import React from "react";

const PasswordComponent = ({ onChange, value, label, error }) => (
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
    />
  </label>
);

export default PasswordComponent;
