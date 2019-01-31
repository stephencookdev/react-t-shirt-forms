export const customValidatorSupport = customValidator => ({
  schemaDefaults: {
    type: {
      email: {
        // here we give any field of type `email` a custom `validation`
        validation: customValidator.email()
      }
    }
  },

  // this merges each individual field validation into *one schema*.
  // this allows field validations to reference one another
  // in the `yup` library for example, this is `yup.object`
  combineSchemaObject: validations => customValidator.object(validations),

  // this transforms a field's validation object to be either required, or not
  // required (`required` will be strictly `true`/`false`)
  requiredTransform: (validation, required) => ({
    ...validation,
    required
  }),

  getValidationError: async (schema, formValues) => {
    const errors = await schema.getErrors(formValues);

    // we want to return `null` when there are no errors
    if (Object.keys(errors).length === 0) return null;

    // or if there are errors, we want to return an object mapping the field
    // name to the error associated with that field
    // e.g. { name: "Name is wrong!" }
    return errors;
  }
});
