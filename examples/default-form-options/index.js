import React from "react";
import ReactDOM from "react-dom";
import TShirtForm, { setOptionDefaults } from "react-t-shirt-forms";
import "react-t-shirt-forms/dist/stylesheets/basic.min.css";

// this function call is _global_, so _all_ T-Shirt Forms forms will inherit this
// default schema.
// it's recommended to call this function in your app root, before any components
// get mounted
// you can check out `optionDefaults.js` to see what form options T-Shirt Forms
// uses under the hood, that you would be overriding
setOptionDefaults({
  renderButtons: ({ formArgs: { submitting } }) => (
    <div className="my-custom-button-list">
      <input type="button" value="I do nothing" />
      <input
        type="submit"
        disabled={submitting}
        value={submitting ? "(busy submitting)" : "I submit the form"}
      />
    </div>
  )
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
