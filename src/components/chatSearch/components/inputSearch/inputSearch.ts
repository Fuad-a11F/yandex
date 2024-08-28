import Block from "../../../../core/block.ts";

class InputSearch extends Block {
  render() {
    return `
    <div class="inputSearch">
        <label>
            <input name="search" type="text" required>
    
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
