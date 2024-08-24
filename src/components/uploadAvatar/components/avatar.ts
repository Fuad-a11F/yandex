import Block from "../../../core/block.ts";

class Avatar extends Block {
  constructor(props: { handleClick: () => void }) {
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
