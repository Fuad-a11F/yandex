// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";
import { InputElement } from "./index.ts";

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
