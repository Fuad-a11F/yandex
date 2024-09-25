import Block from "../../../../core/block.ts";
import { RemoveUserPropsInterface } from "../../../../interface/components/chatHeaderPropsInterface.ts";

class RemoveUser extends Block<RemoveUserPropsInterface> {
  constructor(props: RemoveUserPropsInterface) {
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
