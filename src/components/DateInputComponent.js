import React from "react";
import { renderFuncOrString } from "../utils";

const DateInputComponent = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-date-input__label ReFormJS-text-input__label">
    <span>{renderFuncOrString(label)}</span>
    <input
      type="date"
      value={value ? value.toISOString().slice(0, 10) : ""}
      onChange={e => onChange(e.target.value ? new Date(e.target.value) : null)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default DateInputComponent;
