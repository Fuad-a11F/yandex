import Block from "../../core/block.ts";
import { Avatar, AvatarModal } from "./index.ts";
import { Modal } from "../modal";
import {
  UploadAvatarChildrenInterface,
  UploadAvatarPropsInterface,
} from "../../interface/components/uploadAvatarInterface.ts";

class UploadAvatar extends Block<
  UploadAvatarPropsInterface,
  UploadAvatarChildrenInterface
> {
  init() {
    const handleClick = this.handleClick.bind(this);

    this.children = {
      ...this.children,
      avatar: new Avatar({ handleClick }),
      modal: new Modal({
        ModalBody: new AvatarModal({}),
      }),
    };
  }

  handleClick() {
    this.children.modal.setProps({ isVisible: true });
  }

  render() {
    return `
      <div>
          {{{ avatar }}}
          
          {{{ modal }}}
      </div>
    `;
  }
}

export default UploadAvatar;
