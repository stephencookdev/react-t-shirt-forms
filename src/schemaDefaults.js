import i18n from "./i18n";
import { mergeDeep } from "./utils";
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
  }
};

const userSchemaDefaults = {};

export const setSchemaDefaults = defaults => {
  mergeDeep(userSchemaDefaults, defaults);
};

export const getSchemaDefaults = () =>
  mergeDeep({}, schemaDefaults, userSchemaDefaults);
