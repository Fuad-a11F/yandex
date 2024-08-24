import Block from "../../../core/block.ts";

class UploadFileInput extends Block {
  constructor(props) {
    super({ ...props, events: { change: props.setFile } });
  }

  render() {
    return `<input id="upload-photo" type="file" name="avatar">`;
  }
}

export default UploadFileInput;
