import React from "react";
import ReactDOM from "react-dom";
import TShirtForm from "react-t-shirt-forms";
import "react-t-shirt-forms/stylesheets/basic.css";

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
    renderButtons={({ formArgs: { submitting } }) => (
      <div className="my-custom-button-list">
        <input type="button" value="I do nothing" />
        <input
          type="submit"
          disabled={submitting}
          value={submitting ? "(busy submitting)" : "I submit the form"}
        />
      </div>
    )}
    renderFormItem={({ item, error }) => (
      <div className="custom-item-container">
        <ul>
          <li>{item}</li>
        </ul>
        {error ? (
          <div>
            <span>{"Uh oh, an error!"}</span>
            {error}
          </div>
        ) : null}
      </div>
    )}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
