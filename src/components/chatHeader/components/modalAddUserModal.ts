import Block from "../../../core/block.ts";
import { Input } from "../../input";
import { Button } from "../../button";
import { loginValidation } from "../../../shared/validation/validation.ts";
import FormAction from "./formAction.ts";
import {
  FormDataInterface,
  ModalUserModalChildrenInterface,
  ModalUserModalPropsInterface,
} from "../../../interface/components/chatHeaderPropsInterface.ts";
import { addUserToChat } from "../../../services/chat.ts";
import { searchUser } from "../../../services/user.ts";
import { validationFunctionForField } from "../../../shared/validation/validationFunction.ts";

class ModalAddUserModal extends Block<
  ModalUserModalPropsInterface,
  ModalUserModalChildrenInterface
> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const loginInput = new Input({
      name: "login",
      placeholder: "Login",
      onBlur: (value: string) =>
        validationFunctionForField(
          loginValidation,
          value,
          this.children.formAction,
          "Login is wrong",
        ),
    });
    const addButton = new Button({ text: "Add", type: "submit" });

    const formAction = new FormAction({
      input: loginInput,
      button: addButton,
      formSubmit,
      formId: "addForm",
    });

    this.children = {
      ...this.children,
      formAction,
    };
  }

  async formSubmit(data: FormDataInterface) {
    if (!loginValidation(data.login)) {
      this.children.formAction.children.input.setProps({
        isError: true,
        errorMessage: "Login is wrong",
      });

      return;
    }
    this.children.formAction.children.input.setProps({
      isError: false,
      errorMessage: null,
    });

    const isCheckUser = await searchUser(data);

    if (!isCheckUser) return;

    if (isCheckUser.length === 0 || isCheckUser[0].login !== data.login) {
      this.children.formAction.setProps({ errorMessage: "User not found" });

      return;
    }

    await addUserToChat({
      users: [isCheckUser[0].id],
      chatId: this.props.selectedChat!.id,
    });

    this.props.closeModal("modalAddUser");
  }

  render() {
    return `
      <div class="modal__actionUser">
        <h3>Add user</h3>

        {{{ formAction }}}
      </div>
  `;
  }
}

export default ModalAddUserModal;
