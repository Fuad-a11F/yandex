import Block from "../../core/block.ts";
import { InputElement } from "./index.ts";
import { InputInterface } from "../../interface/components/inputInterface.ts";

class Input extends Block<InputInterface> {
  init() {
    const inputElement = new InputElement({ ...this.props });

    this.children = {
      ...this.children,
      inputElement,
    };
  }

  render() {
    return `
      <div class="input {{#if isError}}input__error{{/if}} {{#if isProfileRow}}input__profile{{/if}}">
        <label for="{{name}}">
            {{{ inputElement }}}
            {{#if errorMessage}}<span>{{errorMessage}}</span>{{/if}}
        </label>
      </div>
    `;
  }
}

export default Input;
