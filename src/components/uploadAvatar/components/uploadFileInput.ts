import Block from "../../../core/block.ts";
import { UploadFileInputPropsInterface } from "../../../interface/components/uploadAvatarInterface.ts";

class UploadFileInput extends Block<UploadFileInputPropsInterface> {
  constructor(props: UploadFileInputPropsInterface) {
    super({ ...props, events: { change: props.setFile } });
  }

  render() {
    return `<input id="upload-photo" type="file" name="avatar">`;
  }
}

export default UploadFileInput;
