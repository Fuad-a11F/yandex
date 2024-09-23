import Block from "../../../../core/block.ts";
import {
  ModalUserModalChildrenInterface,
  ModalUserModalPropsInterface,
} from "../../../../interface/components/chatHeaderPropsInterface.ts";
import { getAllUsersInChat } from "../../../../services/chat.ts";
import User from "./user.ts";
import { connect } from "../../../../shared/connect.ts";
import { getSelectedChatData } from "../../../../shared/selectors/selectors.ts";

class ModalRemoveUserModal extends Block<
  ModalUserModalPropsInterface,
  ModalUserModalChildrenInterface
> {
  componentDidUpdate(
    oldProps: ModalUserModalPropsInterface,
    newProps: ModalUserModalPropsInterface,
  ): boolean {
    if (
      (this.props.selectedChat?.id &&
        oldProps.selectedChat?.id !== newProps.selectedChat?.id) ||
      oldProps.forceUpdate !== newProps.forceUpdate
    ) {
      this.setProps({ isLoading: true });
      const rerender = this.rerender.bind(this);

      getAllUsersInChat(this.props.selectedChat.id).then((result) => {
        if (result) {
          this.children = {
            ...this.children,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            users: result.map(
              (item) =>
                new (connect(getSelectedChatData)(
                  User as typeof Block<object>,
                ))({
                  user: item,
                  rerender,
                }),
            ),
          };
          this.setProps({ isLoading: false });
        }
      });
    }

    return true;
  }

  rerender() {
    this.setProps({ forceUpdate: (this.props.forceUpdate || 1) + 1 });
  }

  render() {
    return `<div class="modal__actionUser">
        <h3>Remove user</h3>
        
        <div class="modal__actionUser_delete">
          {{#each users as |user|}}
            {{{ user }}}
          {{/each}}
        </div>
    </div>`;
  }
}

export default ModalRemoveUserModal;
