import { setSchemaDefaults } from "../schemaDefaults";

export { yupSupport } from "./yup";

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

const provideFuncs = (provider, support, funcNameList) =>
  funcNameList.forEach(funcName => {
    provider[funcName] = support[funcName];
  });

export const addValidation = (validationObject, validationSupport) => {
  const support = validationSupport(validationObject);
  setSchemaDefaults(support.schemaDefaults);
  provideFuncs(validationFuncs, support, [
    "combineSchemaObject",
    "getValidationError",
    "requiredTransform"
  ]);
};
