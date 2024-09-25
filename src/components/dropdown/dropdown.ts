import Block from "../../core/block.ts";
import {
  DropdownChildrenInterface,
  DropdownPropsInterface,
} from "../../interface/components/dropdownPropsInterface.ts";

class Dropdown extends Block<
  DropdownPropsInterface,
  DropdownChildrenInterface
> {
  constructor(props: DropdownPropsInterface & DropdownChildrenInterface) {
    super({ ...props });
  }

  render() {
    return `
      <div class="dropdown {{#if isVisible}}dropdown__active{{/if}}" style="left: {{left}}px; top: {{top}}px; right: {{right}}px; bottom: {{bottom}}px">
        {{{ dropdownBody }}}
    </div>
      `;
  }
}

export default Dropdown;
