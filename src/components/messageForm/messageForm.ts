import Block from "../../core/block.ts";
import { AddFiles, MessageInput } from "./index.ts";
import { Dropdown } from "../dropdown";
import {
  MessageFormInterface,
  MessageInterface,
} from "../../interface/components/messageFormInterface.ts";
import DropdownActions from "./components/dropdownActions.ts";

class MessageForm extends Block<MessageFormInterface> {
  init() {
    const onAddFiles = this.onAddFiles.bind(this);

    const addFiles = new AddFiles({ onAddFiles });
    const messageInput = new MessageInput();
    const dropdown = new Dropdown({
      dropdownBody: new DropdownActions(),
    });

    this.setProps({
      ...this.props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const form = document.querySelector("#chat");

          if (form) {
            const formData = new FormData(form as HTMLFormElement);
            const formObject = Object.fromEntries(formData.entries());

            const typedFormObject: MessageInterface = {
              message: formObject.message as string,
            };

            this.formSubmit(typedFormObject);
          }
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
      isVisible: !(this.children.dropdown as Dropdown).props!.isVisible,
      bottom: 45,
      left: 5,
    });
  }

  formSubmit(data: MessageInterface) {
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
