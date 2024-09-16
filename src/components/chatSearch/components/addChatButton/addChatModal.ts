import Block from "../../../../core/block.ts";
import FormAction from "../../../chatHeader/components/formAction.ts";
import { Input } from "../../../input";
import { Button } from "../../../button";
import { addNewChat, getAllChats } from "../../../../services/chat.ts";
import { AddNewChatRequestInterface } from "../../../../interface/api/chatInterface.ts";
import {
  AddChatModalChildrenInterface,
  AddChatModalPropsInterface,
} from "../../../../interface/components/chatSearchPropsInterface.ts";

class AddChatModal extends Block<
  AddChatModalPropsInterface,
  AddChatModalChildrenInterface
> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const titleInput = new Input({
      name: "title",
      placeholder: "Title",
    });
    const addButton = new Button({ text: "Add", type: "submit" });

    const formAction = new FormAction({
      input: titleInput,
      button: addButton,
      formId: "addChatForm",
      formSubmit,
    });

    this.children = {
      ...this.children,
      formAction,
    };
  }

  async formSubmit(data: AddNewChatRequestInterface) {
    await addNewChat(data);
    await getAllChats({});
    this.props.addChatCloseButton();
  }

  render() {
    return `
        <div class="modal__actionChat">
             <h3>Add chat</h3>
    
            {{{ formAction }}}
        </div>
    `;
  }
}

export default AddChatModal;
