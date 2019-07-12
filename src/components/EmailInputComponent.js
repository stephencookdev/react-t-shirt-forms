import React from "react";
import { genStyled } from "../optionDefaults";

const EmailInputComponent = ({
  className,
  required,
  onChange,
  onBlur,
  value,
  label
}) => {
  const Label = genStyled("label")(["email-input", "component"], "label");
  const Input = genStyled("input")(["email-input", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["email-input", "component"],
    "required-star"
  );

  return (
    <Label className={className}>
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

export default EmailInputComponent;
