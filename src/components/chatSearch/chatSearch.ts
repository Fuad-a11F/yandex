import Block from "../../core/block.ts";
import { InputSearch } from "./index.ts";
import {
  ChatSearchChildrenInterface,
  ChatSearchPropsInterface,
} from "../../interface/components/chatSearchPropsInterface.ts";
import ProfileButton from "./components/profileButton/profileButton.ts";

class ChatSearch extends Block<
  ChatSearchPropsInterface,
  ChatSearchChildrenInterface
> {
  init() {
    const handleProfileNavigate = this.handleProfileNavigate.bind(this);

    const inputSearch = new InputSearch({});
    const profileButton = new ProfileButton({
      handleProfileNavigate,
    });

    this.children = {
      ...this.children,
      inputSearch,
      profileButton,
    };
  }

  handleProfileNavigate() {
    window.router.go("/profile");
  }

  render() {
    return `
    <div class="chatSearch">
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
