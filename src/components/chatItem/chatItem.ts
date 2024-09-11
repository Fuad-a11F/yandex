import Block from "../../core/block.ts";
import { connect } from "../../shared/connect.ts";
import { ChatPropsInterface } from "../../interface/modules/chat/chatInterface.ts";

class ChatItem extends Block {
  constructor(props: any) {
    super({ ...props, events: { click: () => props.setActiveChat(props) } });

    this.setProps({ isActive: props.selectedChat?.id === props.id });
  }

  render() {
    return `
      <div class="chatItem {{#if isActive}}chatItem__active{{/if}}">
          {{#if avatar}}
            <div class="chatItem__image">
                <img src="{{avatar}}" alt="avatar">
            </div>
          {{else}}
              <div class="chatItem__image">
                <img src="./vite.svg" alt="avatar">
              </div>
          {{/if}}
      
          <div class="chatItem__info">
              <div class="chatItem__row">
                  <div class="chatItem__name">{{title}}</div>
                  <div class="chatItem__time">{{time}}</div>
              </div>
      
         
              {{#if lastMessage}}
                 <div class="chatItem__message">{{lastMessage}}</div>
              {{else}}
                 <div class="chatItem__message">Пусто</div>
              {{/if}}
          </div>
      
          {{#if unread_count}}
              <div class="chatItem__new-message">
                  {{unread_count}}
              </div>
          {{/if}}
      </div>
      `;
  }
}

export default connect(
  ({ selectedChat }: { selectedChat: ChatPropsInterface }) => ({
    selectedChat,
  }),
)(ChatItem);
