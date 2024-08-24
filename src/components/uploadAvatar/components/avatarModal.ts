// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "../../../core/block.ts";
import { Button } from "../../button";
import UploadFileInput from "./uploadFileInput.ts";
import AvatarForm from "./avatarForm.ts";

class AvatarModal extends Block {
  constructor(props) {
    super({ ...props, fileName: null });
  }

  init() {
    const setFile = this.setFile.bind(this);
    const formSubmit = this.formSubmit.bind(this);

    const changeButton = new Button({ text: "Change" });
    const uploadFileInput = new UploadFileInput({ setFile });
    const avatarForm = new AvatarForm({
      uploadFileInput,
      changeButton,
      formSubmit,
    });

    this.children = {
      ...this.children,
      avatarForm,
    };
  }

  setFile(e) {
    this.children.avatarForm.setProps({ fileName: e.target.files[0].name });
  }

  formSubmit(data: { avatar: File }) {
    if (!data.avatar.name) {
      this.setProps({ isError: true });
      return;
    }

    this.setProps({ isError: false });

    console.log(data);
  }

  render() {
    return `
        <div class="uploadAvatar__modal">
            <h3>Upload file</h3>
    
            {{{avatarForm}}}
    
            {{#if isError}}<p>You need choose a file</p>{{/if}}
        </div>
    `;
  }
}

export default AvatarModal;
