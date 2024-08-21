import Block from "../../core/block.ts";
import Form from "./components/form.ts";

class AuthForm extends Block {
  constructor(props) {
    super({
      ...props,
      form: new Form({
        formBody: props.formBody,
        formSubmit: props.formSubmit,
      }),
    });
  }

  render() {
    return `
      <main class="authForm__wrapper">
        <div class="authForm">
          {{{ form }}}
        </div>
      </main>
    `;
  }
}

export default AuthForm;
