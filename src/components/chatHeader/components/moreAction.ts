import Block from "../../../core/block.ts";
import { MoreActionInterface } from "../../../interface/components/chatHeaderPropsInterface.ts";

class MoreAction extends Block<MoreActionInterface> {
  constructor(props: MoreActionInterface) {
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
