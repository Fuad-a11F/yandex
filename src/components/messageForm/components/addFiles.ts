import Block from "../../../core/block.ts";
import { AddFilesPropsInterface } from "../../../interface/components/messageFormPropsInterface.ts";

class AddFiles extends Block<AddFilesPropsInterface> {
  constructor(props: AddFilesPropsInterface) {
    super({ ...props, events: { click: props.onAddFiles } });
  }

  render() {
    return `<div class="messageForm__add">
            <img src="./icons/addFiles.svg" alt="add files icon" width="32" height="32">
        </div>`;
  }
}

export default AddFiles;
