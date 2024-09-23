import Block from "../../../core/block.ts";
import { Button } from "../../button";
import UploadFileInput from "./uploadFileInput.ts";
import AvatarForm from "./avatarForm.ts";
import {
  AvatarModalChildrenInterface,
  AvatarModalPropsInterface,
} from "../../../interface/components/uploadAvatarInterface.ts";

class AvatarModal extends Block<
  AvatarModalPropsInterface,
  AvatarModalChildrenInterface
> {
  constructor(props: AvatarModalPropsInterface) {
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

  setFile(e: KeyboardEvent) {
    this.children.avatarForm.setProps({
      fileName: (e.target as HTMLInputElement).files![0].name,
    });
  }

  async formSubmit(data: { avatar: File }) {
    if (!data.avatar.name) {
      this.setProps({ isError: true });
      return;
    } else {
      this.setProps({ isError: false });
    }

    if (this.props.formSubmitChangeAvatar) {
      this.props.formSubmitChangeAvatar(data);
    }

    if (this.props.handleCloseModal) {
      this.props.handleCloseModal("changeAvatarModal");
    }
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
