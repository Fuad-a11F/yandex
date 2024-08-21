import Block from "../../core/block.ts";
import { AuthForm, FormRegistration } from "../../components";

export class Registration extends Block {
  constructor(props) {
    super({
      ...props,
      AuthForm: new AuthForm({ formBody: new FormRegistration() }),
    });
  }

  render() {
    return `<div>{{{AuthForm}}}</div>`;
  }
}
