// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "../../../core/block.ts";

class MoreAction extends Block {
  constructor(props) {
    super({ ...props, events: { click: props.onClose } });
  }

  render() {
    return `    
    <div class="chatHeader__action">
        <img src="./icons/more.svg" alt="more icon">
    </div>
`;
  }
}

export default MoreAction;
