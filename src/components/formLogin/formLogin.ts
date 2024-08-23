import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  loginValidation,
  passwordValidation,
} from "../../shared/validation.ts";

class FormLogin extends Block {
  constructor() {
    super();
  }

  init() {
    const handleValidate = this.handleValidate.bind(this);

    const inputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
      onBlur: (value: string) =>
        handleValidate(value, loginValidation, inputLogin, "Login is wrong"),
    });
    const inputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
      onBlur: (value: string) =>
        handleValidate(
          value,
          passwordValidation,
          inputPassword,
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
