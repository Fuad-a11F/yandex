// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "../../core/block.ts";

class Dropdown extends Block {
  constructor(props) {
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
