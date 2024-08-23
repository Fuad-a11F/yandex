import Block from "../../core/block.ts";
import { AuthForm, FormRegistration } from "../../components";
import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "../../shared/validation.ts";
import { getRegistrationValidateFields } from "../../shared/inputsForValidate.ts";

export class Registration extends Block {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new FormRegistration(),
      formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  formSubmit(data) {
    const registrationFieldsValidate = getRegistrationValidateFields(data);
    let isError = false;

    registrationFieldsValidate.forEach((item) => {
      if (!item.validateFunction(item.value)) {
        this.children.authForm.children.formBody.children[item.input].setProps({
          isError: true,
          errorMessage: item.errorMessage,
        });
        isError = true;
      } else {
        this.children.authForm.children.formBody.children[item.input].setProps({
          isError: false,
          errorMessage: null,
        });
      }
    });

    if (isError) return;

    console.log(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}
