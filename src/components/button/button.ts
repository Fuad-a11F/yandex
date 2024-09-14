import Block from "../../core/block.ts";
import { ButtonPropsInterface } from "../../interface/components/buttonPropsInterface.ts";

class Button extends Block<ButtonPropsInterface> {
  constructor(props: ButtonPropsInterface) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render() {
    return `<button class="button {{#if isLink}}button__inline{{/if}} {{#if isDanger}}button__danger{{/if}}" type="{{type}}">{{text}}</button>`;
  }
}

export default Button;
