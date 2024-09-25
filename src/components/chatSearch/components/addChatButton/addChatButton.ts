import Block from "../../../../core/block.ts";
import { AddChatButtonPropsInterface } from "../../../../interface/components/chatSearchPropsInterface.ts";

class AddChatButton extends Block<AddChatButtonPropsInterface> {
  constructor(props: AddChatButtonPropsInterface) {
    super({ ...props, events: { click: props.addChatButton } });
  }

  render() {
    return `<button class="addChatButton">+</button>`;
  }
}

export default AddChatButton;
