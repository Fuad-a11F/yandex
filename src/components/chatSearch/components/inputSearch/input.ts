import Block from "../../../../core/block.ts";
import { InputPropsInterface } from "../../../../interface/components/chatSearchPropsInterface.ts";

class Input extends Block<InputPropsInterface> {
  constructor(props: InputPropsInterface) {
    super({
      ...props,
      events: {
        blur: (e: FocusEvent) =>
          props.searchChats((e.target as HTMLInputElement).value),
      },
    });
  }

  render() {
    return `
        <input name="search" type="text" required>
      `;
  }
}

export default Input;
