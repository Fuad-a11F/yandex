import Block from "../../../core/block.ts";
import { AvatarPropsInterface } from "../../../interface/components/uploadAvatarInterface.ts";
import { getResource } from "../../../services/resource.ts";

class Avatar extends Block<AvatarPropsInterface> {
  constructor(props: AvatarPropsInterface) {
    super({
      ...props,
      url: "./icons/avatar.svg",
      events: {
        click: props.handleClick,
      },
    });
  }

  init() {
    if (this.props.user?.avatar) {
      getResource(this.props.user.avatar).then((response) => {
        const imageURL = URL.createObjectURL(response as Blob);
        this.setProps({ url: imageURL });
      });
    }
  }

  render() {
    return `
      <div class="uploadAvatar">
          <img class="{{#if user.avatar}}uploadAvatar__avatar{{/if}}" src="{{url}}" alt="avatar">
      
          <div class="uploadAvatar__hover">Change <br> avatar</div>
      </div>
    `;
  }
}

export default Avatar;
