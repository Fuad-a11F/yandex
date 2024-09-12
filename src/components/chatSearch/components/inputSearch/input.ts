import Block from "../../../../core/block.ts";

class Input extends Block {
  constructor(props) {
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
