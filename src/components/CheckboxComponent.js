import React from "react";

const CheckboxComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-checkbox__label">
    <input
      type="checkbox"
      checked={value}
      onChange={e => onChange(e.target.checked)}
      onBlur={e => onBlur(e)}
    />
    <span>
      {label}
      {required && <span className="ReFormJS-component__required-star" />}
    </span>
  </label>
);

export default CheckboxComponent;
