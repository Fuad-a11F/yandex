import Block from "../../core/block.ts";

class Input extends Block {
  constructor(props) {
    super({ ...props });
  }

  render() {
    return `
      <div class="input {{#if isError}}input__error{{/if}}">
        <label for="{{name}}">
            <input id="{{name}}" name="{{name}}" type="{{type}}" value="{{value}}" placeholder="{{placeholder}}">
            {{#if errorMessage}}<span>{{errorMessage}}</span>{{/if}}
        </label>
    </div>

    `;
  }
}

export default Input;
