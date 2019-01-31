import React from "react";

const DateInputComponent = ({ required, onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-date-input__label ReFormJS-text-input__label">
    <span>
      {label}
      {required && <span className="ReFormJS-component__required-star" />}
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
