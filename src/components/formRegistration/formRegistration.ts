import Block from "../../core/block.ts";
import { Input } from "../input";
import { Button } from "../button";

export class FormRegistration extends Block {
  constructor() {
    super();
  }

  init() {
    const InputFirstName = new Input({
      name: "first_name",
      type: "text",
      placeholder: "First name",
    });

    const InputSecondName = new Input({
      name: "second_name",
      type: "text",
      placeholder: "Second name",
    });

    const InputLogin = new Input({
      name: "login",
      type: "text",
      placeholder: "Login",
    });

    const InputEmail = new Input({
      name: "email",
      type: "text",
      placeholder: "Email",
    });

    const InputPhone = new Input({
      name: "phone",
      type: "text",
      placeholder: "Phone",
    });

    const InputPassword = new Input({
      name: "password",
      type: "password",
      placeholder: "Password",
    });

    const InputPasswordRepeat = new Input({
      name: "repassword",
      type: "password",
      placeholder: "Repeat password",
    });

    const LoginButton = new Button({
      text: "Sign in",
      type: "submit",
      isLink: true,
    });

    const RegisterButton = new Button({
      text: "Sign up",
      type: "submit",
    });

    this.children = {
      ...this.children,
      InputFirstName,
      InputSecondName,
      InputLogin,
      InputEmail,
      InputPhone,
      InputPassword,
      InputPasswordRepeat,
      LoginButton,
      RegisterButton,
    };
  }

  render() {
    return `
      <div class="registration">
        <div>
            <h1 class="registration__title">Registration</h1>
    
            {{{ InputFirstName }}}
            {{{ InputSecondName }}}
            {{{ InputLogin }}}
            {{{ InputEmail }}}
            {{{ InputPhone }}}
            {{{ InputPassword }}}
            {{{ InputPasswordRepeat }}}
        </div>
    
        <div>
          {{{ RegisterButton }}}
  
          <div class="registration__center">
              {{{ LoginButton }}}
          </div>
        </div>
    </div>
      `;
  }
}
