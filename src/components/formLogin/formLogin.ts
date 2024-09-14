import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";
import {
  loginValidation,
  passwordValidation,
} from "../../shared/validation/validation.ts";
import { validationFunctionForField } from "../../shared/validation/validationFunction.ts";
import {
  FormLoginChildrenInterface,
  FormLoginPropsInterface,
} from "../../interface/components/formLoginInterface.ts";

class FormLogin extends Block<
  FormLoginPropsInterface,
  FormLoginChildrenInterface
> {
  init() {
    const handleSignUp = this.handleSignUp.bind(this);

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
      onClick: handleSignUp,
    });

    this.children = {
      ...this.children,
      inputLogin,
      inputPassword,
      loginButton,
      registerButton,
    };
  }

  handleSignUp() {
    window.router.go("/sign-up");
  }

  render() {
    return `
      <div class="login">
        <div>
            <h1 class="login__title">Login</h1>
        
            {{{ inputLogin }}}
            {{{ inputPassword }}}
            
            {{#if errorAuth}}
                <p class="login__error">{{errorAuth}}</p>
            {{/if}}
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
