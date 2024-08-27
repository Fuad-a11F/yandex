import Block from "../../core/block.ts";
import { ButtonInterface } from "../../interface/components/buttonInterface.ts";

class Button extends Block<ButtonInterface> {
  constructor(props: ButtonInterface) {
    super({ ...props, events: { click: props.onClick } });
  }

  render() {
    return `<button class="button {{#if isLink}}button__inline{{/if}} {{#if isDanger}}button__danger{{/if}}" type="{{type}}">{{text}}</button>`;
  }
}

export default Button;
