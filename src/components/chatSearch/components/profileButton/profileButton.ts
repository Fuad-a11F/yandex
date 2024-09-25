import Block from "../../../../core/block.ts";
import { ProfileButtonPropsInterface } from "../../../../interface/components/chatSearchPropsInterface.ts";

class ProfileButton extends Block<ProfileButtonPropsInterface> {
  constructor(props: ProfileButtonPropsInterface) {
    super({ ...props, events: { click: props.handleProfileNavigate } });
  }

  render() {
    return `
        <button>Profile</button>
      `;
  }
}

export default ProfileButton;
