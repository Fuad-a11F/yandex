import Block from "../../core/block.ts";
import { AuthForm } from "../../components";
import { FormLogin } from "../../components";

export class Login extends Block {
  constructor(props) {
    super({ ...props, AuthForm: new AuthForm({ formBody: new FormLogin() }) });
  }

  render() {
    return `<div>{{{AuthForm}}}</div>`;
  }
}
