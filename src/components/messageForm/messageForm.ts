import Block from "../../core/block.ts";
import { AddFiles, MessageInput } from "./index.ts";
import { Dropdown } from "../dropdown";

class MessageForm extends Block {
  init() {
    const onAddFiles = this.onAddFiles.bind(this);

    const addFiles = new AddFiles({ onAddFiles });
    const messageInput = new MessageInput();
    const dropdown = new Dropdown({
      dropdownBody: `<div class="messageForm__actions">
                <div>
                    <img src="./icons/photo.svg" alt="photo and video"><p>Фото или Видео</p>
                </div>

                <div>
                    <img src="./icons/file.svg" alt="file"><p>Файл</p>
                </div>

                <div>
                    <img src="./icons/location.svg" alt="location"><p>Локация</p>
                </div>
            </div>`,
    });

    this.setProps({
      ...this.props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(document.querySelector("#chat"));
          const formObject = Object.fromEntries(formData.entries());

          this.formSubmit(formObject);
        },
      },
    });

    this.children = {
      ...this.children,
      addFiles,
      messageInput,
      dropdown,
    };
  }

  onAddFiles() {
    this.children.dropdown.setProps({
      isVisible: !this.children.dropdown.props.isVisible,
      bottom: 45,
      left: 5,
    });
  }

  formSubmit(data) {
    if (data.message === "") return;

    console.log(data);
  }

  render() {
    return `
    <form id="chat">
    <div class="messageForm">
        {{{ dropdown }}}

        {{{ addFiles }}}

        {{{ messageInput }}} 

        <div class="messageForm__send">
            <button>
                <img src="./icons/buttonArrow.svg" alt="send message" width="32" height="32">
            </button>
        </div>
    </div>
</form>

    `;
  }
}

export default MessageForm;
