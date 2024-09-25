import Block from "../../core/block.ts";
import { AuthForm, FormLogin } from "../../components";
import { getLoginValidateFields } from "../../shared/validation/inputsForValidate.ts";
import { LoginInterface } from "../../interface/auth/loginInterface.ts";
import { LoginChildrenInterface } from "../../interface/modules/login/loginInterface.ts";
import { signIn } from "../../services/auth.ts";
import { connect } from "../../shared/connect.ts";
import { getAuthData } from "../../shared/selectors/selectors.ts";

class Login extends Block<object, LoginChildrenInterface> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new (connect(getAuthData)(FormLogin as typeof Block<object>))(
        {},
      ) as unknown as FormLogin,
      formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  async formSubmit(data: LoginInterface) {
    const error = { isError: false };

    const inputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll("#signInForm input");

    inputs.forEach((input) => {
      input.blur();
    });

    getLoginValidateFields(data).forEach((input) => {
      error.isError = !input.validateFunction(input.value);
    });

    if (error.isError) return;

    await signIn(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}

export default Login;
