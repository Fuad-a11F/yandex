import Block from "../../../core/block.ts";
import {
  AvatarFormChildrenInterface,
  AvatarFormPropsInterface,
} from "../../../interface/components/uploadAvatarInterface.ts";
import { ChangeAvatarRequestInterface } from "../../../interface/api/userInterface.ts";

class AvatarForm extends Block<
  AvatarFormPropsInterface,
  AvatarFormChildrenInterface
> {
  constructor(props: AvatarFormPropsInterface & AvatarFormChildrenInterface) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const form: HTMLFormElement | null =
            document.querySelector("#uploadPhoto");

          if (form) {
            const formData = new FormData(form);
            const formObject: ChangeAvatarRequestInterface = Object.fromEntries(
              formData.entries(),
            ) as unknown as ChangeAvatarRequestInterface;

            if (props.formSubmit) {
              props.formSubmit(formObject);
            }
          }
        },
      },
    });
  }

  render() {
    return `
    <form id="uploadPhoto">
        <div class="uploadAvatar__input">
            {{#if fileName}}
                <span>{{fileName}}</span>
            {{else}}
               <label for="upload-photo">Choose a file on your computer</label>
            {{/if}}
           
            {{{ uploadFileInput }}}
           
        </div>

        <div>
         {{{changeButton}}}
        </div>
    </form>
    `;
  }
}

export default AvatarForm;
