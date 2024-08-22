import Block from "../../core/block.ts";
import { Modal } from "../modal";
import {
  ModalAddUserModal,
  RemoveUser,
  AddUser,
  MoreAction,
  ModalRemoveUserModal,
} from "./index.ts";

class ChatHeader extends Block {
  init() {
    const onClose = this.onClose.bind(this);
    const onAddUser = this.onAddUser.bind(this);
    const onRemoveUser = this.onRemoveUser.bind(this);

    const moreAction = new MoreAction({ onClose });
    const addUser = new AddUser({ onAddUser });
    const removeUser = new RemoveUser({ onRemoveUser });
    const modalAddUser = new Modal({
      ModalBody: new ModalAddUserModal(),
    });
    const modalRemoveUser = new Modal({
      ModalBody: new ModalRemoveUserModal(),
    });

    this.children = {
      ...this.children,
      moreAction,
      addUser,
      removeUser,
      modalAddUser,
      modalRemoveUser,
    };
  }

  onClose() {
    this.setProps({ isVisible: !this.props.isVisible });
  }

  onAddUser() {
    this.children.modalAddUser.setProps({ isVisible: true });
    this.setProps({ isVisible: !this.props.isVisible });
  }

  onRemoveUser() {
    this.children.modalRemoveUser.setProps({ isVisible: true });
    this.setProps({ isVisible: !this.props.isVisible });
  }

  render() {
    return `
    <div>
        <div class="chatHeader">
            <div class="chatHeader__info">
                <div class="chatHeader__avatar"><img src="" alt="avatar"></div>
        
                <p>Вадим</p>
            </div>
            
            <div class="chatHeader__addition">
                {{{ moreAction }}}
          
               {{#> Dropdown isVisible=isVisible top=30 right=0}}
                  <div class="chatHeader__actions">
                      {{{ addUser }}}       
                      
                      {{{ removeUser }}}
                  </div>
              {{/Dropdown}}
            </div>
        </div>
        
        {{{ modalAddUser }}}
        
        {{{ modalRemoveUser }}}        
  </div>
    `;
  }
}

export default ChatHeader;
