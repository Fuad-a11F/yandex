import Block from "../../../core/block.ts";
import { Input } from "../../input";
import { Button } from "../../button";
import { loginValidation } from "../../../shared/validation/validation.ts";
import FormAction from "./formAction.ts";
import { validationFunctionForField } from "../../../shared/validation/validationFunction.ts";
import {
  FormDataInterface,
  ModalUserModalInterface,
} from "../../../interface/components/chatHeaderInterface.ts";

class ModalAddUserModal extends Block<ModalUserModalInterface> {
  init() {
    const formSubmit = this.formSubmit.bind(this);

    const loginInput = new Input({
      name: "login",
      placeholder: "Login",
      onBlur: (value: string) =>
        validationFunctionForField(
          loginValidation,
          value,
          this.children.loginInput,
          "Login is wrong",
        ),
    });
    const addButton = new Button({ text: "Add" });

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

  formSubmit(data: FormDataInterface) {
    if (!loginValidation(data.login)) {
      this.children.loginInput.setProps({
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
            <h3>Add user</h3>
    
            {{{ formAction }}}
        </div>`;
  }
}

export default ModalAddUserModal;
