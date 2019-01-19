import i18n from "./i18n";
import TextInputComponent from "./components/TextInputComponent";
import PasswordComponent from "./components/PasswordComponent";

const schemaDefaults = {
  type: {
    string: {
      component: TextInputComponent,
      initialValue: ""
    },
    password: {
      label: i18n.password.label,
      component: PasswordComponent,
      initialValue: ""
    }
  },
  name: {}
};

const userSchemaDefaults = {};

export const setSchemaDefaults = defaults =>
  Object.merge(userSchemaDefaults, defaults);

export const getSchemaDefaults = () => ({
  ...schemaDefaults,
  ...userSchemaDefaults
});
