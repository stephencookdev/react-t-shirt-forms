import React from "react";
import ReactDOM from "react-dom";
import ReFormJS from "..";

const App = () => (
  <ReFormJS
    schema={{
      firstName: {
        type: "string",
        label: "First name",
        initialValue: "Stephen"
      },
      lastName: {
        type: "string",
        label: "Last name",
        initialValue: "Cook"
      },
      password: {
        type: "password",
        label: "Password"
      },
      oldPassword: {
        type: "password",
        label: "Old password"
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

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
