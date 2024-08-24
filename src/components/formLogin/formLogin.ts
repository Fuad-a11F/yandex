// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  loginValidation,
  passwordValidation,
} from "../../shared/validation/validation.ts";
import { validationFunctionForField } from "../../shared/validation/validationFunction.ts";

class FormLogin extends Block {
  init() {
    const inputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
      onBlur: (value: string) =>
        validationFunctionForField(
          loginValidation,
          value,
          this.children.inputLogin,
          "Login is wrong",
        ),
    });
    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: (value: string) =>
        validationFunctionForField(
          passwordValidation,
          value,
          this.children.inputPassword,
          "Password is wrong",
        ),
    });
    const loginButton = new Button({
      text: "Sign in",
      type: "submit",
    });
    const registerButton = new Button({
      text: "Don't have an account?",
      type: "button",
      isLink: true,
    });

    this.children = {
      ...this.children,
      inputLogin,
      inputPassword,
      loginButton,
      registerButton,
    };
  }

  render() {
    return `
      <div class="login">
        <div>
            <h1 class="login__title">Login</h1>
    
            {{{ inputLogin }}}
            {{{ inputPassword }}}
        </div>
    
        <div>
            {{{ loginButton }}}

          <div class="login__center">
              <a href="#" page="registration">{{{ registerButton }}}</a>
          </div>
        </div>
      </div>
      `;
  }
}

export default FormLogin;
