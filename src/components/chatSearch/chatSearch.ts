import Block from "../../core/block.ts";
import { InputSearch } from "./index.ts";

class ChatSearch extends Block {
  constructor() {
    super();
  }

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
            <button>Profile</button>
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
