import Block from "../../../../core/block.ts";
import { Button } from "../../../button";
import {
  UserChildrenInterface,
  UserPropsInterface,
} from "../../../../interface/components/chatHeaderPropsInterface.ts";
import { deleteUserFromChat, getAllChats } from "../../../../services/chat.ts";

class User extends Block<UserPropsInterface, UserChildrenInterface> {
  init() {
    const deleteHandler = this.deleteHandler.bind(this);
    const button = new Button({ text: "Delete", onClick: deleteHandler });

    this.children = {
      ...this.children,
      button,
    };
  }

  async deleteHandler() {
    await deleteUserFromChat({
      users: [this.props.user.id],
      chatId: this.props.selectedChat.id,
    });

    await getAllChats({});
    this.props.rerender();
  }

  render() {
    return `
      <div class="chatHeader__choose_delete">
          {{{ user.first_name }}}
  
          {{{ button }}}
      </div>
    `;
  }
}

export default User;
