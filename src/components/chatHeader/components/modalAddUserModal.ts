import Block from "../../../core/block.ts";
import { Input } from "../../input";
import { Button } from "../../button";
import { loginValidation } from "../../../shared/validation.ts";
import FormAction from "./formAction.ts";

class ModalAddUserModal extends Block {
  init() {
    const handleBlur = this.handleBlur.bind(this);
    const formSubmit = this.formSubmit.bind(this);

    const loginInput = new Input({
      name: "login",
      placeholder: "Login",
      onBlur: handleBlur,
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
      loginInput,
      addButton,
      formAction,
    };
  }

  formSubmit(data) {
    if (!loginValidation(data.login)) {
      this.children.loginInput.setProps({
        isError: true,
        errorMessage: "Login is wrong",
      });

      return;
    }
    this.children.loginInput.setProps({
      isError: false,
      errorMessage: null,
    });

    console.log(data);
  }

  handleBlur(value) {
    if (!loginValidation(value)) {
      this.children.loginInput.setProps({
        isError: true,
        errorMessage: "Login is wrong",
      });
    } else {
      this.children.loginInput.setProps({
        isError: false,
        errorMessage: null,
      });
    }
  }

  render() {
    return `<div class="modal__actionUser">
            <h3>Add user</h3>
    
            {{{ formAction }}}
        </div>`;
  }
}

export default ModalAddUserModal;
