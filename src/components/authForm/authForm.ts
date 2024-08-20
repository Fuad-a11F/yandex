import Block from "../../core/block.ts";
import { FormLogin } from "../formLogin";

export class AuthForm extends Block {
  constructor(props) {
    super({
      ...props,
      FormLogin: new FormLogin(),
    });
  }

  render() {
    return `
      <main class="authForm__wrapper">
        <div class="authForm">
          <form action="">{{{ FormLogin }}}</form>
        </div>
      </main>
    `;
  }
}
