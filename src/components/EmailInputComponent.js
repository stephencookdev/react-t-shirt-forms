import React from "react";

const EmailInputComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-email-input__label TShirtForm-text-input__label">
    <span>
      {label}
      {required && <span className="TShirtForm-component__required-star" />}
    </span>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default EmailInputComponent;
