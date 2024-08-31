import { ChildrenComponent } from "../../interface/core/blockInterface.ts";
import Block from "../../core/block.ts";

interface FieldsInterface {
  validateFunction: (value: string) => boolean;
  value: string;
  errorMessage: string;
  input: string;
}

const validationFunction = (
  fields: FieldsInterface[],
  selector: ChildrenComponent,
  error: { isError: boolean },
  selectorContinue: string | null = null,
) => {
  fields.forEach((item) => {
    if (!item.validateFunction(item.value)) {
      if (selectorContinue) {
        const keys = selectorContinue.split(".");

        let value = (selector as { [key: string]: Block<object> })[item.input];

        for (const key of keys) {
          // @ts-ignore
          value = value[key];
        }
        value.setProps({
          isError: true,
          errorMessage: item.errorMessage,
        });
      } else {
        (selector as { [key: string]: Block<object> })[item.input].setProps({
          isError: true,
          errorMessage: item.errorMessage,
        });
      }

      error.isError = true;
    } else {
      if (selectorContinue) {
        const keys = selectorContinue.split(".");

        let value = (selector as { [key: string]: Block<object> })[item.input];

        for (const key of keys) {
          // @ts-ignore
          value = value[key];
        }

        value.setProps({
          isError: false,
          errorMessage: null,
        });
      } else {
        (selector as { [key: string]: Block<object> })[item.input].setProps({
          isError: false,
          errorMessage: null,
        });
      }
    }
  });
};

export const validationFunctionForField = (
  validateFunction: (value: string) => boolean,
  value: string,
  selector: ChildrenComponent,
  errorMessage: string,
) => {
  if (!validateFunction(value)) {
    if (Object.keys(selector).length > 0 && "setProps" in selector) {
      selector.setProps({
        isError: true,
        errorMessage,
      });
    }
  } else {
    if (Object.keys(selector).length > 0 && "setProps" in selector) {
      selector.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }
};

export default validationFunction;
