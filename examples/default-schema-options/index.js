import React from "react";
import ReactDOM from "react-dom";
import TShirtForm, { setSchemaDefaults } from "react-t-shirt-forms";
import BatmanTextInput from "./BatmanTextInput";
import WonderWomanTextInput from "./WonderWomanTextInput";
import "react-t-shirt-forms/dist/stylesheets/basic.css";

// this function call is _global_, so _all_ T-Shirt Forms forms will inherit this
// default schema.
// it's recommended to call this function in your app root, before any components
// get mounted
// you can check out `schemaDefaults.js` to see what default schema values T-Shirt Forms
// uses under the hood, that you would be overriding
setSchemaDefaults({
  type: {
    string: {
      component: BatmanTextInput
    },
    date: {
      initialValue: new Date("Wed Jun 28 1939 13:47:00 GMT+0100")
    }
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
      otherNames: {
        type: "string",
        label: "Other names",
        initialValue: "Diana Prince",
        component: WonderWomanTextInput
      },
      email: {
        type: "email"
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
