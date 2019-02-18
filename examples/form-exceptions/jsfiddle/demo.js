/**
 * This JS file used for demoing the TShirt Forms example in JSFiddle.
 * Check out all of the examples on GitHub.
 *
 * https://github.com/stephencookdev/react-t-shirt-forms/tree/master/examples
 */

TShirtForm = TShirtForm.default; // import TShirtForm from "react-t-shirt-forms";

const App = () => (
  <TShirtForm
    schema={{
      firstName: {
        type: "string",
        label: "First name",
        initialValue: "Bruce"
      },
      lastName: {
        type: "string",
        label: "Last name",
        initialValue: "Wayne"
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
    formItemExceptions={[
      {
        keys: ["firstName", "lastName"],
        render: ({ items: { firstName, lastName } }) => (
          <div style={{ display: "flex" }}>
            {firstName}
            {lastName}
          </div>
        )
      }
    ]}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
