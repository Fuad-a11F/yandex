import Block from "../../core/block.ts";
import { AuthForm, FormRegistration } from "../../components";

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
    this.children.authForm.children.formBody.handleFirstNameBlur(
      data.first_name,
    );
    this.children.authForm.children.formBody.handleSecondNameBlur(
      data.second_name,
    );
    this.children.authForm.children.formBody.handleLoginBlur(data.login);
    this.children.authForm.children.formBody.handlePasswordBlur(data.password);
    this.children.authForm.children.formBody.handleEmailBlur(data.email);
    this.children.authForm.children.formBody.handlePhoneBlur(data.phone);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}
