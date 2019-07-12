import React from "react";
import { genStyled } from "../optionDefaults";

const DateInputComponent = ({ required, onChange, onBlur, value, label }) => {
  const Label = genStyled("label")(["date-input", "component"], "label");
  const Input = genStyled("input")(["date-input", "component"], "input");
  const RequiredStar = genStyled("span")(
    ["date-input", "component"],
    "required-star"
  );

  return (
    <Label>
      <span>
        {label}
        {required && <RequiredStar />}
      </span>
      <Input
        type="date"
        value={value ? value.toISOString().slice(0, 10) : ""}
        onChange={e =>
          onChange(e.target.value ? new Date(e.target.value) : null)
        }
        onBlur={e => onBlur(e)}
      />
    </Label>
  );
};

export default DateInputComponent;
