import Block from "../../../core/block.ts";
import { BackButtonPropsInterface } from "../../../interface/modules/profile/profilePropsInterface.ts";

class BackButton extends Block<BackButtonPropsInterface> {
  constructor(props: BackButtonPropsInterface) {
    super({ ...props, events: { click: props.navigateBack } });
  }

  render() {
    return `
        <button><img src="./icons/buttonArrow.svg" alt="back"></button>
    `;
  }
}

export default BackButton;
