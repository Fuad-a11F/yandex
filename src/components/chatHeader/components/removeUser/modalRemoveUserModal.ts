import Block from "../../../../core/block.ts";
import { Input } from "../../../input";
import { Button } from "../../../button";
import { loginValidation } from "../../../../shared/validation/validation.ts";
import FormAction from "../formAction.ts";
import {
  FormDataInterface,
  ModalUserModalChildrenInterface,
  ModalUserModalPropsInterface,
} from "../../../../interface/components/chatHeaderPropsInterface.ts";
import { searchUser } from "../../../../services/user.ts";
import { deleteUserFromChat } from "../../../../services/chat.ts";
import { validationFunctionForField } from "../../../../shared/validation/validationFunction.ts";

class ModalRemoveUserModal extends Block<
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
    const removeButton = new Button({ text: "Remove" });

    const formAction = new FormAction({
      input: loginInput,
      button: removeButton,
      formSubmit,
      formId: "removeForm",
    });

    this.children = {
      ...this.children,
      formAction,
    };
  }

  async formSubmit(data: FormDataInterface) {
    // Баг исправлен полностью, все работает корректно. Я предыдущих коммитах просто писал, что не получалось.. Но щяс работает корректно. Благо, не запорол дедлайн...
    // Насчет блока "Можно улучшить" я все понял, к след спринту все сделаю.. Сейчас прсто очень не хочу нарушать(
    const inp: HTMLInputElement | null =
      document.querySelector("#removeForm input");
    inp?.blur();

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

    await deleteUserFromChat({
      users: [isCheckUser[0].id],
      chatId: this.props.selectedChat!.id,
    });

    this.props.closeModal("modalRemoveUser");
  }

  render() {
    return `<div class="modal__actionUser">
        <h3>Remove user</h3>

      {{{ formAction }}}
    </div>`;
  }
}

export default ModalRemoveUserModal;
