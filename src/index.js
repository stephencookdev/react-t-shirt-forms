import React, { Component } from "react";
import { getOptionDefaults, setOptionDefaults } from "./optionDefaults";
import { getSchemaDefaults, setSchemaDefaults } from "./schemaDefaults";
import { omit, findFirstOverlap } from "./utils";

const getCookedSchema = schema => {
  const schemaDefaults = getSchemaDefaults();

  const cookedSchema = Object.keys(schema).reduce(
    (acc, name) => ({
      ...acc,
      [name]: {
        ...(schemaDefaults.type[schema[name].type] || {}),
        ...(schemaDefaults.name[name] || {}),
        ...schema[name]
      }
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
        submitting: false
      };
    }

    render() {
      return (
        <X
          {...this.props}
          formState={this.state.formState}
          setFormState={formState => this.setState({ formState })}
          submitting={this.state.submitting}
          setSubmittingState={submitting => this.setState({ submitting })}
        />
      );
    }
  };

const Form = ({
  formState,
  setFormState,
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
          item
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

export { setOptionDefaults, setSchemaDefaults };
export default withFormDataState(Form);
