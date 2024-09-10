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
    const addChatCloseButtonHandler = this.addChatCloseButtonHandler.bind(this);

    const inputSearch = new InputSearch({});
    const addChatButton = new AddChatButton({
      addChatButton: addChatButtonHandler,
    });
    const profileButton = new ProfileButton({
      handleProfileNavigate,
    });
    const addChatModal = new Modal({
      ModalBody: new AddChatModal({
        addChatCloseButton: addChatCloseButtonHandler,
      }),
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

  addChatCloseButtonHandler() {
    this.children.addChatModal.setProps({ isVisible: false });
  }

  render() {
    return `
    <div>
      <div class="chatSearch">
          <div class="chatSearch__row">
            {{{ addChatButton }}}
        
            <div class="chatSearch__profile">
                {{{ profileButton }}}
             
                <img src="./icons/arrow.svg" alt="arrow">
            </div>
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
