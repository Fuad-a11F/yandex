import Block from "../../../core/block.ts";

class RemoveUser extends Block {
  constructor(props) {
    super({ ...props, events: { click: props.onRemoveUser } });
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
