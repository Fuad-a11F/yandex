import Block from "../../core/block.ts";
import { Input } from "../input";

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

    this.children = {
      ...this.children,
      InputLogin,
      FormPassword,
    };
  }

  render() {
    return `
        <div>
            <h1 class="login__title">Login</h1>
    
            {{{ InputLogin }}}
            {{{ FormPassword }}}
        </div>
    
        <div>
<!--            {{> Button type="submit" text="Sign in" }}-->
<!--    -->
<!--            <div class="login__center">-->
<!--                {{> Button type="button" text="Don't have an account?" isLink=true }}-->
<!--            </div>-->
        </div>
        `;
  }
}
