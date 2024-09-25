import Block from "../../core/block.ts";
import { ChatItemInterface } from "../../interface/components/chatItemInterface.ts";
import { getResource } from "../../services/resource.ts";

class ChatItem extends Block<ChatItemInterface> {
  constructor(props: ChatItemInterface) {
    super({
      ...props,
      events: {
        click: () => {
          if (props.setActiveChat) {
            props.setActiveChat(props);
          }
        },
      },
    });

    this.setProps({ isActive: props.selectedChat?.id === props.id });
  }

  init() {
    if (this.props.avatar) {
      getResource(this.props.avatar).then((response) => {
        const imageURL = URL.createObjectURL(response as Blob);
        this.setProps({ avatar: imageURL });
      });
    }
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
      
         
              {{#if last_message}}
                 <div class="chatItem__message">{{#ifCheckMessageAuthorByLogin last_message.user}}<span>Вы: </span>{{/ifCheckMessageAuthorByLogin}}{{last_message.content}}</div>
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

export default ChatItem;
