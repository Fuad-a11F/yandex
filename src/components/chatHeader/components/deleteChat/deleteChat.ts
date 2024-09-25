import Block from "../../../../core/block.ts";
import { DeleteChatPropsInterface } from "../../../../interface/components/chatHeaderPropsInterface.ts";

class DeleteChat extends Block<DeleteChatPropsInterface> {
  constructor(props: DeleteChatPropsInterface) {
    super({ events: { click: props.onDeleteChat } });
  }

  render() {
    return `
    <div>
        <div class="chatHeader__actions_icon chatHeader__actions_icon_reverse">
            <img src="./icons/plus.svg" alt="delete">
        </div>
    
        <p>Удалить чат</p>
    </div>
    `;
  }
}

export default DeleteChat;
