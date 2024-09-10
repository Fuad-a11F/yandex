import Block from "../../core/block.ts";
import { InputSearch } from "./index.ts";
import {
  ChatSearchChildrenInterface,
  ChatSearchPropsInterface,
} from "../../interface/components/chatSearchPropsInterface.ts";
import ProfileButton from "./components/profileButton/profileButton.ts";
import AddChatButton from "./components/addChatButton/addChatButton.ts";
import { Modal } from "../modal";
import AddChatModal from "./components/addChatButton/addChatModal.ts";

class ChatSearch extends Block<
  ChatSearchPropsInterface,
  ChatSearchChildrenInterface
> {
  init() {
    const handleProfileNavigate = this.handleProfileNavigate.bind(this);
    const addChatButtonHandler = this.addChatButtonHandler.bind(this);

    const inputSearch = new InputSearch({});
    const addChatButton = new AddChatButton({
      addChatButton: addChatButtonHandler,
    });
    const profileButton = new ProfileButton({
      handleProfileNavigate,
    });
    const addChatModal = new Modal({
      ModalBody: new AddChatModal({}),
    });

    this.children = {
      ...this.children,
      inputSearch,
      profileButton,
      addChatButton,
      addChatModal,
    };
  }

  handleProfileNavigate() {
    window.router.go("/settings");
  }

  addChatButtonHandler() {
    this.children.addChatModal.setProps({ isVisible: true });
  }

  render() {
    return `
    <div>
      <div class="chatSearch">
          {{{ addChatButton }}}
      
          <div class="chatSearch__profile">
              {{{ profileButton }}}
           
              <img src="./icons/arrow.svg" alt="arrow">
          </div>
      
          <div class="chatSearch__search">
              {{{ inputSearch }}}
          </div>
      </div>
      
      {{{ addChatModal }}}
  </div>
    `;
  }
}

export default ChatSearch;
