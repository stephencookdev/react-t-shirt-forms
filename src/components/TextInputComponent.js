import React from "react";

const TextInputComponent = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-text-input__label">
    <span>{label}</span>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default TextInputComponent;
