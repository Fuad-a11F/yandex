import Block from "../../core/block.ts";
import { ChatHeader, ChatSearch } from "../../components";
import { chats, messages } from "../../mockData.ts";
import MessageForm from "../../components/messageForm/messageForm.ts";

class Chat extends Block {
  constructor(props) {
    super({ ...props });
  }

  init() {
    const chatSearch = new ChatSearch();
    const chatHeader = new ChatHeader();
    const messageForm = new MessageForm();

    this.setProps({
      ...this.props,
      chats,
      messages,
    });

    this.children = {
      ...this.children,
      chatSearch,
      chatHeader,
      messageForm,
    };
  }

  render() {
    return `
    <main class="chat">
        <aside class="chat__items">
            {{{ chatSearch }}}
    
            {{#each chats as |chat|}}
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
            {{/each}}
        </aside>
        
        {{#if isEmpty}}
            <div class="chat__messages_empty">
                Select a chat to send a message
            </div>
        {{else}}
            <div class="chat__messages">
                <div>
                    {{{chatHeader}}}
                </div>
    
                <div class="chat__messages_zone">
                    {{#each messages as |message|}}
                        <div class="chat__date">{{message.date}}</div>
    
                        <div class="chat__messages_wrapper">
                            {{#each message.messages as |messageItem|}}
                                <div class="chat__message_{{#if messageItem.ownMessage}}own{{/if}}{{#if messageItem.guestMessage}}guest{{/if}}">{{messageItem.text}}</div>
                            {{/each}}
                        </div>
                    {{/each}}
                </div>
    
    
                <div>
                    {{{ messageForm }}}
                </div>
            </div>
        {{/if}}
    </main>
        `;
  }
}

export default Chat;
