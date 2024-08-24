// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../../core/block.ts";

class RemoveUser extends Block {
  constructor(props: { onRemoveUser: () => void }) {
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
