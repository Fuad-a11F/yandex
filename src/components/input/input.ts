import Block from "../../core/block.ts";
import InputElement from "./components/inputElement.ts";

class Input extends Block {
  init() {
    const inputElement = new InputElement({ ...this.props });

    this.children = {
      ...this.children,
      inputElement,
    };
  }

  render() {
    return `
      <div class="input {{#if isError}}input__error{{/if}}">
        <label for="{{name}}">
            {{{ inputElement }}}
            {{#if errorMessage}}<span>{{errorMessage}}</span>{{/if}}
        </label>
      </div>
    `;
  }
}

export default Input;
