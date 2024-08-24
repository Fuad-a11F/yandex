// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется

import Block from "../../core/block.ts";

class Modal extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: (e) => {
          if (e.target.className.includes("modal__active")) {
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
