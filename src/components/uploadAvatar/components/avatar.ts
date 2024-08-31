import Block from "../../../core/block.ts";
import { AvatarPropsInterface } from "../../../interface/components/uploadAvatarInterface.ts";

class Avatar extends Block<AvatarPropsInterface> {
  constructor(props: AvatarPropsInterface) {
    super({
      events: {
        click: props.handleClick,
      },
    });
  }

  render() {
    return `
      <div class="uploadAvatar">
          <img src="./icons/avatar.svg" alt="avatar">
      
          <div class="uploadAvatar__hover">Change <br> avatar</div>
      </div>
    `;
  }
}

export default Avatar;
