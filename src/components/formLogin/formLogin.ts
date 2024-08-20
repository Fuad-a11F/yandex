import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";

export class FormLogin extends Block {
  constructor() {
    super();
  }

  init() {
    const InputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
    });
    const FormPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
    });

    const LoginButton = new Button({
      text: "Sign in",
      type: "submit",
    });

    const RegisterButton = new Button({
      text: "Don't have an account?",
      type: "button",
      isLink: true,
    });

    this.children = {
      ...this.children,
      InputLogin,
      FormPassword,
      LoginButton,
      RegisterButton,
    };
  }

  render() {
    return `
      <div class="login">
        <div>
            <h1 class="login__title">Login</h1>
    
            {{{ InputLogin }}}
            {{{ FormPassword }}}
        </div>
    
        <div>
            {{{ LoginButton }}}

          <div class="login__center">
              {{{ RegisterButton }}}
          </div>
        </div>
      </div>
      `;
  }
}
