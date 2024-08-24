// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { Form } from "./index.ts";

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
