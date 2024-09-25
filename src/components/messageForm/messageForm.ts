import Block from "../../core/block.ts";
import { AddFiles, MessageInput } from "./index.ts";
import { Dropdown } from "../dropdown";
import {
  MessageFormChildrenInterface,
  MessageFormPropsInterface,
  MessageInterface,
} from "../../interface/components/messageFormPropsInterface.ts";
import DropdownActions from "./components/dropdownActions.ts";

class MessageForm extends Block<
  MessageFormPropsInterface,
  MessageFormChildrenInterface
> {
  init() {
    const onAddFiles = this.onAddFiles.bind(this);

    const addFiles = new AddFiles({ onAddFiles });
    const messageInput = new MessageInput({});
    const dropdown = new Dropdown({
      dropdownBody: new DropdownActions({}),
    });

    this.setProps({
      ...this.props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const form: HTMLFormElement | null = document.querySelector("#chat");

          if (form) {
            const formData = new FormData(form);
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

    window.socket.send(
      JSON.stringify({
        content: data.message,
        type: "message",
      }),
    );

    const form: HTMLFormElement | null = document.querySelector("#chat");

    if (form) {
      form.reset();
    }
  }

  render() {
    return `
    <form id="chat">
      <div class="messageForm">
          {{{ dropdown }}}
  
          {{{ addFiles }}}
  
          {{{ messageInput }}} 
  
          <div id="send-message" class="messageForm__send">
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
