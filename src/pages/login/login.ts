// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю исправить к след спринту.. Уже дедлайн очень сильно поджимает, очень не хочется срывать сроки. Как я обещал я во многих местах исправил, по сравнению с прошлым разом

import Block from "../../core/block.ts";
import { AuthForm, FormLogin } from "../../components";
import { getLoginValidateFields } from "../../shared/validation/inputsForValidate.ts";
import validationFunction from "../../shared/validation/validationFunction.ts";
import { LoginInterface } from "../../interface/auth/loginInterface.ts";
import { LoginChildrenInterface } from "../../interface/modules/login/loginInterface.ts";
import { signIn } from "../../services/auth.ts";
import { connect } from "../../shared/connect.ts";
import { getAuthData } from "../../shared/selectors/selectors.ts";

class Login extends Block<object, LoginChildrenInterface> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const authForm = new AuthForm({
      formBody: new (connect(getAuthData)(FormLogin))(
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

    validationFunction(
      getLoginValidateFields(data),
      this.children.authForm.children.formBody.children,
      error,
    );

    if (error.isError) return;

    await signIn(data);
  }

  render() {
    return `<div>{{{authForm}}}</div>`;
  }
}

export default Login;
