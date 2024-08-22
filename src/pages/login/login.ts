import Block from "../../core/block.ts";
import { AuthForm } from "../../components";
import { FormLogin } from "../../components";

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
    this.children.authForm.children.formBody.handleLoginBlur(data.login);
    this.children.authForm.children.formBody.handlePasswordBlur(data.password);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}

export default Login;
