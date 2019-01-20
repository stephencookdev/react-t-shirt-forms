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

      this.state = {
        formState,
        errors: {},
        submitting: false
      };
    }

    setFormState = async formState => {
      // set the form state before the error state, in case the errors take
      // time to resolve
      this.setState(prevState => ({
        formState: {
          ...prevState.formState,
          ...formState
        }
      }));

      const { getValidationError } = validationFuncs;

      const cookedSchema = getCookedSchema(this.props.schema);
      const nameList = Object.keys(formState).filter(
        name => cookedSchema[name].validation
      );
      const validations = await Promise.all(
        nameList.map(name =>
          getValidationError(cookedSchema[name].validation, formState[name])
        )
      );
      const errors = {};
      for (let i = 0; i < nameList.length; i++) {
        errors[nameList[i]] = validations[i];
      }

      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    };

    render() {
      return (
        <X
          {...this.props}
          formState={this.state.formState}
          setFormState={this.setFormState}
          submitting={this.state.submitting}
          formErrors={this.state.errors}
          setSubmittingState={submitting => this.setState({ submitting })}
        />
      );
    }
  };

const Form = ({
  formState,
  setFormState,
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
      onSubmit={e => {
        e.preventDefault();
        setSubmittingState(true);
        Promise.resolve(handleSubmit({ formArgs })).then(() =>
          setSubmittingState(false)
        );
      }}
    >
      {Object.values(itemsWithExceptions)}
      {buttons}
    </form>
  );
};

export { addValidation, setOptionDefaults, setSchemaDefaults };
export default withFormDataState(Form);
