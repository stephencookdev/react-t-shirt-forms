export const yupSupport = yup => ({
  schemaDefaults: {
    type: {
      string: {
        validation: yup.string()
      },
      password: {
        validation: yup.string()
      },
      email: {
        validation: yup.string().email()
      },
      url: {
        validation: yup.string().url()
      },
      date: {
        validation: yup.date()
      },
      checkbox: {
        validation: yup.boolean()
      }
    }
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
