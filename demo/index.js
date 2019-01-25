import React from "react";
import ReactDOM from "react-dom";
import ReFormJS, { addValidation } from "../src";
import { yupSupport } from "../src/validations/yup";
import * as yup from "yup";
import "../src/stylesheets/basic.css";

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
        validation: yup.string().required()
      },
      oldPassword: {
        type: "password",
        label: "Old password",
        validation: yup.string().oneOf([yup.ref("password")])
      },
      email: {
        type: "email"
      },
      homepage: {
        type: "url",
        label: "Homepage"
      },
      dob: {
        type: "date",
        label: "Date of birth"
      },
      interested: {
        type: "checkbox",
        label: "Interested...?"
      },
      stillInterested: {
        type: "checkbox",
        label: () => (
          <span>
            But what about in signing up to this <u>special!</u> offer?? What if
            we made the text really long, to really make it sound interesting?
            What about then?
          </span>
        ),
        validation: yup.boolean().oneOf([true])
      },
      favouriteColour: {
        type: "multichoice",
        label: "Favourite colour",
        choices: {
          red: "Red",
          blue: "Blue"
        }
      }
    }}
    formItemExceptions={[
      {
        keys: ["password", "oldPassword"],
        render: ({ items: { password, oldPassword } }) => (
          <div style={{ display: "flex" }}>
            {password}
            {oldPassword}
          </div>
        )
      }
    ]}
    handleSubmit={async ({ formArgs }) => {
      console.log(JSON.stringify(formArgs, null, 2));
      await new Promise(resolve => setTimeout(resolve, 1000));
      formArgs.setFormErrors({
        firstName: "some error",
        __generic: "a real generic error"
      });
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
