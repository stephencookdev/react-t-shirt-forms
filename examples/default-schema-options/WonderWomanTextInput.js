import React from "react";

const revealString =
  "We have a saying, my people. Don’t kill if you can wound, don’t wound if you can subdue, don’t subdue if you can pacify, and don’t raise your hand at all until you’ve first extended it. 🦸";

const wonderWomanReveal = str => revealString.substring(0, str.length);

const WonderWomanTextInput = ({ onChange, onBlur, value, label }) => (
  <label className="ReFormJS-component__label ReFormJS-text-input__label">
    <span>
      {"Wonder Woman: "}
      {label}
    </span>
    <input
      type="text"
      value={wonderWomanReveal(value)}
      onChange={e => onChange(wonderWomanReveal(e.target.value))}
      onBlur={e => onBlur(e)}
    />
  </label>
);

export default WonderWomanTextInput;
