import Block from "../../../core/block.ts";
import { Input } from "../../input";
import { Button } from "../../button";
import { loginValidation } from "../../../shared/validation/validation.ts";
import FormAction from "./formAction.ts";
import { validationFunctionForField } from "../../../shared/validation/validationFunction.ts";
import {
  FormDataInterface,
  ModalUserModalChildrenInterface,
  ModalUserModalPropsInterface,
} from "../../../interface/components/chatHeaderPropsInterface.ts";

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
          this.children.formAction.children.input,
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

  formSubmit(data: FormDataInterface) {
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

    console.log(data);
  }

  render() {
    return `<div class="modal__actionUser">
        <h3>Remove user</h3>

      {{{ formAction }}}
    </div>`;
  }
}

export default ModalRemoveUserModal;
