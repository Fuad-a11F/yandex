import Block from "../../../core/block.ts";

class AddFiles extends Block {
  constructor(props) {
    super({ ...props, events: { click: props.onAddFiles } });
  }

  render() {
    return `<div class="messageForm__add">
            <img src="./icons/addFiles.svg" alt="add files icon" width="32" height="32">
        </div>`;
  }
}

export default AddFiles;
