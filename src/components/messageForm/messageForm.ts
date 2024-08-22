import Block from "../../core/block.ts";
import AddFiles from "./components/addFiles.ts";
import MessageInput from "./components/messageInput.ts";

class MessageForm extends Block {
  init() {
    const onAddFiles = this.onAddFiles.bind(this);
    const formSubmit = this.formSubmit.bind(this);

    const addFiles = new AddFiles({ onAddFiles });
    const messageInput = new MessageInput();

    this.setProps({ ...this.props, events: { submit: formSubmit } });

    this.children = {
      ...this.children,
      addFiles,
      messageInput,
    };
  }

  onAddFiles() {
    this.setProps({ isVisible: !this.props.isVisible });
  }

  formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector("#chat"));
    const formObject = Object.fromEntries(formData.entries());

    if (formObject.message === "") return;

    console.log(formObject);
  }

  render() {
    return `
    <form id="chat">
    <div class="messageForm">
        {{#> Dropdown isVisible=isVisible bottom=45 left=5}}
            <div class="messageForm__actions">
                <div>
                    <img src="./icons/photo.svg" alt="photo and video"><p>Фото или Видео</p>
                </div>

                <div>
                    <img src="./icons/file.svg" alt="file"><p>Файл</p>
                </div>

                <div>
                    <img src="./icons/location.svg" alt="location"><p>Локация</p>
                </div>
            </div>
        {{/Dropdown}}

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
