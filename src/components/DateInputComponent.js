import React from "react";

const DateInputComponent = ({ onChange, onBlur, value, label, error }) => (
  <label
    className={
      "ReFormJS-component__label ReFormJS-date-input__label" +
      (error ? " ReFormJS-component__label--error" : "")
    }
  >
    {label}
    <input
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ""}
      onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default DateInputComponent;
