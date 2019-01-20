import React, { Component } from "react";
import { getOptionDefaults, setOptionDefaults } from "./optionDefaults";
import { getSchemaDefaults, setSchemaDefaults } from "./schemaDefaults";
import { addValidation, validationFuncs } from "./validations";
import { omit, findFirstOverlap, mergeDeep } from "./utils";

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
      this.detectErrors(formState, { stickyErrors: false });

    triggerBlur = name =>
      this.detectErrors(
        { [name]: this.state.formState[name] },
        { stickyErrors: true }
      );

    detectErrors = async (formState, { stickyErrors }) => {
      const { getValidationError } = validationFuncs;

      const cookedSchema = getCookedSchema(this.props.schema);
      const nameList = Object.keys(formState).filter(name => {
        const careAboutErrorsOnChange =
          this.state.errors[name].message ||
          this.state.errors[name].validateOnChange;

        return (
          cookedSchema[name].validation &&
          (careAboutErrorsOnChange || stickyErrors)
        );
      });
      const validations = await Promise.all(
        nameList.map(name =>
          getValidationError(cookedSchema[name].validation, formState[name])
        )
      );

      let errorsExist = false;
      const errors = {};
      for (let i = 0; i < nameList.length; i++) {
        const errorIExists = !!validations[i];
        errorsExist = errorsExist || errorIExists;
        errors[nameList[i]] = {
          message: validations[i] || null,
          validateOnChange: stickyErrors
            ? errorsExist
            : this.state.errors[nameList[i]].validateOnChange
        };
      }

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));

      return errorsExist;
    };

    getFormErrors = () =>
      Object.keys(this.state.errors).reduce(
        (acc, name) => ({
          ...acc,
          [name]: this.state.errors[name].message
        }),
        {}
      );

    setSubmittingState = async submitting => {
      if (!submitting) return this.setState({ submitting });

      const errorsExist = await this.detectErrors(this.state.formState, {
        stickyErrors: true
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
  submitting,
  setSubmittingState,
  ...props
}) => {
  const {
    schema,
    renderButtons,
    renderFormItem,
    formItemExceptions,
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
    submitting,
    setFormState
  };

  const items = Object.keys(cookedSchema).reduce((acc, name) => {
    const Component = cookedSchema[name].component;
    const item = (
      <Component
        {...cookedSchema[name]}
        value={formState[name]}
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
        {
          key: name
        }
      )
    };
  }, {});

  const itemsWithExceptions = formItemExceptions.reduce(
    (acc, { keys, render }) => {
      const firstKey = findFirstOverlap(acc, keys);
      if (!firstKey) return acc;

      const keysButFirst = keys.filter(k => k !== firstKey);
      acc[firstKey] = React.cloneElement(render({ items, formArgs }), {
        key: firstKey
      });

      return omit(acc, keysButFirst);
    },
    items
  );

  const buttons = renderButtons({ formArgs });

  return (
    <form
      className="ReFormJS-form"
      onSubmit={async e => {
        e.preventDefault();
        const canSubmit = await setSubmittingState(true);
        if (canSubmit) {
          await handleSubmit({ formArgs });
          setSubmittingState(false);
        }
      }}
    >
      {Object.values(itemsWithExceptions)}
      {buttons}
    </form>
  );
};

export { addValidation, setOptionDefaults, setSchemaDefaults };
export default withFormDataState(Form);
