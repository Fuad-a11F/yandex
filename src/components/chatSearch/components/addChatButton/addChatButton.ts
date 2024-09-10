import Block from "../../../../core/block.ts";

class AddChatButton extends Block {
  constructor(props) {
    super({ ...props, events: { click: props.addChatButton } });
  }

  render() {
    return `<button class="addChatButton">+</button>`;
  }
}

export default AddChatButton;
