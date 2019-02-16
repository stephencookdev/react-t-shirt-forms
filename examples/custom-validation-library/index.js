import React from "react";
import ReactDOM from "react-dom";
import TShirtForm, { addValidation } from "react-t-shirt-forms";
import * as customValidator from "./customValidator";
import { customValidatorSupport } from "./customValidatorSupport";
import "react-t-shirt-forms/dist/stylesheets/basic.css";

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
