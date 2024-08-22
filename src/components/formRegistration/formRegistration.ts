import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "../../shared/validation.ts";

class FormRegistration extends Block {
  constructor() {
    super();
  }

  init() {
    const handleValidate = this.handleValidate.bind(this);

    const inputFirstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "First name",
      onBlur: (value: string) =>
        handleValidate(value, namesValidation, inputFirstName, "sdf"),
    });

    const inputSecondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Second name",
      onBlur: (value: string) =>
        handleValidate(value, namesValidation, inputSecondName, "sdf"),
    });

    const inputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
      onBlur: (value: string) =>
        handleValidate(value, loginValidation, inputLogin, "sdf"),
    });

    const inputEmail = new Input({
      name: "email",
      type: "text",
      placeholder: "Email",
      onBlur: (value: string) =>
        handleValidate(value, emailValidation, inputEmail, "sdf"),
    });

    const inputPhone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Phone",
      onBlur: (value: string) =>
        handleValidate(value, phoneValidation, inputPhone, "sdf"),
    });

    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: (value: string) =>
        handleValidate(value, passwordValidation, inputPassword, "sdf"),
    });

    const inputPasswordRepeat = new Input({
      name: "repassword",
      type: "password",
      placeholder: "Repeat password",
      onBlur: () => {},
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

  handleValidate(value, validateFunction, input, errorMessage) {
    if (!validateFunction(value)) {
      this.children[input].setProps({
        isError: true,
        errorMessage,
      });
    } else {
      this.children[input].setProps({
        isError: false,
        errorMessage: null,
      });
    }
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
              {{{ loginButton }}}
          </div>
        </div>
    </div>
      `;
  }
}

export default FormRegistration;
