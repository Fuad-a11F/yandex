import Block from "../../core/block.ts";
import { ChatHeader, ChatSearch, MessageForm } from "../../components";
import { messages } from "../../mockData.ts";
import ChatItem from "../../components/chatItem/chatItem.ts";
import {
  ChatChildrenInterface,
  ChatPropsInterface,
} from "../../interface/modules/chat/chatInterface.ts";
import { getAllChats } from "../../services/chat.ts";
import { connect } from "../../shared/connect.ts";
import { getChatsData } from "../../shared/selectors/selectors.ts";

class Chat extends Block<ChatPropsInterface, ChatChildrenInterface> {
  constructor(props: ChatPropsInterface & ChatChildrenInterface) {
    super({ ...props });
  }

  async componentDidMount() {
    super.componentDidMount();

    await getAllChats({});
  }

  componentDidUpdate(
    oldProps: ChatPropsInterface,
    newProps: ChatPropsInterface,
  ): boolean {
    const setActiveChat = this.setActiveChat.bind(this);

    this.children = {
      ...this.children,
      chats:
        this.props.chats?.map(
          (item) => new ChatItem({ ...item, setActiveChat }),
        ) || [],
    };

    return super.componentDidUpdate(oldProps, newProps);
  }

  setActiveChat(data: ChatPropsInterface) {
    window.store.set({ selectedChat: data });
  }

  init() {
    const chatSearch = new ChatSearch({});
    const chatHeader = new ChatHeader({});
    const messageForm = new MessageForm({});

    this.setProps({
      ...this.props,
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
               {{{chat}}}
            {{/each}}
        </aside>
        
        {{#if selectedChat}}
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
        {{else}}
             <div class="chat__messages_empty">
                Select a chat to send a message
             </div>
        {{/if}}
    </main>
        `;
  }
}

export default connect(getChatsData)(Chat);
