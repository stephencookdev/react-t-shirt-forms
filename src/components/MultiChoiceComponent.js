import React from "react";
import i18n from "../i18n";
import { renderFuncOrString } from "../utils";

const MultiChoiceComponent = ({ onChange, onBlur, value, label, choices }) => (
  <label className="ReFormJS-component__label ReFormJS-multichoice__label">
    <span>{renderFuncOrString(label)}</span>
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
