import Block from "../../core/block.ts";
import {
  ModalChildrenInterface,
  ModalPropsInterface,
} from "../../interface/components/modalInterface.ts";

class Modal extends Block<ModalPropsInterface, ModalChildrenInterface> {
  constructor(props: ModalPropsInterface | ModalChildrenInterface) {
    super({
      ...props,
      events: {
        click: (e: MouseEvent) => {
          if ((e.target as HTMLElement).className.includes("modal__active")) {
            this.setProps({ isVisible: false });
          }
        },
      },
    });
  }

  render() {
    return `
        <div class="modal {{#if isVisible}}modal__active{{/if}}">
            <div class="modal__content">
                {{{ ModalBody }}}
            </div>
        </div>
`;
  }
}

export default Modal;
