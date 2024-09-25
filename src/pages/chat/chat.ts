// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Block from "../../core/block.ts";
import { Button, ChatHeader, ChatSearch, MessageForm } from "../../components";
import { messages } from "../../mockData.ts";
import ChatItem from "../../components/chatItem/chatItem.ts";
import {
  ChatChildrenInterface,
  ChatPropsInterface,
  ChatsInterface,
} from "../../interface/modules/chat/chatInterface.ts";
import { getAllChats } from "../../services/chat.ts";
import { connect } from "../../shared/connect.ts";
import {
  getChatsData,
  getSelectedChatData,
} from "../../shared/selectors/selectors.ts";
import webSocketTransport from "../../api/websocket.ts";
import MessageZone from "./components/messageZone.ts";

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
    if (this.props.selectedChat !== oldProps.selectedChat) {
      webSocketTransport(this.props.selectedChat!.id, this.props.user!);

      return true;
    }

    if (this.props.messages !== oldProps.messages) {
      this.children?.messageZone?.setProps({
        ...this.props,
        messages: this.props.messages,
      });

      return false;
    }

    const setActiveChat = this.setActiveChat.bind(this);

    this.children = {
      ...this.children,
      chats:
        this.props.chats?.map(
          (item) =>
            new (connect(
              ({ selectedChat }: { selectedChat: ChatsInterface }) => ({
                selectedChat,
              }),
            )(ChatItem))({ ...item, setActiveChat }),
        ) || [],
    };

    return super.componentDidUpdate(oldProps, newProps);
  }

  setActiveChat(data: ChatPropsInterface) {
    window.store.set({ selectedChat: data });
  }

  init() {
    const chatSearch = new ChatSearch({});
    const chatHeader = new (connect(getSelectedChatData)(ChatHeader))({});
    const messageForm = new MessageForm({});
    const messageZone = new (connect(getChatsData)(MessageZone))({});
    const getMoreChat = this.getMoreChat.bind(this);
    const getPreviousChat = this.getPreviousChat.bind(this);

    const moreButton = new Button({ text: "More", onClick: getMoreChat });
    const previousButton = new Button({
      text: "Previous",
      onClick: getPreviousChat,
    });

    this.setProps({
      ...this.props,
      messages,
    });

    this.children = {
      ...this.children,
      chatSearch,
      chatHeader,
      messageForm,
      messageZone,
      moreButton,
      previousButton,
    };
  }

  async getMoreChat() {
    await getAllChats({
      offset: Math.ceil(this.props.chats?.length / 10) * 10,
    });
  }
  async getPreviousChat() {
    await getAllChats({
      offset: Math.floor(Math.ceil(this.props.chats?.length / 10) / 10),
    });
  }

  render() {
    return `
    <main class="chat">
        <aside class="chat__items">
            {{{ chatSearch }}}
    
            <div class="chat__items_wrapper">
              {{#ifNot chats.length}}
                <span>Chats not found</span>
              {{/ifNot}}
              
              {{#each chats as |chat|}}
                 {{{chat}}}
              {{/each}}
            </div>
            
            <div class="chat__items_button-more">
              {{{ previousButton }}}
              {{{ moreButton }}}
            </div>
        </aside>
        
        {{#if selectedChat}}
            <div class="chat__messages">
                <div>
                    {{{chatHeader}}}
                </div>
    
                {{{ messageZone }}}
    
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
