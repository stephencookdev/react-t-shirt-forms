import React, { Component } from "react";
import { getOptionDefaults, setOptionDefaults } from "./optionDefaults";
import { getSchemaDefaults, setSchemaDefaults } from "./schemaDefaults";
import { addValidation, validationFuncs } from "./validations";
import {
  pick,
  omit,
  findFirstOverlap,
  mergeDeep,
  renderFuncOrString
} from "./utils";

const getCookedSchema = schema => {
  const schemaDefaults = getSchemaDefaults();

  const cookedSchema = Object.keys(schema).reduce(
    (acc, name) => ({
      ...acc,
      [name]: mergeDeep(
        {},
        schemaDefaults.type[schema[name].type] || {},
        schema[name]
      )
    }),
    {}
  );

  return cookedSchema;
};

const withFormDataState = X =>
  class extends Component {
    constructor(props) {
      super(props);

      const cookedSchema = getCookedSchema(this.props.schema);

      const formState = Object.keys(cookedSchema).reduce(
        (acc, name) => ({
          ...acc,
          [name]: cookedSchema[name].initialValue
        }),
        {}
      );
      const errors = Object.keys(cookedSchema).reduce(
        (acc, name) => ({
          ...acc,
          [name]: {
            message: null,
            validateOnChange: false
          }
        }),
        {}
      );

      this.state = {
        formState,
        errors,
        submitting: false
      };
    }

    createValidationSchema = (cookedSchema, submitting) => {
      const { combineSchemaObject, requiredTransform } = validationFuncs;

      const validationsMap = Object.keys(cookedSchema).reduce((acc, name) => {
        const { validation, required } = cookedSchema[name];
        if (!validation) return acc;

        const isRequired =
          required && required.onSubmit ? submitting : required;

        return {
          ...acc,
          [name]: requiredTransform(validation, !!isRequired)
        };
      }, {});

      // it's fine for no validations to exist, and we don't need any
      // `validationFuncs` to exist in this case
      if (!Object.keys(validationsMap).length) return;
      return combineSchemaObject(validationsMap);
    };

    setFormState = formState => {
      // set the form state before the error state, in case the errors take
      // time to resolve
      this.setState(prevState => ({
        formState: {
          ...prevState.formState,
          ...formState
        }
      }));

      this.handleStateChange(formState);
    };

    handleStateChange = formState =>
      this.detectErrors(formState, {
        focusOnFields: true,
        addErrors: false,
        submitting: false
      });

    triggerBlur = name =>
      this.detectErrors(
        { [name]: this.state.formState[name] },
        { focusOnFields: true, addErrors: true, submitting: false }
      );

    detectErrors = async (
      formState,
      { focusOnFields, addErrors, submitting }
    ) => {
      const cookedSchema = getCookedSchema(this.props.schema);
      const validationSchema = this.createValidationSchema(
        cookedSchema,
        submitting
      );
      // if no validations have been added, then don't bother trying to detect
      // any errors (and indeed, don't require `validationFuncs` to exist)
      if (!validationSchema) return;

      const { getValidationError } = validationFuncs;

      const newErrors = await getValidationError(validationSchema, {
        ...this.state.formState,
        ...formState
      });
      const newErrorNames = Object.keys(newErrors || {});
      const currentErrorNames = Object.keys(this.state.errors).filter(
        name => this.state.errors[name].message
      );

      const fixedErrorNames = currentErrorNames.filter(
        name => !newErrorNames.includes(name)
      );
      const toAddErrorNames =
        addErrors && !focusOnFields
          ? newErrorNames
          : newErrorNames.filter(
              name =>
                this.state.errors[name].validateOnChange ||
                (addErrors && focusOnFields && formState.hasOwnProperty(name))
            );

      const errors = Object.keys(this.state.errors).reduce((acc, name) => {
        const message = toAddErrorNames.includes(name) ? newErrors[name] : null;
        const validateOnChange =
          !!message ||
          (this.state.errors[name].validateOnChange &&
            formState.hasOwnProperty(name) &&
            !addErrors);

        return {
          ...acc,
          [name]: { message, validateOnChange }
        };
      }, {});

      this.setState({ errors });

      return !!newErrors;
    };

    getFormErrors = () =>
      Object.keys(this.state.errors).reduce(
        (acc, name) => ({
          ...acc,
          [name]: this.state.errors[name].message
        }),
        {}
      );

    setFormErrors = errors =>
      this.setState({
        errors: Object.keys(errors).reduce(
          (acc, name) => ({
            ...acc,
            [name]: {
              message: errors[name],
              validateOnChange: !!errors[name]
            }
          }),
          {}
        )
      });

    setSubmittingState = async submitting => {
      if (!submitting) return this.setState({ submitting });

      const errorsExist = await this.detectErrors(this.state.formState, {
        focusOnFields: false,
        addErrors: true,
        submitting: true
      });
      if (!errorsExist) this.setState({ submitting: true });

      return !errorsExist;
    };

    render() {
      return (
        <X
          {...this.props}
          formState={this.state.formState}
          setFormState={this.setFormState}
          triggerBlur={this.triggerBlur}
          submitting={this.state.submitting}
          formErrors={this.getFormErrors()}
          setFormErrors={this.setFormErrors}
          setSubmittingState={this.setSubmittingState}
        />
      );
    }
  };

