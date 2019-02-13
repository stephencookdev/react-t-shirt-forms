import React from "react";

const DateInputComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-date-input__label TShirtForm-text-input__label">
    <span>
      {label}
      {required && <span className="TShirtForm-component__required-star" />}
    </span>
    <input
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ""}
      onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default DateInputComponent;
