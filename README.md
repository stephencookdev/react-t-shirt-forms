# 👕 React T-Shirt Forms

Sometimes life calls for more than a t-shirt. But t-shirts are easy, and comfortable - a good default until you need more.

## Another Form Library?

Making a form in React is hard. Needlessly hard, with a _lot_ of boilerplate - even when using any of the popular React form libraries.

T-Shirt Forms is intended to make creating simple forms simple.

It is powerful enough to handle complex and irregular cases, but it is more heavily geared towards reducing the boilerplate around _regular_ forms.

If your app has lots of complex and irregular forms, then this library is probably not going to be the best solution. I would recommend looking at [Formik](https://github.com/jaredpalmer/formik) instead.

## Installing

```
npm install --save-dev react-t-shirt-forms
```

or

```
yarn add -D react-t-shirt-forms
```

## Usage

### Bare Bones Form

```javascript
import TShirtForm from "react-t-shirt-forms";

// by default no styling is included in your bundle
// but you can pull in a basic CSS file if you like
import "react-t-shirt-forms/dist/stylesheets/basic.min.css";

const formSchema = {
  name: {
    type: "string",
    label: "Name",
    initialValue: "Bruce Wayne"
  },
  email: {
    type: "email",
    label: "Email"
  }
};

const onFormSubmit = async ({ formArgs }) => {
  console.log(JSON.stringify(formArgs, null, 2));
};

const App = () => (
  <TShirtForm schema={formSchema} handleSubmit={onFormSubmit} />
);
```

### Validation

T-Shirt Forms allows integration with any validation library, but comes with out of the box hooks for [yup](https://github.com/jquense/yup).

```javascript
import * as yup from "yup";
import { addValidation, yupSupport } from "react-t-shirt-forms";

// this tells T-Shirt Forms to use `yup` for any validations
// it also adds default validations for common fields
addValidation(yup, yupSupport);
```

Now you can use `yup` validations in your form schema:

```javascript
const formSchema = {
  name: {
    type: "string",
    label: "Name",
    validation: yup()
      .string()
      .min(10)
  }
};
```

### Custom Fields

If you have a custom React component that you need to use for all password inputs, you can specify a global rule for this.

```javascript
import { setSchemaDefaults } from "react-t-shirt-forms";

const MyCustomPasswordInput = ({ onChange, onBlur, value, label }) => (
  <label>
    {label}
    <input
      type="password"
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onBlur(e)}
    />
  </label>
);

setSchemaDefaults({
  type: {
    password: {
      component: MyCustomPasswordInput
    }
  }
});
```

and now whenever you use a password input field

```javascript
const formSchema = {
  myPasswordField: {
    type: "password",
    label: "My custom password field"
  }
};
```

you'll see that it's using your `MyCustomPasswordInput` component.

### More

T-Shirt Forms handles other common flows too, check out [more examples](./examples).

## API

See the [API docs](./api).

## Bundle Size

T-Shirt Forms makes an effort to be minimal and modular.

Here's a look at its size, after tree-shaking, in different contexts:

- bare bones (14.05 KB / **3.52 KB gzipped**)
- with CSS stylings (22.27 KB / **6.30 KB gzipped**)
- with yup validation (22.31 KB / **6.31 KB gzipped**)

## Contributing

Contributors are welcome! 😊

Check out the [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
