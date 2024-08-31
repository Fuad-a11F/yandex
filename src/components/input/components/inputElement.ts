import Block from "../../../core/block.ts";
import { InputElementInterface } from "../../../interface/components/inputPropsInterface.ts";

class InputElement extends Block<InputElementInterface> {
  constructor(props: InputElementInterface) {
    super({
      ...props,
      events: {
        blur: (e: FocusEvent) => {
          if (props.onBlur) {
            const target = e.target as HTMLInputElement;
            props.onBlur(target.value);
          }
        },
      },
    });
  }

  render() {
    return `<input id="{{name}}" name="{{name}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">`;
  }
}

export default InputElement;
