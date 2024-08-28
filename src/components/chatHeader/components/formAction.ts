import Block from "../../../core/block.ts";
import { FormActionInterface } from "../../../interface/components/chatHeaderInterface.ts";

class FormAction extends Block<FormActionInterface> {
  constructor(props: FormActionInterface) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const form = document.querySelector(`#${this.props.formId}`);

          if (form) {
            const formData = new FormData(form as HTMLFormElement);
            const formObject = Object.fromEntries(formData.entries());

            if (props.formSubmit) {
              props.formSubmit(formObject);
            }
          }
        },
      },
    });
  }

  render() {
    return `
    <form id="{{formId}}">
        <div>
            {{{ input }}}
        </div>

        <div>
            {{{ button }}}
        </div>
    </form>
    `;
  }
}

export default FormAction;
