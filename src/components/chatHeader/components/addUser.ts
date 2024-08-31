import Block from "../../../core/block.ts";
import { AddUserPropsInterface } from "../../../interface/components/chatHeaderPropsInterface.ts";

class AddUser extends Block<AddUserPropsInterface> {
  constructor(props: AddUserPropsInterface) {
    super({ events: { click: props.onAddUser } });
  }

  render() {
    return `
    <div>
        <div class="chatHeader__actions_icon">
            <img src="./icons/plus.svg" alt="add">
        </div>
    
        <p>Добавить пользователя</p>
    </div>
    `;
  }
}

export default AddUser;
