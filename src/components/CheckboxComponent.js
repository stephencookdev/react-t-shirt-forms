import React from "react";

const CheckboxComponent = ({ onChange, onBlur, value, label, error }) => (
  <label
    className={
      "ReFormJS-component__label ReFormJS-text-input__label" +
      (error ? " ReFormJS-component__label--error" : "")
    }
  >
    <input
      type="checkbox"
      checked={value}
      onChange={e => onChange(e.target.checked)}
      onBlur={e => onBlur(e)}
    />
    {label}
  </label>
);

export default CheckboxComponent;
