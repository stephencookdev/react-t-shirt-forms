# Examples

The easiest way to get a feel for how to use T-Shirt Forms is to take a look at some examples.

## Basic Form

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/basic/jsfiddle) / [code](./basic)

## Form with Custom Styling

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/custom-styling/jsfiddle) / [code](./custom-styling)

T-Shirt Forms allows you to specify custom class names, so you can hook your project's styling in correctly.

T-Shirt Forms is also modular. If you don't want the default stylings that come with the form, then don't `import` the CSS file, and no unwanted CSS will appear in your bundle!

## Field Validations

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/validations/jsfiddle) / [code](./validations)

Forms often have validation logic on the front-end, to show immediate feedback to the user about if what they're entering is valid or not.

T-Shirt Forms is modular, and by default comes without any validation code tied into it.

<!-- alex ignore retext-profanities -->

It also allows you to hook in any validation library you want! It also comes with out-of-the-box support for [yup](https://github.com/jquense/yup).

## Server Errors

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/server-errors/jsfiddle) / [code](./server-errors)

Sometimes front-end validations cannot catch all possible issues.

Sometimes the server returns errors that your form needs to convey to the user.

T-Shirt Forms lets you do this with `setFormErrors`.

## Custom Validation Library

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/custom-validation-library/jsfiddle) / [code](./custom-validation-library)

Forms often have validation logic on the front-end, to show immediate feedback to the user about if what they're entering is valid or not.

T-Shirt Forms is modular, and by default comes without any validation code tied into it.

<!-- alex ignore retext-profanities -->

It also has a simple API to let you hook in any custom validation library you want to T-Shirt Forms.

## Schema Options (e.g. Custom Components)

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/default-schema-options/jsfiddle) / [code](./default-schema-options)

Often you don't want to use a plain text input, you want to use your own custom text input.

Or, you want some default values for particular inputs.

T-Shirt Forms lets you do this by specifying `component` or `defaultValue` in the form schema. It also allows calling `setSchemaDefaults`, a global call that will change how _any_ T-Shirt Forms form works.

## Form Options (e.g. `renderButtons` and `renderFormItem`)

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/form-options/jsfiddle) / [code](./form-options)

Some forms have specific needs, that are different to the "normal" form that you have

For this, T-Shirt Forms lets you override its rendering methods, such as `renderButtons`, for a particular form.

## Default Form Options

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/default-form-options/jsfiddle) / [code](./default-form-options)

T-Shirt Forms lets override its rendering methods, such as `renderButtons`, for a particular form.

But often, you might have a default way of rendering these items, that you want to be the default for all forms.

T-Shirt Forms lets you do this by calling `setOptionDefaults`, a global call that will change how _any_ T-Shirt Forms form works.

## Form Exceptions

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/form-exceptions/jsfiddle) / [code](./form-exceptions)

Sometimes fields have specific rendering needs. A common example is "first name"/"last name", or "current password"/"new password" both being on the same line (rather than the default rendering method of 1 item per line)

For this, T-Shirt Forms provides a `formItemExceptions` form option.

## Omitting Fields Dynamically

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/show-when/jsfiddle) / [code](./show-when)

A common pattern is for certain form elements to be dynamic, and disappear in certain circumstances.

T-Shirt Forms gives you a `showOnlyWhen` property to describe this.

## Groups

[demo](https://jsfiddle.net/gh/get/library/pure/stephencookdev/react-t-shirt-forms/tree/master/examples/groups/jsfiddle) / [code](./groups)

A common pattern in building forms is to split the form itself into sections.

T-Shirt Forms provides a `group` syntax to help you describe these sections.
