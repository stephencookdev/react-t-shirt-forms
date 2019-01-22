export const yupSupport = yup => ({
  schemaDefaults: {
    type: {}
  },

  combineSchemaObject: validations => yup.object(validations),

  getValidationError: (schema, formValues) => {
    return schema
      .validate(formValues, { strict: true, abortEarly: false })
      .then(_ => null)
      .catch(errors =>
        errors.inner.reduce(
          (acc, cur) => ({ ...acc, [cur.path]: cur.message }),
          {}
        )
      );
  }
});
