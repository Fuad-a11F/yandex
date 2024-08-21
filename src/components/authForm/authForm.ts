import Block from "../../core/block.ts";

export class AuthForm extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <main class="authForm__wrapper">
        <div class="authForm">
          <form action="">{{{ formBody }}}</form>
        </div>
      </main>
    `;
  }
}
