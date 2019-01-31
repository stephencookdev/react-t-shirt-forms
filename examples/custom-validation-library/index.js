import React from "react";
import ReactDOM from "react-dom";
import ReFormJS, { addValidation } from "reformjs";
import * as customValidator from "./customValidator";
import { customValidatorSupport } from "./customValidatorSupport";
import "reformjs/stylesheets/basic.css";

// this tells ReFormJS to use `customValidator` for any validations
// it also adds default validations for common fields
addValidation(customValidator, customValidatorSupport);

const App = () => (
  <ReFormJS
    schema={{
      name: {
        type: "string",
        label: "Name",
        initialValue: "Cat Woman",
        validation: customValidator.oneOf(["Batman", "Bruce Wayne"])
      },
      email: {
        type: "email"
        // we don't specify a `validation` here, but `yupSupport` automatically
        // adds in basic email validation for any `type: "email"`
      },
      password: {
        type: "password",
        validation: customValidator.minLength(10)
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
