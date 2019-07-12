import React from "react";
import i18n from "../i18n";
import { genStyled } from "../optionDefaults";

const MultiChoiceComponent = ({
  required,
  onChange,
  onBlur,
  value,
  label,
  choices
}) => {
  const Label = genStyled("label")(["multichoice", "component"], "label");
  const Select = genStyled("select")(["multichoice", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["multichoice", "component"],
    "required-star"
  );

  return (
    <Label>
      <span>
        {label}
        {required && <RequiredStar />}
      </span>
      <Select
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
      </Select>
    </Label>
  );
};

export default MultiChoiceComponent;
