import Block from "../../../core/block.ts";

class AvatarForm extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(document.querySelector("#uploadPhoto"));
          const formObject = Object.fromEntries(formData.entries());

          props.formSubmit(formObject);
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
