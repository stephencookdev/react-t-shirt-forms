import React from "react";
import ReactDOM from "react-dom";
import TShirtForm, { setOptionDefaults } from "react-t-shirt-forms";
import "react-t-shirt-forms/dist/stylesheets/basic.min.css";
import "./styles.css";

setOptionDefaults({
  classTransform: (block, element, modifier) => {
    if (block === "form" && element === "container") return "myFormContainer";
    if (block === "component" && element === "input") return "myInput";
  }
});

const App = () => (
  <TShirtForm
    schema={{
      name: {
        type: "string",
        label: "Name",
        initialValue: "Bruce Wayne"
      },
      email: {
        type: "email",
        className: "myCustomEmail"
      },
      dob: {
        type: "date",
        label: "Date of birth"
      }
    }}
    handleSubmit={async ({ formArgs }) => {
      // `formArgs.formState` contains the state of our form
      // we'll wait a bit, just to pretend we're sending it to a back-end
      await new Promise(resolve => setTimeout(resolve, 1000));

      // and then we'll just log out the form values to the console
      console.log(JSON.stringify(formArgs, null, 2));
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
