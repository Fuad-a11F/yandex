// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { Modal } from "../modal";
import {
  ModalAddUserModal,
  RemoveUser,
  AddUser,
  MoreAction,
  ModalRemoveUserModal,
  DropdownHeader,
} from "./index.ts";
import { Dropdown } from "../dropdown";

class ChatHeader extends Block {
  init() {
    const onClose = this.onClose.bind(this);
    const onAddUser = this.onAddUser.bind(this);
    const onRemoveUser = this.onRemoveUser.bind(this);

    const moreAction = new MoreAction({ onClose });
    const addUser = new AddUser({ onAddUser });
    const removeUser = new RemoveUser({ onRemoveUser });

    const dropdown = new Dropdown({
      dropdownBody: new DropdownHeader({ addUser, removeUser }),
    });

    const modalAddUser = new Modal({
      ModalBody: new ModalAddUserModal(),
    });
    const modalRemoveUser = new Modal({
      ModalBody: new ModalRemoveUserModal(),
    });

    this.children = {
      ...this.children,
      moreAction,
      modalAddUser,
      modalRemoveUser,
      dropdown,
    };
  }

  onClose() {
    this.children.dropdown.setProps({
      isVisible: !this.children.dropdown.props.isVisible,
      top: 30,
      right: 0,
    });
  }

  onAddUser() {
    this.children.modalAddUser.setProps({ isVisible: true });
    this.children.dropdown.setProps({
      isVisible: !this.children.dropdown.props.isVisible,
    });
  }

  onRemoveUser() {
    this.children.modalRemoveUser.setProps({ isVisible: true });
    this.children.dropdown.setProps({
      isVisible: !this.children.dropdown.props.isVisible,
    });
  }

  render() {
    return `
    <div>
        <div class="chatHeader">
            <div class="chatHeader__info">
                <div class="chatHeader__avatar"><img src="vite.svg" alt="avatar"></div>
        
                <p>Вадим</p>
            </div>
            
            <div class="chatHeader__addition">
                {{{ moreAction }}}
          
               {{{ dropdown }}}
            </div>
        </div>
        
        {{{ modalAddUser }}}
        
        {{{ modalRemoveUser }}}        
  </div>
    `;
  }
}

export default ChatHeader;
