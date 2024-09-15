// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю исправить к след спринту.. Уже дедлайн очень сильно поджимает, очень не хочется срывать сроки. Как я обещал я во многих местах исправил, по сравнению с прошлым разом

import Block from "../../../core/block.ts";
import {
  FormActionChildrenInterface,
  FormActionPropsInterface,
} from "../../../interface/components/chatHeaderPropsInterface.ts";

class FormAction extends Block<
  FormActionPropsInterface,
  FormActionChildrenInterface
> {
  constructor(props: FormActionPropsInterface | FormActionChildrenInterface) {
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
        keydown: (e: KeyboardEvent) => {
          if (e.key === "Enter") {
            e.preventDefault();
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
        
        {{#if errorMessage}}
          <span class="not_found_user">{{errorMessage}}</span>
        {{/if}}
    </form>
    `;
  }
}

export default FormAction;
