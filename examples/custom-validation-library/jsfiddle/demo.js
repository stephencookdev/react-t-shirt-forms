/**
 * This JS file used for demoing the TShirt Forms example in JSFiddle.
 * Check out all of the examples on GitHub.
 *
 * https://github.com/stephencookdev/react-t-shirt-forms/tree/master/examples
 */

/**
 *
 * customValidator.js
 *
 */
const customValidator = {};
customValidator.email = () => ({
  validate: fieldValue => /.+@.+\..+/.test(fieldValue),
  errorMessage: fieldName => `${fieldName} must be a valid email`,
  required: false
});

customValidator.oneOf = possibleVals => ({
  validate: fieldValue => possibleVals.includes(fieldValue),
  errorMessage: fieldName =>
    `${fieldName} must be one of these values: ${possibleVals.join(", ")}`,
  required: false
});

customValidator.minLength = n => ({
  validate: fieldValue => fieldValue.toString().length >= n,
  errorMessage: fieldName =>
    `${fieldName} must be at least ${n} characters long`,
  required: false
});

customValidator.matchOtherField = fieldToMatch => ({
  validate: (fieldValue, formValues) => formValues[fieldToMatch] === fieldValue,
  errorMessage: fieldName => `${fieldName} must match ${fieldToMatch}`,
  required: false
});

customValidator.object = fieldNamesToValidations => ({
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

/**
 *
 * customValidatorSupport.js
 *
 */
const customValidatorSupport = customValidator => ({
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

/**
 *
 * index.js
 *
 */
const { addValidation } = TShirtForm; // import { addValidation } from "react-t-shirt-forms";
TShirtForm = TShirtForm.default; // import TShirtForm from "react-t-shirt-forms";

// this tells T-Shirt Forms to use `customValidator` for any validations
// it also adds default validations for common fields
addValidation(customValidator, customValidatorSupport);

const App = () => (
  <TShirtForm
    schema={{
      name: {
        type: "string",
        label: "Name",
        initialValue: "Cat Woman",
        validation: customValidator.oneOf(["Batman", "Bruce Wayne"])
      },
      description: {
        type: "string",
        label: "Description",
        initialValue: "Shadowy protector",
        // T-Shirt Forms provides yup transforms for `required`, so your validation
        // gets the information, and so does your component
        required: false
      },
      email: {
        // we don't specify a `validation` here, but `yupSupport` automatically
        // adds in basic email validation for any `type: "email"`
        type: "email",
        // here we indicate that we do want email to be a required field, but
        // that the "required" validation should only kick on when the form is
        // actually submitted.
        // this is nice when trying to reduce the noise on your form, such as for
        // a log-in form
        required: { onSubmit: true }
      },
      password: {
        type: "password",
        validation: customValidator.minLength(10),
        required: true
      },
      confirmPassword: {
        type: "password",
        label: "Confirm password",
        validation: customValidator.matchOtherField("password")
      }
    }}
    handleSubmit={async ({ formArgs }) => {
      console.log("If we get this far, then it means all validations passed!");
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
