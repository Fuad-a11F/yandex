import Block from "../../../core/block.ts";
import { DropdownHeaderInterface } from "../../../interface/components/chatHeaderPropsInterface.ts";

class DropdownHeader extends Block<DropdownHeaderInterface> {
  render() {
    return `
    <div class="chatHeader__actions">
        {{{ addUser }}}       
        
        {{{ removeUser }}}
        
        {{{ changeAvatar }}}
        
        {{{ deleteChat }}}
    </div>
`;
  }
}

export default DropdownHeader;
