import Block from "../../../core/block.ts";
import { Button } from "../../button";

class AvatarModal extends Block {
  init() {
    const changeButton = new Button({ text: "Change" });

    this.children = {
      ...this.children,
      changeButton,
    };
  }

  render() {
    return `
        <div class="uploadAvatar__modal">
            <h3>Upload file</h3>
    
            <form>
                <div class="uploadAvatar__input">
                    <label for="upload-photo">Choose a file on your computer</label>
                    <input id="upload-photo" type="file" name="avatar">
                </div>
    
                <div>
                 {{{changeButton}}}
                </div>
            </form>
    
            {{#if isError}}<p>You need choose a file</p>{{/if}}
        </div>
    `;
  }
}

export default AvatarModal;
