import Block from "../../core/block.ts";

class ChatItem extends Block {
  constructor(props) {
    super({ ...props });
  }

  render() {
    return `
      <div class="chatItem {{#if isActive}}chatItem__active{{/if}}">
        <div class="chatItem__image">
            <img src="{{avatar}}" alt="avatar">
        </div>
    
        <div class="chatItem__info">
            <div class="chatItem__row">
                <div class="chatItem__name">{{name}}</div>
                <div class="chatItem__time">{{time}}</div>
            </div>
    
            {{#if isYourMessage}}
                <div class="chatItem__message"><span>Вы: </span>{{lastMessage}}</div>
            {{else}}
                <div class="chatItem__message">{{lastMessage}}</div>
            {{/if}}
        </div>
    
        {{#if countNewMessages}}
            <div class="chatItem__new-message">
                {{countNewMessages}}
            </div>
        {{/if}}
    
    </div>

  `;
  }
}

export default ChatItem;
