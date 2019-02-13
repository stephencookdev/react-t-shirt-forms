import React from "react";

const CheckboxComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-checkbox__label">
    <input
      type="checkbox"
      checked={value}
      onChange={e => onChange(e.target.checked)}
      onBlur={e => onBlur(e)}
    />
    <span>
      {label}
      {required && <span className="TShirtForm-component__required-star" />}
    </span>
  </label>
);

export default CheckboxComponent;
