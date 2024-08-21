import Block from "../../core/block.ts";
import Avatar from "./components/avatar.ts";
import { Modal } from "../modal";
import AvatarModal from "./components/avatarModal.ts";

class UploadAvatar extends Block {
  handleClick() {
    this.children.Modal.setProps({ isVisible: true });
  }

  init() {
    const handleClick = this.handleClick.bind(this);

    this.children = {
      ...this.children,
      Avatar: new Avatar({ handleClick: handleClick }),
      Modal: new Modal({
        ModalBody: new AvatarModal(),
      }),
    };
  }

  render() {
    return `
      <div>
          {{{ Avatar }}}
          
          {{{ Modal }}}
      </div>
    `;
  }
}

export default UploadAvatar;
