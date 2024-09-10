import Block from "../../../../core/block.ts";
import FormAction from "../../../chatHeader/components/formAction.ts";
import { Input } from "../../../input";
import { validationFunctionForField } from "../../../../shared/validation/validationFunction.ts";
import { loginValidation } from "../../../../shared/validation/validation.ts";
import { Button } from "../../../button";

class AddChatModal extends Block {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const titleInput = new Input({
      name: "title",
      placeholder: "Title",
    });
    const addButton = new Button({ text: "Add" });

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

  formSubmit(data) {
    console.log();
  }

  render() {
    return `
        <div>
             <h3>Add chat</h3>
    
            {{{ formAction }}}
        </div>
    `;
  }
}

export default AddChatModal;
