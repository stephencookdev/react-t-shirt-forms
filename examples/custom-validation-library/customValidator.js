export const email = () => ({
  validate: fieldValue => /.+@.+\..+/.test(fieldValue),
  errorMessage: fieldName => `${fieldName} must be a valid email`,
  required: false
});

export const oneOf = possibleVals => ({
  validate: fieldValue => possibleVals.includes(fieldValue),
  errorMessage: fieldName =>
    `${fieldName} must be one of these values: ${possibleVals.join(", ")}`,
  required: false
});

export const minLength = n => ({
  validate: fieldValue => fieldValue.toString().length >= n,
  errorMessage: fieldName =>
    `${fieldName} must be at least ${n} characters long`,
  required: false
});

export const matchOtherField = fieldToMatch => ({
  validate: (fieldValue, formValues) => formValues[fieldToMatch] === fieldValue,
  errorMessage: fieldName => `${fieldName} must match ${fieldToMatch}`,
  required: false
});

export const object = fieldNamesToValidations => ({
  getErrors: formValues => {
    const fieldsToValidate = Object.keys(fieldNamesToValidations);

    const errors = fieldsToValidate.reduce((acc, fieldName) => {
      const validationObj = fieldNamesToValidations[fieldName];
      if (!validationObj) return acc;

      const isValid = validationObj.validate(formValues[fieldName], formValues);
      const passesRequired = !validationObj.required || !!formValues[fieldName];
      const passesNotRequired =
        !validationObj.required && !formValues[fieldName];
      if (passesNotRequired || (isValid && passesRequired)) return acc;

      return {
        ...acc,
        [fieldName]: isValid
          ? `${fieldName} is a required field`
          : validationObj.errorMessage(fieldName)
      };
    }, {});

    return errors;
  }
});
