import Block from "../../core/block.ts";
import { Form } from "./index.ts";
import {
  AuthFormChildrenInterface,
  AuthFormPropsInterface,
} from "../../interface/components/authFormInterface.ts";

class AuthForm extends Block<
  AuthFormPropsInterface,
  AuthFormChildrenInterface
> {
  constructor(props: AuthFormPropsInterface & AuthFormChildrenInterface) {
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
