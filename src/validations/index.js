import { setSchemaDefaults } from "../schemaDefaults";
import { deepMerge } from "../utils";

export const validationFuncs = {
  combineSchemaObject: validations =>
    console.error(
      `\`addValidation\` has not been called, but validations have been specified for ${Object.keys(
        validations
      )
        .map(x => `"${x}"`)
        .join(", ")}! All validations are being ignored`
    ),

  getValidationError: () =>
    Promise.resolve(() =>
      console.error(
        "`addValidation` has not been called! All validations are being ignored"
      )
    )
};

export const addValidation = (validationObject, validationSupport) => {
  const support = validationSupport(validationObject);
  setSchemaDefaults(support.schemaDefaults);
  validationFuncs.combineSchemaObject = support.combineSchemaObject;
  validationFuncs.getValidationError = support.getValidationError;
};
