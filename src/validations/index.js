import { setSchemaDefaults } from "../schemaDefaults";
import { deepMerge } from "../utils";

export const validationFuncs = {
  combineSchemaObject: () =>
    console.error("`addValidation` has not been called!"),

  getValidationError: () =>
    Promise.resolve(() => console.error("`addValidation` has not been called!"))
};

export const addValidation = (validationObject, validationSupport) => {
  const support = validationSupport(validationObject);
  setSchemaDefaults(support.schemaDefaults);
  validationFuncs.combineSchemaObject = support.combineSchemaObject;
  validationFuncs.getValidationError = support.getValidationError;
};
