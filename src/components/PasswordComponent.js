import React from "react";

const PasswordComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-text-input__label ReFormJS-password__label">
    <span>
      {label}
      {required && <span className="ReFormJS-component__required-star" />}
    </span>
    <input
      type="password"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default PasswordComponent;
