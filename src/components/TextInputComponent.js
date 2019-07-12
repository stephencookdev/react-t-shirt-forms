import React from "react";
import { genStyled } from "../optionDefaults";

const TextInputComponent = ({ required, onChange, onBlur, value, label }) => {
  const Label = genStyled("label")(["text-input", "component"], "label");
  const Input = genStyled("input")(["text-input", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["text-input", "component"],
    "required-star"
  );

  return (
    <Label>
      <span>
        {label}
        {required && <RequiredStar />}
      </span>
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur(e)}
      />
    </Label>
  );
};

export default TextInputComponent;
