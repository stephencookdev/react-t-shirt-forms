import React from "react";
import { genStyled } from "../optionDefaults";

const PasswordComponent = ({ required, onChange, onBlur, value, label }) => {
  const Label = genStyled("label")(["password", "component"], "label");
  const Input = genStyled("input")(["password", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["password", "component"],
    "required-star"
  );

  return (
    <Label>
      <span>
        {label}
        {required && <RequiredStar />}
      </span>
      <Input
        type="password"
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={e => onBlur(e)}
      />
    </Label>
  );
};

export default PasswordComponent;
