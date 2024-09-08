import Block from "../../../core/block.ts";
import BackButton from "./backButton.ts";
import {
  AsideChildrenInterface,
  AsidePropsInterface,
} from "../../../interface/modules/profile/profilePropsInterface.ts";

class Aside extends Block<AsidePropsInterface, AsideChildrenInterface> {
  init() {
    const backButton = new BackButton({ ...this.props });

    this.children = {
      ...this.children,
      backButton,
    };
  }

  render() {
    return `
        <aside class="profile__back">
          {{{ backButton }}}
        </aside>
    `;
  }
}

export default Aside;
