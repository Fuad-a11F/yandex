import Block from "../../../../core/block.ts";
import { ChangeAvatarPropsInterface } from "../../../../interface/components/chatHeaderPropsInterface.ts";

class ChangeAvatar extends Block<ChangeAvatarPropsInterface> {
  constructor(props: ChangeAvatarPropsInterface) {
    super({ events: { click: props.onChangeAvatar } });
  }

  render() {
    return `
    <div>
        <div class="chatHeader__actions_icon">
            <img src="./icons/plus.svg" alt="add">
        </div>
    
        <p>Поменять аватарку</p>
    </div>
    `;
  }
}

export default ChangeAvatar;
