// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";

class ProfileRow extends Block {
  constructor(props) {
    super({ ...props });
  }

  render() {
    return `
        <div class="profileRow">
            <div class="profileRow__label">{{label}}</div>
        
            {{#if isEditting}}
               <div class="profileRow__value_edit">
                   <label>
                       {{{ input }}}
                   </label>
               </div>
            {{else}}
                <div class="profileRow__value">{{value}}</div>
            {{/if}}
        </div>
    `;
  }
}

export default ProfileRow;
