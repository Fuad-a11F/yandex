import Block from "../../core/block.ts";
import { AuthForm, FormRegistration } from "../../components";
import { getRegistrationValidateFields } from "../../shared/validation/inputsForValidate.ts";
import validationFunction from "../../shared/validation/validationFunction.ts";
import { RegistrationInterface } from "../../interface/auth/registrationInterface.ts";
import {
  RegistrationChildrenInterface,
  RegistrationPropsInterface,
} from "../../interface/modules/registration/registrationInterface.ts";
import AuthApi from "../../api/authApi.ts";
import { signUn } from "../../services/auth.ts";

export class Registration extends Block<
  RegistrationPropsInterface,
  RegistrationChildrenInterface
> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new FormRegistration({}),
      formSubmit: formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  async formSubmit(data: RegistrationInterface) {
    const error = { isError: false };

    validationFunction(
      getRegistrationValidateFields(data),
      this.children.authForm.children.formBody.children,
      error,
    );

    if (data.password !== data.repassword) {
      (
        this.children.authForm.children.formBody as FormRegistration
      ).children.inputPasswordRepeat.setProps({
        isError: true,
        errorMessage: "Passwords are different",
      });
    }

    if (error.isError) return;

    await signUn(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}
