import React from "react";
import { mergeDeep } from "./utils";
import i18n from "./i18n";

const optionDefaults = {
  schema: {},

  renderButtons: ({ formArgs: { submitting } }) => (
    <div className="ReFormJS-button-list">
      <button disabled={submitting}>{i18n.submit}</button>
    </div>
  ),

  renderGenericError: ({ formArgs: { formErrors } }) => (
    <div className="ReFormJS-form-error">
      {formErrors.__generic ? (
        <span className="ReFormJS-form-error__error-text">
          {formErrors.__generic}
        </span>
      ) : null}
    </div>
  ),

  renderFormItem: ({ item, error }) => (
    <div
      className={
        "ReFormJS-form-item" + (error ? " ReFormJS-form-item--error" : "")
      }
    >
      {item}
      <span className="ReFormJS-form-item__error-text">{error || null}</span>
    </div>
  ),

  renderFormItemGroup: ({ items, label }) => (
    <div className="ReFormJS-form-item-group">
      <span className="ReFormJS-form-item-group__label">{label}</span>
      {Object.values(items)}
    </div>
  ),

  formItemGroups: [],

  formItemExceptions: [],

  handleSubmit: () => console.error("`handleSubmit` not defined!"),

  passThroughProps: {}
};

const userOptionDefaults = {};

export const setOptionDefaults = defaults =>
  mergeDeep(userOptionDefaults, defaults);

export const getOptionDefaults = () =>
  mergeDeep({}, optionDefaults, userOptionDefaults);
