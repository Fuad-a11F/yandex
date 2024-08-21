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
    console.log(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}
