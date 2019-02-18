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

      // and now we'll pretend we received some server errors!
      // one specifically about he "name" field, and another error that doesn't
      // tie to any one field directly
      formArgs.setFormErrors({
        name: "You cannot be Batman",
        __generic:
          "You think the darkness is your ally... But you merely adopted the darkness"
      });
    }}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
