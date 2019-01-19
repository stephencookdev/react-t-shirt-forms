import React from "react";
import i18n from "./i18n";

const optionDefaults = {
  schema: {},

  renderButtons: ({ formArgs: { submitting } }) => (
    <div className="ReFormJS-button-list">
      <button disabled={submitting}>{i18n.submit}</button>
    </div>
  ),

  renderFormItem: ({ item, error }) => (
    <div
      className={
        "ReFormJS-form-item" + (error ? " ReFormJS-form-item--error" : "")
      }
    >
      {item}
      {error && <span className="ReFormJS-form-item__error-text">{error}</span>}
    </div>
  ),

  formItemExceptions: [],

  handleSubmit: () => console.error("`handleSubmit` not defined!"),

  passThroughProps: {}
};

const userOptionDefaults = {};

export const setOptionDefaults = defaults =>
  Object.merge(userOptionDefaults, defaults);

export const getOptionDefaults = () => ({
  ...optionDefaults,
  ...userOptionDefaults
});
