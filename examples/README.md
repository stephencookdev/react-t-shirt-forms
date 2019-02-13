# Examples

The easiest way to get a feel for how to use T-Shirt Forms is to take a look at some examples.

## Basic Form

[demo]() / [code](./basic)

## Form with Custom Styling

[demo]() / [code](./custom-styling)

T-Shirt Forms is modular. If you don't want the default stylings that come with the form, then you can not `import` them, and they won't end up in your bundle!

## Field Validations

[demo]() / [code](./validations)

Forms often have validation logic on the front-end, to show immediate feedback to the user about if what they're entering is valid or not.

T-Shirt Forms is modular, and by default comes without any validation code tied into it.

<!-- alex ignore retext-profanities -->

It also allows you to hook in any validation library you want! It also comes with out-of-the-box support for [yup](https://github.com/jquense/yup).

## Server Errors

[demo]() / [code](./sever-errors)

Sometimes front-end validations cannot catch all possible issues.

Sometimes the server returns errors that your form needs to convey to the user.

T-Shirt Forms lets you do this with `setFormErrors`.

## Custom Validation Library

[demo]() / [code](./custom-validation-library)

Forms often have validation logic on the front-end, to show immediate feedback to the user about if what they're entering is valid or not.

T-Shirt Forms is modular, and by default comes without any validation code tied into it.

<!-- alex ignore retext-profanities -->

It also has a simple API to let you hook in any custom validation library you want to T-Shirt Forms.

## Schema Options (e.g. Custom Components)

[demo]() / [code](./default-schema-options)

Often you don't want to use a plain text input, you want to use your own custom text input.

Or, you want some default values for particular inputs.

T-Shirt Forms lets you do this by specifying `component` or `defaultValue` in the form schema. It also allows calling `setSchemaDefaults`, a global call that will change how _any_ T-Shirt Forms form works.

## Form Options (e.g. `renderButtons` and `renderFormItem`)

[demo]() / [code](./form-options)

Some forms have specific needs, that are different to the "normal" form that you have

For this, T-Shirt Forms lets you override its rendering methods, such as `renderButtons`, for a particular form.

## Default Form Options

[demo]() / [code](./default-form-options)

T-Shirt Forms lets override its rendering methods, such as `renderButtons`, for a particular form.

But often, you might have a default way of rendering these items, that you want to be the default for all forms.

T-Shirt Forms lets you do this by calling `setOptionDefaults`, a global call that will change how _any_ T-Shirt Forms form works.

## Form Exceptions

[demo]() / [code](./form-exceptions)

Sometimes fields have specific rendering needs. A common example is "first name"/"last name", or "current password"/"new password" both being on the same line (rather than the default rendering method of 1 item per line)

For this, T-Shirt Forms provides a `formItemExceptions` form option.

## Omitting Fields Dynamically

[demo]() / [code](./show-when)

A common pattern is for certain form elements to be dynamic, and disappear in certain circumstances.

T-Shirt Forms gives you a `showOnlyWhen` property to describe this.

## Groups

[demo]() / [code](./groups)

A common pattern in building forms is to split the form itself into sections.

T-Shirt Forms provides a `group` syntax to help you describe these sections.
