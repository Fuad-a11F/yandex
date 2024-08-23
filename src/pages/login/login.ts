import Block from "../../core/block.ts";
import { AuthForm, FormLogin } from "../../components";
import { getLoginValidateFields } from "../../shared/inputsForValidate.ts";

class Login extends Block {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new FormLogin(),
      formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  formSubmit(data) {
    const loginFieldsValidate = getLoginValidateFields(data);
    let isError = false;

    if (isError) return;

    console.log(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}

export default Login;
