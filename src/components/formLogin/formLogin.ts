import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import { passwordValidation } from "../../shared/validation.ts";

class FormLogin extends Block {
  constructor() {
    super();
  }

  init() {
    const handlePasswordBlur = this.handlePasswordBlur.bind(this);

    const inputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
    });
    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: handlePasswordBlur,
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
              {{{ registerButton }}}
          </div>
        </div>
      </div>
      `;
  }
}

export default FormLogin;
