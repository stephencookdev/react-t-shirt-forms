export const email = () => ({
  validate: fieldValue => /.+@.+\..+/.test(fieldValue),
  errorMessage: fieldName => `${fieldName} must be a valid email`
});

export const oneOf = possibleVals => ({
  validate: fieldValue => possibleVals.includes(fieldValue),
  errorMessage: fieldName =>
    `${fieldName} must be one of these values: ${possibleVals.join(", ")}`
});

export const minLength = n => ({
  validate: fieldValue => fieldValue.toString().length >= n,
  errorMessage: fieldName =>
    `${fieldName} must be at least ${n} characters long`
});

export const matchOtherField = fieldToMatch => ({
  validate: (fieldValue, formValues) => formValues[fieldToMatch] === fieldValue,
  errorMessage: fieldName => `${fieldName} must match ${fieldToMatch}`
});

export const object = fieldNamesToValidations => ({
  getErrors: formValues => {
    const fieldsToValidate = Object.keys(fieldNamesToValidations);

    const errors = fieldsToValidate.reduce((acc, fieldName) => {
      const validationObj = fieldNamesToValidations[fieldName];
      if (validationObj.validate(formValues[fieldName], formValues)) return acc;

      return {
        ...acc,
        [fieldName]: validationObj.errorMessage(fieldName)
      };
    }, {});

    return errors;
  }
});
