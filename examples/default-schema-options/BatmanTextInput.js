import React from "react";

const revealStringBatman =
  "Ah you think darkness is your ally... But you merely adopted the dark. I was born in it, molded by it. I didn't see the light until I was already a man, by then it was nothing to me but blinding! 🦇";

const batmanReveal = str => revealStringBatman.substring(0, str.length);

const BatmanTextInput = ({ onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-text-input__label">
    <span>
      {"Batman: "}
      {label}
    </span>
    <input
      type="text"
      value={batmanReveal(value)}
      onChange={e => onChange(batmanReveal(e.target.value))}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default BatmanTextInput;
