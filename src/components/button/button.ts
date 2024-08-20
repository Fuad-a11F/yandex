import Block from "../../core/block.ts";

export class Button extends Block {
  constructor(props) {
    super({ ...props });
  }

  render() {
    return `<button class="button {{#if isLink}}button__inline{{/if}} {{#if isDanger}}button__danger{{/if}}" type="{{type}}">{{text}}</button>`;
  }
}
