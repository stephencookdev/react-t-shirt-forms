import React from "react";
import { mergeDeep, deepEquals, pick } from "./utils";
import i18n from "./i18n";

const optionDefaults = {
  schema: {},

  classTransform: (rawBlock, element, modifier) => {
    const blockTransforms = {
      "date-input": "text-input",
      "email-input": "text-input",
      password: "text-input"
    };
    const prefix = "TShirtForm-";

    const block = blockTransforms[rawBlock] || rawBlock;

    const blockElement = `${prefix}${block}__${element}`;

    return modifier
      ? `${blockElement} ${blockElement}--${modifier}`
      : blockElement;
  },

  // currently unsupported
  cssInJs: false,

  renderButtons: ({ formArgs: { submitting } }) => {
    const ButtonList = genStyled("div")("form", "button-list");
    return (
      <ButtonList>
        <button disabled={submitting}>{i18n.submit}</button>
      </ButtonList>
    );
  },

  renderGenericError: ({ formArgs: { formErrors } }) => {
    const GenericError = genStyled("div")("form", "error");
    const GenericErrorText = genStyled("span")("form", "error-text");
    return (
      <GenericError>
        {formErrors.__generic ? (
          <GenericErrorText>{formErrors.__generic}</GenericErrorText>
        ) : null}
      </GenericError>
    );
  },

  renderFormItem: ({ item, error }) => {
    const FormItem = genStyled("div")("form-item", "container");
    const ErrorText = genStyled("span")("form-item", "error-text");

    return (
      <FormItem modifier={error && "error"}>
        {item}
        <ErrorText>{error || null}</ErrorText>
      </FormItem>
    );
  },

  renderFormItemGroup: ({ items, label }) => {
    const FormItemGroup = genStyled("div")("form-item", "container-group");
    const FormItemGroupLabel = genStyled("div")(
      "form-item",
      "container-group-label"
    );
    return (
      <FormItemGroup>
        <FormItemGroupLabel>{label}</FormItemGroupLabel>
        {Object.values(items)}
      </FormItemGroup>
    );
  },

  handleSubmit: () => console.error("`handleSubmit` not defined!"),

  formItemGroups: [],

  formItemExceptions: [],

  passThroughProps: {}
};

const userOptionDefaults = {};

export const setOptionDefaults = defaults =>
  mergeDeep(userOptionDefaults, defaults);

export const getOptionDefaults = () =>
  mergeDeep({}, optionDefaults, userOptionDefaults);

const genStyledCache = [];
export const genStyled = Component => (block, element) => {
  const { classTransform, cssInJs } = getOptionDefaults();
  const cachedResult = genStyledCache.find(x => {
    const cacheKey = {
      classTransform,
      block,
      element,
      Component
    };
    // `deepEquals` since e.g. `block` can be an array
    return deepEquals(pick(x, Object.keys(cacheKey)), cacheKey);
  });
  if (cachedResult) return cachedResult.StyledComponent;

  // fall back on the default styling if the user hasn't specified a particular
  // style case
  const wrappedClassTransform = (block, element, modifier) =>
    classTransform(block, element, modifier) ||
    optionDefaults.classTransform(block, element, modifier);

  let StyledComponent;
  if (cssInJs) {
    StyledComponent = wrappedClassTransform(block, element);
  } else {
    const blockParts = Array.isArray(block) ? block : [block];

    StyledComponent = ({ modifier, className, ...props }) => (
      <Component
        {...props}
        className={blockParts
          .map(bPart => wrappedClassTransform(bPart, element, modifier))
          .concat(className)
          .join(" ")}
      />
    );
  }

  genStyledCache.push({
    classTransform,
    block,
    element,
    StyledComponent,
    Component
  });

  return StyledComponent;
};
