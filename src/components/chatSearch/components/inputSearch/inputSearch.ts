import Block from "../../../../core/block.ts";
import Input from "./input.ts";
import { getAllChats } from "../../../../services/chat.ts";

class InputSearch extends Block {
  init() {
    const searchChats = this.searchChats.bind(this);
    const input = new Input({ searchChats });

    this.children = {
      ...this.children,
      input,
    };
  }

  async searchChats(value: string) {
    await getAllChats({ title: value });
  }

  render() {
    return `
    <div class="inputSearch">
        <label>
            {{{ input }}}
    
            <span class="inputSearch__placeholder">
                <img src="./icons/search.svg" alt="search icon">
                Search
            </span>
    
            <span class="inputSearch__prefix">
                <img src="./icons/search.svg" alt="search icon">
            </span>
        </label>
    </div>

    `;
  }
}

export default InputSearch;
