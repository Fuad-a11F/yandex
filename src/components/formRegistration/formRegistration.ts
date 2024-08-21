import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  emailValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "../../shared/validation.ts";

class FormRegistration extends Block {
  constructor() {
    super();
  }

  init() {
    const handlePasswordBlur = this.handlePasswordBlur.bind(this);
    const handleEmailBlur = this.handleEmailBlur.bind(this);
    const handlePhoneBlur = this.handlePhoneBlur.bind(this);
    const handleFirstNameBlur = this.handleFirstNameBlur.bind(this);
    const handleSecondNameBlur = this.handleSecondNameBlur.bind(this);

    const inputFirstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "First name",
      onBlur: handleFirstNameBlur,
    });

    const inputSecondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Second name",
      onBlur: handleSecondNameBlur,
    });

    const inputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
    });

    const inputEmail = new Input({
      name: "email",
      type: "text",
      placeholder: "Email",
      onBlur: handleEmailBlur,
    });

    const inputPhone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Phone",
      onBlur: handlePhoneBlur,
    });

    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: handlePasswordBlur,
    });

    const inputPasswordRepeat = new Input({
      name: "repassword",
      type: "password",
      placeholder: "Repeat password",
      onBlur: handlePasswordBlur,
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

  handlePasswordBlur(value) {
    if (!passwordValidation(value)) {
      this.children.inputPassword.setProps({
        isError: true,
        errorMessage:
          "Password must contain at least 8 characters, 1 special character, 1 capital letter and 1 lowercase letter",
      });
    } else {
      this.children.inputPassword.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }

  handleEmailBlur(value) {
    if (!emailValidation(value)) {
      this.children.inputEmail.setProps({
        isError: true,
        errorMessage: "Email is wrong",
      });
    } else {
      this.children.inputEmail.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }

  handlePhoneBlur(value) {
    if (!phoneValidation(value)) {
      this.children.inputPhone.setProps({
        isError: true,
        errorMessage: "Phone is wrong",
      });
    } else {
      this.children.inputPhone.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }

  handleFirstNameBlur(value) {
    if (!namesValidation(value)) {
      this.children.inputFirstName.setProps({
        isError: true,
        errorMessage: "Name can only contain letters",
      });
    } else {
      this.children.inputFirstName.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }

  handleSecondNameBlur(value) {
    if (!namesValidation(value)) {
      this.children.inputSecondName.setProps({
        isError: true,
        errorMessage: "Second name can only contain letters",
      });
    } else {
      this.children.inputSecondName.setProps({
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
