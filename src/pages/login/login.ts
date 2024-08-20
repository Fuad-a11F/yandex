import Block from "../../core/block.ts";
import { AuthForm } from "../../components";

export class LoginPage extends Block {
  constructor(props) {
    super({ ...props, AuthForm: new AuthForm({}) });
  }

  render() {
    return `<div>{{{AuthForm}}}</div>`;
  }
}
