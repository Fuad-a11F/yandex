import Block from "../../../core/block.ts";

class DropdownHeader extends Block {
  render() {
    return `
    <div class="chatHeader__actions">
        {{{ addUser }}}       
        
        {{{ removeUser }}}
    </div>
`;
  }
}

export default DropdownHeader;
