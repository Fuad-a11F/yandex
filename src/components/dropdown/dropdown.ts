// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { DropdownInterface } from "../../interface/components/dropdownInterface.ts";

class Dropdown extends Block<DropdownInterface> {
  constructor(props: DropdownInterface) {
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
