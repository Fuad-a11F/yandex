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
import {
  ChatHeaderChildrenInterface,
  ChatHeaderPropsInterface,
} from "../../interface/components/chatHeaderPropsInterface.ts";
import { connect } from "../../shared/connect.ts";
import { getSelectedChatData } from "../../shared/selectors/selectors.ts";
import DeleteChat from "./components/deleteChat/deleteChat.ts";
import {
  changeChatAvatar,
  deleteChat,
  getAllChats,
} from "../../services/chat.ts";
import AvatarModal from "../uploadAvatar/components/avatarModal.ts";
import ChangeAvatar from "./components/changeAvatar/changeAvatar.ts";

class ChatHeader extends Block<
  ChatHeaderPropsInterface,
  ChatHeaderChildrenInterface
> {
  init() {
    const onClose = this.onClose.bind(this);
    const onAddUser = this.onAddUser.bind(this);
    const closeModal = this.closeModal.bind(this);
    const onRemoveUser = this.onRemoveUser.bind(this);
    const onDeleteChat = this.onDeleteChat.bind(this);
    const onChangeAvatar = this.onChangeAvatar.bind(this);
    const formSubmitChangeAvatar = this.formSubmitChangeAvatar.bind(this);

    const moreAction = new MoreAction({ onClose });
    const addUser = new AddUser({ onAddUser });
    const removeUser = new RemoveUser({ onRemoveUser });
    const deleteChat = new DeleteChat({ onDeleteChat });
    const changeAvatar = new ChangeAvatar({ onChangeAvatar });

    const dropdown = new Dropdown({
      dropdownBody: new DropdownHeader({
        addUser,
        removeUser,
        deleteChat,
        changeAvatar,
      }),
    });

    const modalAddUser = new Modal({
      ModalBody: new (connect(getSelectedChatData)(
        ModalAddUserModal as typeof Block<object>,
      ))({
        closeModal,
      }),
    });
    const modalRemoveUser = new Modal({
      ModalBody: new (connect(getSelectedChatData)(
        ModalRemoveUserModal as typeof Block<object>,
      ))({
        closeModal,
      }),
    });
    const changeAvatarModal = new Modal({
      ModalBody: new (connect(getSelectedChatData)(AvatarModal))({
        handleCloseModal: closeModal,
        formSubmitChangeAvatar,
      }),
    });

    this.children = {
      ...this.children,
      moreAction,
      modalAddUser,
      modalRemoveUser,
      changeAvatarModal,
      dropdown,
    };
  }

  async onDeleteChat() {
    const answer = confirm("Do you want to delete chat?");

    if (!answer) return;

    if (this.props?.selectedChat?.id) {
      await deleteChat({ chatId: this.props.selectedChat.id });
      await getAllChats({});
    }
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

  async onChangeAvatar() {
    this.children.changeAvatarModal.setProps({ isVisible: true });
    this.children.dropdown.setProps({
      isVisible: !this.children.dropdown.props.isVisible,
    });
  }

  async formSubmitChangeAvatar(data: { avatar: File }) {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("chatId", String(this.props?.selectedChat?.id));

    await changeChatAvatar(formData as FormData);
    await getAllChats({});
  }

  closeModal(modal: "modalAddUser" | "modalRemoveUser" | "changeAvatarModal") {
    this.children[modal].setProps({
      isVisible: false,
    });
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
            
        {{{ changeAvatarModal }}}        
  </div>
    `;
  }
}

export default ChatHeader;
