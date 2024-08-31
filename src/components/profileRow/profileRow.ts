import Block from "../../core/block.ts";
import {
  ProfileRowChildrenInterface,
  ProfileRowPropsInterface,
} from "../../interface/components/profileRowInterface.ts";

class ProfileRow extends Block<
  ProfileRowPropsInterface,
  ProfileRowChildrenInterface
> {
  constructor(props: ProfileRowPropsInterface & ProfileRowChildrenInterface) {
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
