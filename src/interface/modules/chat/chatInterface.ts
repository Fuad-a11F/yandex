import { ChatHeader, ChatSearch, MessageForm } from "../../../components";
import ChatItem from "../../../components/chatItem/chatItem.ts";
import MessageZone from "../../../pages/chat/components/messageZone.ts";

interface ChatsInterface {
  id: number;
}

interface MessagesInterface {}

export interface ChatPropsInterface {
  chats?: ChatsInterface[];
  messages?: MessagesInterface[];
  isEmpty?: boolean;
}

export interface ChatChildrenInterface {
  chatSearch: ChatSearch;
  chatHeader: ChatHeader;
  messageForm: MessageForm;
  chats: ChatItem[];
  messageZone?: MessageZone;
}
