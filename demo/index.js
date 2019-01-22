import React from "react";
import ReactDOM from "react-dom";
import ReFormJS, { addValidation } from "../src";
import { yupSupport } from "../src/validations/yup";
import * as yup from "yup";

addValidation(yup, yupSupport);

const App = () => (
  <ReFormJS
    schema={{
      firstName: {
        type: "string",
        label: "First name",
        initialValue: "Stephen",
        validation: yup.string().lowercase()
      },
      lastName: {
        type: "string",
        label: "Last name",
        initialValue: "Cook"
      },
      password: {
        type: "password",
        label: "Password",
        validation: yup.string().required()
      },
      oldPassword: {
        type: "password",
        label: "Old password",
        validation: yup.string().oneOf([yup.ref("password")])
      },
      address: {
        type: "string",
        label: "Address"
      }
    }}
    formItemExceptions={[
      {
        keys: ["password", "oldPassword"],
        render: ({ items: { password, oldPassword } }) => (
          <div>
            <hr />
            {password}
            {oldPassword}
            <hr />
          </div>
        )
      }
    ]}
    handleSubmit={({ formArgs }) => {
      console.log(JSON.stringify(formArgs, null, 2));
      return new Promise(resolve => setTimeout(resolve, 1000));
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
