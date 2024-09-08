import { ChatHeader, ChatSearch, MessageForm } from "../../../components";
import ChatItem from "../../../components/chatItem/chatItem.ts";

interface ChatsInterface {}

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
}