const Form = ({
  formState,
  setFormState,
  triggerBlur,
  formErrors,
  setFormErrors,
  submitting,
  setSubmittingState,
  ...props
}) => {
  const {
    schema,
    renderButtons,
    renderGenericError,
    renderFormItem,
    renderFormItemGroup,
    formItemExceptions,
    formItemGroups,
    handleSubmit,
    passThroughProps
  } = {
    ...getOptionDefaults(),
    ...props
  };

  const cookedSchema = getCookedSchema(schema);

  // these are the args that are passed through to all user-facing methods
  const formArgs = {
    passThroughProps,
    formState,
    setFormState,
    formErrors,
    setFormErrors,
    submitting
  };

  const items = Object.keys(cookedSchema).reduce((acc, name) => {
    const showOnlyWhen = cookedSchema[name].showOnlyWhen || (() => true);
    const shouldShow = showOnlyWhen({ formArgs });
    if (!shouldShow) return acc;

    const Component = cookedSchema[name].component;
    const required = !!cookedSchema[name].required;
    const item = (
      <Component
        {...cookedSchema[name]}
        label={renderFuncOrString(cookedSchema[name].label)}
        value={formState[name]}
        required={required}
        onChange={value => setFormState({ [name]: value })}
        onBlur={() => triggerBlur(name)}
        formArgs={formArgs}
      />
    );

    return {
      ...acc,
      [name]: React.cloneElement(
        renderFormItem({
          formArgs,
          item,
          error: formErrors[name] || null
        }),
        { key: name }
      )
    };
  }, {});

  const itemsWithExceptions = formItemExceptions.reduce(
    (acc, { keys, render }) => {
      const firstKey = findFirstOverlap(acc, keys);
      if (!firstKey) return acc;

      const keysButFirst = keys.filter(k => k !== firstKey);
      acc[firstKey] = React.cloneElement(
        render({ items: pick(items, keys), formArgs }),
        {
          key: firstKey
        }
      );

      return omit(acc, keysButFirst);
    },
    items
  );

  const itemsWithGroups = formItemGroups.reduce((acc, { keys, label }) => {
    const firstKey = findFirstOverlap(acc, keys);
    if (!firstKey) return acc;

    const keysButFirst = keys.filter(k => k !== firstKey);
    acc[firstKey] = React.cloneElement(
      renderFormItemGroup({
        items: pick(items, keys),
        label: renderFuncOrString(label),
        formArgs
      }),
      {
        key: firstKey
      }
    );

    return omit(acc, keysButFirst);
  }, itemsWithExceptions);

  const buttons = renderButtons({ formArgs });
  const genericError = renderGenericError({ formArgs });

  return (
    <form
      className="TShirtForm-form"
      onSubmit={async e => {
        e.preventDefault();
        const canSubmit = await setSubmittingState(true);
        if (canSubmit) {
          await handleSubmit({ formArgs });
          setSubmittingState(false);
        }
      }}
    >
      {Object.values(itemsWithGroups)}
      {genericError}
      {buttons}
    </form>
  );
};

export { addValidation, setOptionDefaults, setSchemaDefaults };
export default withFormDataState(Form);
