import React from "react";
import ReactDOM from "react-dom";
import ReFormJS from "reformjs";
import "reformjs/stylesheets/basic.css";

const App = () => (
  <ReFormJS
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
    formItemGroups={[
      {
        keys: ["name", "email"],
        label: "Contact details"
      },
      {
        keys: ["dob"],
        label: "Personal details"
      }
    ]}
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
