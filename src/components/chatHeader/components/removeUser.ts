import Block from "../../../core/block.ts";
import { RemoveUserInterface } from "../../../interface/components/chatHeaderInterface.ts";

class RemoveUser extends Block<RemoveUserInterface> {
  constructor(props: RemoveUserInterface) {
    super({ events: { click: props.onRemoveUser } });
  }

  render() {
    return `
   <div>
        <div class="chatHeader__actions_icon chatHeader__actions_icon_reverse">
            <img src="./icons/plus.svg" alt="delete">
        </div>

        <p>Удалить пользователя</p>
    </div>
    `;
  }
}

export default RemoveUser;
