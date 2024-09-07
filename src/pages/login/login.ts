import Block from "../../core/block.ts";
import { AuthForm, FormLogin } from "../../components";
import { getLoginValidateFields } from "../../shared/validation/inputsForValidate.ts";
import validationFunction from "../../shared/validation/validationFunction.ts";
import { LoginInterface } from "../../interface/auth/loginInterface.ts";
import {
  LoginChildrenInterface,
  LoginPropsInterface,
} from "../../interface/modules/login/loginInterface.ts";
import AuthApi from "../../api/authApi.ts";

class Login extends Block<LoginPropsInterface, LoginChildrenInterface> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new FormLogin({}),
      formSubmit,
    });

    this.children = {
      ...this.children,
      authForm,
    };
  }

  async formSubmit(data: LoginInterface) {
    const error = { isError: false };

    validationFunction(
      getLoginValidateFields(data),
      this.children.authForm.children.formBody.children,
      error,
    );

    if (error.isError) return;

    const authApi = new AuthApi();
    const response = await authApi.signIn(data);

    console.log(response);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}

export default Login;
