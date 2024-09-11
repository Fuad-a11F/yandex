import Block from "../../core/block.ts";
import { Avatar, AvatarModal } from "./index.ts";
import { Modal } from "../modal";
import {
  UploadAvatarChildrenInterface,
  UploadAvatarPropsInterface,
} from "../../interface/components/uploadAvatarInterface.ts";
import { connect } from "../../shared/connect.ts";

class UploadAvatar extends Block<
  UploadAvatarPropsInterface,
  UploadAvatarChildrenInterface
> {
  init() {
    this.children = {
      ...this.children,
      modal: new Modal({
        ModalBody: new AvatarModal({}),
      }),
    };
  }

  componentDidUpdate(
    oldProps: UploadAvatarPropsInterface,
    newProps: UploadAvatarPropsInterface,
  ): boolean {
    const handleClick = this.handleClick.bind(this);

    this.children = {
      ...this.children,
      avatar: new Avatar({ handleClick }),
    };
    return super.componentDidUpdate(oldProps, newProps);
  }

  handleClick() {
    this.children.modal?.setProps({ isVisible: true });
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

export default connect(({ user }) => ({ user }))(UploadAvatar);
