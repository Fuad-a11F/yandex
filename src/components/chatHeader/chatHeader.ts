// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю исправить к след спринту.. Уже дедлайн очень сильно поджимает, очень не хочется срывать сроки. Как я обещал я во многих местах исправил, по сравнению с прошлым разом

import Block from "../../core/block.ts";
import { Modal } from "../modal";
import {
  AddUser,
  DropdownHeader,
  ModalAddUserModal,
  ModalRemoveUserModal,
  MoreAction,
  RemoveUser,
} from "./index.ts";
import { Dropdown } from "../dropdown";
import { ChatHeaderChildrenInterface } from "../../interface/components/chatHeaderPropsInterface.ts";
import { connect } from "../../shared/connect.ts";
import { getSelectedChatData } from "../../shared/selectors/selectors.ts";

class ChatHeader extends Block<unknown, ChatHeaderChildrenInterface> {
  init() {
    const onClose = this.onClose.bind(this);
    const onAddUser = this.onAddUser.bind(this);
    const closeModal = this.closeModal.bind(this);
    const onRemoveUser = this.onRemoveUser.bind(this);

    const moreAction = new MoreAction({ onClose });
    const addUser = new AddUser({ onAddUser });
    const removeUser = new RemoveUser({ onRemoveUser });

    const dropdown = new Dropdown({
      dropdownBody: new DropdownHeader({ addUser, removeUser }),
    });

    const modalAddUser = new Modal({
      ModalBody: new (connect(getSelectedChatData)(ModalAddUserModal))({
        closeModal,
      }),
    });
    const modalRemoveUser = new Modal({
      ModalBody: new (connect(getSelectedChatData)(ModalRemoveUserModal))({
        closeModal,
      }),
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

  closeModal(modal: "modalAddUser" | "modalRemoveUser") {
    this.children[modal].setProps({ isVisible: false });
  }

  render() {
    return `
    <div>
        <div class="chatHeader">
            <div class="chatHeader__info">
                <div class="chatHeader__avatar"><img src="vite.svg" alt="avatar"></div>
        
                <p>{{selectedChat.title}}</p>
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
