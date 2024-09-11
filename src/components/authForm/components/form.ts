import Block from "../../../core/block.ts";
import {
  FormChildrenInterface,
  FormPropsInterface,
} from "../../../interface/components/authFormInterface.ts";

class Form extends Block<FormPropsInterface, FormChildrenInterface> {
  constructor(props: FormPropsInterface & FormChildrenInterface) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(document.querySelector("#signInForm"));
          const formObject = Object.fromEntries(formData.entries());

          props.formSubmit(formObject);
        },
      },
    });
  }

  render() {
    return `<form id="signInForm">{{{ formBody }}}</form>`;
  }
}

export default Form;
