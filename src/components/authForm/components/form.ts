// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "../../../core/block.ts";

class Form extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(document.querySelector("form"));
          const formObject = Object.fromEntries(formData.entries());

          props.formSubmit(formObject);
        },
      },
    });
  }

  render() {
    return `<form>{{{ formBody }}}</form>`;
  }
}

export default Form;
