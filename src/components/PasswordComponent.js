import React from "react";

const PasswordComponent = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-text-input__label ReFormJS-password__label">
    <span>{label}</span>
    <input
      type="password"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default PasswordComponent;
