# `TShirtForm`

```javascript
import TShirtFrom from "react-t-shirt-forms";
```

`TShirtForm` is a React component that you can use to create a form. It handles everything for you, creating the form and all of the form components.

## Options

These are options that can be passed as props to `TShirtForm`.

### `schema`

```jsx
<TShirtForm schema={mySchema} />
```

_Type: `object`_

The `schema` object describes the fields in your form. It creates them in the order that you specify them, and also handles the form state of those components for you.

E.g.

```jsx
<TShirtForm
  schema={{
    field1: {
      label: "Foo",
      type: "string"
    },
    field2: {
      label: "Bar"
      type: "string"
    }
  }}
/>
```

will create a form that shows "Foo" and then "Bar", and the initial form state will be `{ field1: "", field2: "" }`.

#### `type`

```jsx
<TShirtForm
  schema={{
    field: {
      type: myType
    }
  }}
/>
```

_Type: `string`_

The `type` of the field is just used in order to inherit some default schema options. For example, `{ type: "string" }` is effectively the same as saying `{ component: TextInputComponent, initialValue: "" }`.

You can override the default schema options by calling [`setSchemaDefaults`](#setschemadefaults).

You can also [view a list of the default `type`s](#default-types).

#### `label`

```jsx
<TShirtForm
  schema={{
    field: {
      label: myLabel
    }
  }}
/>
```

_Type: `string | () => string`_

The `label` gives the field a human-readable label, that is actually shown to the user (as compared to the field name, which is used to reference that field in the code).

#### `initialValue`

```jsx
<TShirtForm
  schema={{
    field: {
      initialValue: myInitialValue
    }
  }}
/>
```

_Type: `any`_

The `initialValue` sets the _initial_ value for a particular field, but this value can then be edited by the user. E.g. with `initialValue: "foo"` then your initial state would look like `{ field: "foo" }`.

#### `component`

```jsx
<TShirtForm
  schema={{
    field: {
      component: ({ value, onChange, onBlur, formArgs, ...schema }) => (
        <MyCustomComponentForField />
      )
    }
  }}
/>
```

_Type: `React.Node`_

The default field `type`s come with default components that they use automatically. However, if you want to use a custom component for a field, you can pass the component definition here.

The component will be passed the following props:

- `value` - whatever the current form state value for the field is
- `onChange` - a function, which takes the new value for this field, and returns nothing
- `onBlur` - a function, which should be called whenever the field's blur event fires (this is used to help trigger validation errors at the correct time)
- `formArgs` - the [standard `formArgs`](#formargs) object
- You also get passed all of the values of the schema for this particular field

#### `validation`

```jsx
<TShirtForm
  schema={{
    field: {
      validation: yup.string().oneOf(["Foo", "Bar"])
    }
  }}
/>
```

_Type: any_

If you've called [`addValidation`](#addvalidation) somewhere in the app, then you can specify a validation rule. T-Shirt Forms comes with [out of the box support for yup](#yupsupport), but you can also [add different validation libraries](#addvalidation).

The only difference to how you should write validations with T-Shirt Forms, as compared to how you normally write them in your validation library, is that T-Shirt Forms handles grouping the different validation rules into one schema, and also handles [setting any `required` rules](#required).

#### `required`

```jsx
<TShirtForm
  schema={{
    field: {
      required: { onSubmit: true }
    }
  }}
/>
```

_Type: `boolean | { onSubmit : boolean }`_

If you've called [`addValidation`](#addvalidation) somewhere in the app, then you can specify if a field is required or not. You can specify `true`/`false`, which if `true` will transform [the validation rule](#validation) for this field to make it required (e.g. `.required()` in yup).

You can also specify `{ onSubmit: true }` for this value. This will cause the field to be required, but only at the point of submitting the form (rather than as the user is filling out / editing the form).

### `renderButtons`

```jsx
<TShirtForm renderButtons={({ formArgs }) => <MyButtons />} />
```

_Type: `() => React.Node`_

The `renderButtons` method is called at the bottom of your form. This renders a submit button in a container, but you can override it to anything you want (e.g. perhaps adding in a "cancel" button).

The render method will be passed the following props:

- `formArgs` - the [standard `formArgs`](#formargs) object

### `renderGenericError`

```jsx
<TShirtForm renderGenericError={({ formArgs }) => <MyGenericError />} />
```

_Type: `() => React.Node`_

Any generic errors (errors that can't be associated to any one particular field, e.g. "The server is returning 500") get put in a `__generic` entry into the [`formErrors`](#formerrors) object.

The `renderGenericError` method should render this generic error.

The render method will be passed the following props:

- `formArgs` - the [standard `formArgs`](#formargs) object

### `renderFormItem`

```jsx
<TShirtForm renderFormItem={({ item, error, formArgs }) => <MyFormItem />} />
```

_Type: `() => React.Node`_

Each field component is wrapped in this `renderFormItem` call. This should generally just wrap the form item with an error (if present).

The render method will be passed the following props:

- `item` - the React element for this particular field
- `error` - the error associated with this field (or `null` if there are none)
- `formArgs` - the [standard `formArgs`](#formargs) object

### `renderFormItemGroup`

```jsx
<TShirtForm renderFormItemGroup={{ items, label, formArgs }} />
```

_Type: `() => React.Node`_

Form items can also optionally be grouped. In this case, the group of items is wrapped in this `renderFormItemGroup` call, with the group label.

The render method will be passed the following props:

- `items` - the React element for this group of fields
- `label` - the label for this group
- `formArgs` - the [standard `formArgs`](#formargs) object

### `handleSubmit`

```jsx
<TShirtForm
  handleSubmit={({ formArgs }) => console.log("The form was submitted")}
/>
```

_Type: `() => Promise`_

This is the method that gets called when the user submits your form.

This method should be an `async` method (or return a `Promise`), and the form will be in [`submitting`](#submitting) state until the method resolves.

It should send your form values to wherever their final destination is (e.g. to a backend API) here.

Any API errors should be mapped to front-end errors by calling [`setFormErrors`](#setformerrors).

The method will be passed the following props:

- `formArgs` - the [standard `formArgs`](#formargs) object

### `formItemGroups`

```jsx
<TShirtForm
  formItemGroups={[
    {
      keys: ["fieldToBeInGroup1", "fieldToBeInGroup2"],
      label: "Name of my group"
    }
  ]}
/>
```

_Type: `{ keys: string[], label: string | () => React.Node }[]`_

Fields can optionally be grouped together. To group some field items, specify the keys of each field, and label each group.

Fields cannot be in more than one group.

You can check out [the example](../examples/groups) to see this more clearly.

### `formItemExceptions`

```jsx
<TShirtForm
  formItemExceptions={[
    {
      keys: ["fieldToExcept1", "fieldToExcept2"],
      render: ({ items: { fieldToExcept1, fieldToExcept2 }, formArgs }) => (
        <MyFormItemException />
      )
    }
  ]}
/>
```

_Type: `{ keys: string[], render: () => React.Node }[]`_

Sometimes you want certain fields to be rendered differently. E.g. you might want your "first name" and "last name" fields to be grouped together visually.

You can check out [the example](../examples/form-exceptions) to see this more clearly.

The `render` method is passed the following args:

- `items` - a map of the React elements in the form
- `formArgs` - the [standard `formArgs`](#formargs) object

### `passThroughProps`

```jsx
<TShirtForm passThroughProps={{ myProp: "foo" }} />
```

_Type: `{}`_

The `passThroughProps` is an entry in the [formArgs](#formargs), so it's an easy way to pass props through to components, and custom render methods.

## Globals

These are functions that can be called, and will affect all `TShirtForm` globally.

### `setSchemaDefaults`

```javascript
import { setSchemaDefaults } from "react-t-shirt-forms";

setSchemaDefaults({
  type: {
    string: {
      component: MyCustomStringComponent
    }
  }
});
```

`setSchemaDefaults` overrides the default schema _globally_. It is most commonly used to specify the default components that should be used for each `type`.

### `setOptionDefaults`

```javascript
import { setOptionDefaults } from "react-t-shirt-forms";

setOptionDefaults({
  renderButtons: () => <input type="submit" value="My custom buttons" />
});
```

`setOptionDefaults` overrides the default value for any [options](#options).

### `addValidation`

```javascript
import { addValidation, yupSupport } from "react-t-shirt-forms";
import * as yup from "yup";

addValidation(yup, yupSupport);
```

By default, T-Shirt Forms comes with no validation at all. By calling `addValidation`, you add support for validations to be added to each field, as well as adding some default validations (such as valid emails, for `type: email` fields).

The first argument passed is the validation library you're trying to use (such as [yup](https://github.com/jquense/yup)). The second argument is the support map.

T-Shirt Forms provides a support map `yupSupport` for yup out of the box, but you [can use its structure](https://github.com/stephencookdev/react-t-shirt-forms/blob/master/src/validations/yup.js) as an example, if you want create your own support map, for another validation library.

### `yupSupport`

T-Shirt Forms provides an out of the box support map for the [yup](https://github.com/jquense/yup) validation library, as mentioned [in `addValidation`](#addvalidation).

## Default Types

These are the types that can be used by default when specifying `type: myType`, for a particular field's [schema](#schema).

### `string`

i.e. a standard `input type="text"` field.

### `password`

i.e. a standard `input type="password"` field.

### `email`

i.e. a standard `input type="email"` field, with any default email validations.

### `url`

i.e. a standard `input type="text"` field, with any validations to make the value conform to a URL structure (e.g. `https://google.com` as valid, `http:/goog` as invalid).

### `date`

i.e. a standard `input type="date"` field, with any validations to make the value be a valid date.

### `checkbox`

i.e. a standard `input type="checkbox"` field.

### `multichoice`

i.e. a standard `select` field.

By default, this field also takes a `choices` object, mapping out the options of the field.

E.g.:

```javascript
const schema = {
  myMultichoice: {
    type: "multichoice",
    choices: {
      a: "It's A",
      b: "No, it's B",
      c: "Or was it C...?"
    }
  }
};
```

would result in

```html
<select>
  <option value="a">It's A</option>
  <option value="b">No, it's A</option>
  <option value="c">Or was it C...?</option>
</select>
```

## `formArgs`

To keep the API as simple as possible, T-Shirt Forms sends the same `formArgs` object around as much as possible, in its interface.

`formArgs` is an object with the following entries:

### passThroughProps

_Type: `{}`_

This object will contain any values that you set previously using the [`passThroughProps` option](#passthroughprops).

### formState

_Type: `{ fieldName: fieldValue }`_

This contains your entire form state, i.e. the current values of all of the fields in your form.

### setFormState

_Type: `({ fieldName: fieldValue }) => void`_

This function can trigger an update to the form state. It assigns shallowly into your current form state.

E.g.

```javascript
const { formState, setFormState } = formArgs;

console.log(formState);
// {
//   a: "foo",
//   b: "bar"
// }

setFormState({ b: "not bar" });

console.log(formState);
// {
//   a: "foo",
//   b: "not bar"
// }
```

### formErrors

_Type: `{ fieldName: string | null }`_

This object contains a map from each field, to any error associated with that field.

E.g. if you had a field `myEmail`, with a [`validation`](#validation) applied to say `"enter a valid email"` when a non-email was entered, then:

```javascript
const { formErrors } = formArgs;

console.log(formErrors);
// {
//   myEmail: "enter a valid email",
//   myUnrelatedField: null
// }
```

### setFormErrors

_Type: `({ fieldName: fieldValue }) => void`_

This function can manually cause an error to be associated with a form field. It assigns shallowly into your current form state.

E.g.

```javascript
const { formErrors, setFormErrors } = formArgs;

console.log(formErrors);
// {
//   a: "please enter a valid email",
//   b: null
// }

setFormErrors({ b: "please enter a valid foo" });

console.log(formState);
// {
//   a: "please enter a valid email",
//   b: "please enter a valid foo"
// }
```

These manually set form errors will be cleared when the user interacts with the form (causing the automatic validations to trigger again), unless you call `setFormErrors` again.

### submitting

_Type: `boolean`_

The [`handleSubmit` flow of the form should return a promise](#handlesubmit).

While this `handleSubmit` promise is unresolved, then `submitting: true`. Once the promise resolves, then `submitting: false`.
