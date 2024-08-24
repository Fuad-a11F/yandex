import Block from "../../../core/block.ts";

class AddUser extends Block {
  constructor(props: { onAddUser: () => void }) {
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
