export const yupSupport = yup => ({
  schemaDefaults: {
    type: {}
  },

  getValidationError: (validation, value) =>
    validation
      .validate(value)
      .then(_ => null)
      .catch(err => err.message)
});
