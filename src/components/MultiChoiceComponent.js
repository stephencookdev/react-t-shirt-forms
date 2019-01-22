import React from "react";
import i18n from "../i18n";

const MultiChoiceComponent = ({
  onChange,
  onBlur,
  value,
  label,
  error,
  choices
}) => (
  <label
    className={
      "ReFormJS-component__label ReFormJS-date-input__label" +
      (error ? " ReFormJS-component__label--error" : "")
    }
  >
    {label}
    <select
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    >
      <option value="" disabled hidden>
        {i18n.multichoice.pleaseSelect}
      </option>
      {Object.keys(choices).map(choiceName => (
        <option key={choiceName} value={choiceName}>
          {choices[choiceName]}
        </option>
      ))}
    </select>
  </label>
);

export default MultiChoiceComponent;
