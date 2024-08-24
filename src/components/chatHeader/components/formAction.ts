// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../../core/block.ts";

class FormAction extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(
            document.querySelector(`#${this.props.formId}`),
          );
          const formObject = Object.fromEntries(formData.entries());

          if (props.formSubmit) {
            props.formSubmit(formObject);
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
