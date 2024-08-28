import Block from "../../core/block.ts";
import { InputSearch } from "./index.ts";
import { ChatSearchInterface } from "../../interface/components/chatSearchInterface.ts";

class ChatSearch extends Block<ChatSearchInterface> {
  init() {
    const inputSearch = new InputSearch();

    this.children = {
      ...this.children,
      inputSearch,
    };
  }

  render() {
    return `
    <div class="chatSearch">
        <div class="chatSearch__profile">
            <a href="#" page="profile"><button>Profile</button></a>
         
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
