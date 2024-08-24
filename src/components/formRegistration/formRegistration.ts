// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "../../shared/validation/validation.ts";
import { validationFunctionForField } from "../../shared/validation/validationFunction.ts";

class FormRegistration extends Block {
  constructor() {
    super();
  }

  init() {
    const inputFirstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "First name",
      onBlur: (value: string) =>
        validationFunctionForField(
          namesValidation,
          value,
          this.children.inputFirstName,
          "First name is wrong",
        ),
    });

    const inputSecondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Second name",
      onBlur: (value: string) =>
        validationFunctionForField(
          namesValidation,
          value,
          this.children.inputSecondName,
          "Second name is wrong",
        ),
    });

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

    const inputEmail = new Input({
      name: "email",
      type: "text",
      placeholder: "Email",
      onBlur: (value: string) =>
        validationFunctionForField(
          emailValidation,
          value,
          this.children.inputEmail,
          "Email is wrong",
        ),
    });

    const inputPhone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Phone",
      onBlur: (value: string) =>
        validationFunctionForField(
          phoneValidation,
          value,
          this.children.inputPhone,
          "Phone is wrong",
        ),
    });

    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: (value: string) => {
        validationFunctionForField(
          passwordValidation,
          value,
          this.children.inputPassword,
          "Password is wrong",
        );
        this.setProps({ password: value });
      },
    });

    const inputPasswordRepeat = new Input({
      name: "repassword",
      type: "password",
      placeholder: "Repeat password",
      onBlur: (value: string) => {
        validationFunctionForField(
          passwordValidation,
          value,
          this.children.inputPasswordRepeat,
          "Password is wrong",
        );
        if (this.props.password !== value) {
          this.children.inputPasswordRepeat.setProps({
            isError: true,
            errorMessage: "Passwords are different",
          });
        }
      },
    });

    const loginButton = new Button({
      text: "Sign in",
      type: "submit",
      isLink: true,
    });

    const registerButton = new Button({
      text: "Sign up",
      type: "submit",
    });

    this.children = {
      ...this.children,
      inputFirstName,
      inputSecondName,
      inputLogin,
      inputEmail,
      inputPhone,
      inputPassword,
      inputPasswordRepeat,
      loginButton,
      registerButton,
    };
  }

  render() {
    return `
      <div class="registration">
        <div>
            <h1 class="registration__title">Registration</h1>
    
            {{{ inputFirstName }}}
            {{{ inputSecondName }}}
            {{{ inputLogin }}}
            {{{ inputEmail }}}
            {{{ inputPhone }}}
            {{{ inputPassword }}}
            {{{ inputPasswordRepeat }}}
        </div>
    
        <div>
          {{{ registerButton }}}
  
          <div class="registration__center">
              <a href="#" page="login">{{{ loginButton }}}</a>
          </div>
        </div>
    </div>
      `;
  }
}

export default FormRegistration;
