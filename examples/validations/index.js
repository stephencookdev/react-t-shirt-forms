import React from "react";
import ReactDOM from "react-dom";
import * as yup from "yup";
import ReFormJS, { addValidation } from "reformjs";
import { yupSupport } from "reformjs/validations/yup";
import "reformjs/stylesheets/basic.css";

// this tells ReFormJS to use `yup` for any validations
// it also adds default validations for common fields
addValidation(yup, yupSupport);

const App = () => (
  <ReFormJS
    schema={{
      name: {
        type: "string",
        label: "Name",
        initialValue: "Cat Woman",
        validation: yup.string().oneOf(["Batman", "Bruce Wayne"])
      },
      email: {
        type: "email"
        // we don't specify a `validation` here, but `yupSupport` automatically
        // adds in basic email validation for any `type: "email"`
      },
      password: {
        type: "password",
        validation: yup.string().min(10)
      },
      confirmPassword: {
        type: "password",
        label: "Confirm password",
        validation: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match!")
      }
    }}
    handleSubmit={async ({ formArgs }) => {
      console.log("If we get this far, then it means all validations passed!");
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
