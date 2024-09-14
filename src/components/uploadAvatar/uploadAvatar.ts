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
    const handleCloseModal = this.handleCloseModal.bind(this);

    this.children = {
      ...this.children,
      modal: new Modal({
        ModalBody: new AvatarModal({ handleCloseModal }),
      }),
      avatar: new Avatar({ handleClick, user: this.props.user }),
    };
  }

  componentDidUpdate(
    oldProps: UploadAvatarPropsInterface,
    newProps: UploadAvatarPropsInterface,
  ): boolean {
    const handleClick = this.handleClick.bind(this);

    this.children = {
      ...this.children,
      avatar: new Avatar({ handleClick, user: this.props.user }),
    };

    return super.componentDidUpdate(oldProps, newProps);
  }

  componentDidMount() {
    super.componentDidMount();
  }

  handleClick() {
    this.children.modal?.setProps({ isVisible: true });
  }
  handleCloseModal() {
    this.children.modal?.setProps({ isVisible: false });
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
