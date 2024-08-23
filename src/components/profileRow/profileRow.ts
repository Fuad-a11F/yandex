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
