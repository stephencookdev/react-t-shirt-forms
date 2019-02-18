/**
 * This JS file used for demoing the TShirt Forms example in JSFiddle.
 * Check out all of the examples on GitHub.
 *
 * https://github.com/stephencookdev/react-t-shirt-forms/tree/master/examples
 */

/**
 *
 * BatmanTextInput.js
 *
 */
const revealStringBatman =
  "Ah you think darkness is your ally... But you merely adopted the dark. I was born in it, molded by it. I didn't see the light until I was already a man, by then it was nothing to me but blinding! 🦇";

const batmanReveal = str => revealStringBatman.substring(0, str.length);

const BatmanTextInput = ({ onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-text-input__label">
    <span>
      {"Batman: "}
      {label}
    </span>
    <input
      type="text"
      value={batmanReveal(value)}
      onChange={e => onChange(batmanReveal(e.target.value))}
      onBlur={e => onBlur(e)}
    />
  </label>
);

/**
 *
 * WonderWomanTextInput.js
 *
 */
const revealStringWonderWoman =
  "We have a saying, my people. Don’t kill if you can wound, don’t wound if you can subdue, don’t subdue if you can pacify, and don’t raise your hand at all until you’ve first extended it. 🦸";

const wonderWomanReveal = str =>
  revealStringWonderWoman.substring(0, str.length);

const WonderWomanTextInput = ({ onChange, onBlur, value, label }) => (
  <label className="TShirtForm-component__label TShirtForm-text-input__label">
    <span>
      {"Wonder Woman: "}
      {label}
    </span>
    <input
      type="text"
      value={wonderWomanReveal(value)}
      onChange={e => onChange(wonderWomanReveal(e.target.value))}
      onBlur={e => onBlur(e)}
    />
  </label>
);

/**
 *
 * index.js
 *
 */
const { setSchemaDefaults } = TShirtForm; // import { setSchemaDefaults } from "react-t-shirt-forms";
TShirtForm = TShirtForm.default; // import TShirtForm from "react-t-shirt-forms";

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
