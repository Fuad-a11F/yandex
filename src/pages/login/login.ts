import Block from "../../core/block.ts";
import { AuthForm } from "../../components";

export class Login extends Block {
  constructor(props) {
    super({ ...props, AuthForm: new AuthForm({}) });
  }

  render() {
    return `<div>{{{AuthForm}}}</div>`;
  }
}
