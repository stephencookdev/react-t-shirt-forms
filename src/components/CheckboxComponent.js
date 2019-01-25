import React from "react";
import { renderFuncOrString } from "../utils";

const CheckboxComponent = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-checkbox__label">
    <input
      type="checkbox"
      checked={value}
      onChange={e => onChange(e.target.checked)}
      onBlur={e => onBlur(e)}
    />
    <span>{renderFuncOrString(label)}</span>
  </label>
);

export default CheckboxComponent;
