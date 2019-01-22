import i18n from "./i18n";
import { mergeDeep } from "./utils";
import TextInputComponent from "./components/TextInputComponent";
import PasswordComponent from "./components/PasswordComponent";
import EmailInputComponent from "./components/EmailInputComponent";
import DateInputComponent from "./components/DateInputComponent";
import CheckboxComponent from "./components/CheckboxComponent";
import MultiChoiceComponent from "./components/MultiChoiceComponent";

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
    },
    email: {
      label: i18n.email.label,
      component: EmailInputComponent,
      initialValue: ""
    },
    url: {
      component: TextInputComponent,
      initialValue: ""
    },
    date: {
      component: DateInputComponent,
      initialValue: new Date()
    },
    checkbox: {
      component: CheckboxComponent,
      initialValue: false
    },
    multichoice: {
      component: MultiChoiceComponent,
      choices: {},
      initialValue: null
    }
  }
};

const userSchemaDefaults = {};

export const setSchemaDefaults = defaults => {
  mergeDeep(userSchemaDefaults, defaults);
};

export const getSchemaDefaults = () =>
  mergeDeep({}, schemaDefaults, userSchemaDefaults);
