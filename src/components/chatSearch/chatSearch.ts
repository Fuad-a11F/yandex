import Block from "../../core/block.ts";
import { InputSearch } from "./index.ts";
import {
  ChatSearchChildrenInterface,
  ChatSearchPropsInterface,
} from "../../interface/components/chatSearchPropsInterface.ts";
import ProfileButton from "./components/profileButton/profileButton.ts";
import AddChatButton from "./components/addChatButton/addChatButton.ts";

class ChatSearch extends Block<
  ChatSearchPropsInterface,
  ChatSearchChildrenInterface
> {
  init() {
    const handleProfileNavigate = this.handleProfileNavigate.bind(this);

    const inputSearch = new InputSearch({});
    const addChatButton = new AddChatButton({});
    const profileButton = new ProfileButton({
      handleProfileNavigate,
    });

    this.children = {
      ...this.children,
      inputSearch,
      profileButton,
      addChatButton,
    };
  }

  handleProfileNavigate() {
    window.router.go("/settings");
  }

  render() {
    return `
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
    `;
  }
}

export default ChatSearch;
