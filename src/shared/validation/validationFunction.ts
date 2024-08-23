import Block from "../../core/block.ts";

interface FieldsInterface {
  validateFunction: Function;
  value: string;
  errorMessage: string;
  input: string;
}

const validationFunction = (
  fields: FieldsInterface[],
  selector: Block,
  error: { isError: boolean },
  selectorContinue = null,
) => {
  fields.forEach((item) => {
    if (!item.validateFunction(item.value)) {
      if (selectorContinue) {
        const keys = selectorContinue.split(".");

        let value = selector[item.input];

        for (let key of keys) {
          value = value[key];
        }
        value.setProps({
          isError: true,
          errorMessage: item.errorMessage,
        });
      } else {
        selector[item.input].setProps({
          isError: true,
          errorMessage: item.errorMessage,
        });
      }

      error.isError = true;
    } else {
      if (selectorContinue) {
        const keys = selectorContinue.split(".");

        let value = selector[item.input];

        for (let key of keys) {
          value = value[key];
        }

        value.setProps({
          isError: false,
          errorMessage: null,
        });
      } else {
        selector[item.input].setProps({
          isError: false,
          errorMessage: null,
        });
      }
    }
  });
};

export const validationFunctionForField = (
  validateFunction: Function,
  value: string,
  selector: Block,
  errorMessage: string,
) => {
  if (!validateFunction(value)) {
    selector.setProps({
      isError: true,
      errorMessage,
    });
  } else {
    selector.setProps({
      isError: false,
      errorMessage: null,
    });
  }
};

export default validationFunction;
