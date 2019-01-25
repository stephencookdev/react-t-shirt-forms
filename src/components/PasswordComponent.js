import React from "react";
import { renderFuncOrString } from "../utils";

const PasswordComponent = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-text-input__label ReFormJS-password__label">
    <span>{renderFuncOrString(label)}</span>
    <input
      type="password"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default PasswordComponent;
