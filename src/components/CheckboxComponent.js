import React from "react";
import { genStyled } from "../optionDefaults";

const CheckboxComponent = ({ required, onChange, onBlur, value, label }) => {
  const Label = genStyled("label")(["checkbox", "component"], "label");
  const Input = genStyled("input")(["checkbox", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["checkbox", "component"],
    "required-star"
  );

  return (
    <Label>
      <Input
        type="checkbox"
        checked={value}
        onChange={e => onChange(e.target.checked)}
        onBlur={e => onBlur(e)}
      />
      <span>
        {label}
        {required && <RequiredStar />}
      </span>
    </Label>
  );
};
export default CheckboxComponent;
