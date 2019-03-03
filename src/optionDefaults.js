import React from "react";
import { mergeDeep } from "./utils";
import i18n from "./i18n";

const optionDefaults = {
  schema: {},

  renderButtons: ({ formArgs: { submitting } }) => (
    <div className="TShirtForm-button-list">
      <button disabled={submitting}>{i18n.submit}</button>
    </div>
  ),

  renderGenericError: ({ formArgs: { formErrors } }) => (
    <div className="TShirtForm-form-error">
      {formErrors.__generic ? (
        <span className="TShirtForm-form-error__error-text">
          {formErrors.__generic}
        </span>
      ) : null}
    </div>
  ),

  renderFormItem: ({ item, error }) => (
    <div
      className={
        "TShirtForm-form-item" + (error ? " TShirtForm-form-item--error" : "")
      }
    >
      {item}
      <span className="TShirtForm-form-item__error-text">{error || null}</span>
    </div>
  ),

  renderFormItemGroup: ({ items, label }) => (
    <div className="TShirtForm-form-item-group">
      <span className="TShirtForm-form-item-group__label">{label}</span>
      {Object.values(items)}
    </div>
  ),

  handleSubmit: () => console.error("`handleSubmit` not defined!"),

  formItemGroups: [],

  formItemExceptions: [],

  passThroughProps: {}
};

const userOptionDefaults = {};

export const setOptionDefaults = defaults =>
  mergeDeep(userOptionDefaults, defaults);

export const getOptionDefaults = () =>
  mergeDeep({}, optionDefaults, userOptionDefaults);
