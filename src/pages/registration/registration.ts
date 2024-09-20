import Block from "../../core/block.ts";
import { AuthForm, FormRegistration } from "../../components";
import { getRegistrationValidateFields } from "../../shared/validation/inputsForValidate.ts";
import { RegistrationInterface } from "../../interface/auth/registrationInterface.ts";
import { RegistrationChildrenInterface } from "../../interface/modules/registration/registrationInterface.ts";
import { signUp } from "../../services/auth.ts";
import { connect } from "../../shared/connect.ts";
import { getAuthData } from "../../shared/selectors/selectors.ts";

export class Registration extends Block<object, RegistrationChildrenInterface> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new (connect(getAuthData)(FormRegistration))(
        {},
      ) as unknown as FormRegistration,
      formSubmit: formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  async formSubmit(data: RegistrationInterface) {
    const error = { isError: false };

    const dsf = "sdf";
    const ds2f = "sdf";

    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("#signInForm input");

    inputs.forEach((input) => {
      input.blur();
    });

    getRegistrationValidateFields(data).forEach((input) => {
      error.isError = !input.validateFunction(input.value);
    });

    if (data.password !== data.repassword) {
      (
        this.children.authForm.children.formBody as FormRegistration
      ).children.inputPasswordRepeat.setProps({
        isError: true,
        errorMessage: "Passwords are different",
      });

      error.isError = true;
    }

    if (error.isError) return;

    await signUp(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}
