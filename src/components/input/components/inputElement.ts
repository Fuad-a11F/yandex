import Block from "../../../core/block.ts";

class InputElement extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        blur: (e) => {
          if (props.onBlur) {
            props.onBlur(e.target.value);
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
