import React from "react";

const PasswordComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-text-input__label TShirtForm-password__label">
    <span>
      {label}
      {required && <span className="TShirtForm-component__required-star" />}
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
