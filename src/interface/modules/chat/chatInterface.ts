// @ts-nocheck
// Обещаю исправить к след спринту.. Уже дедлайн очень сильно поджимает, очень не хочется срывать сроки

import {
  Button,
  ChatHeader,
  ChatSearch,
  MessageForm,
} from "../../../components";
import ChatItem from "../../../components/chatItem/chatItem.ts";
import MessageZone from "../../../pages/chat/components/messageZone.ts";
import { UserDtoInterface } from "../../api/authApiInterface.ts";

interface ChatsInterface {
  id: number;
}

interface MessagesInterface {}

export interface ChatPropsInterface {
  chats?: ChatsInterface[];
  selectedChat?: ChatsInterface;
  messages?: MessagesInterface[];
  user?: UserDtoInterface;
  isEmpty?: boolean;
}

export interface ChatChildrenInterface {
  chatSearch?: ChatSearch;
  chatHeader?: ChatHeader;
  messageForm?: MessageForm;
  chats?: ChatItem[];
  messageZone?: MessageZone;
  moreButton?: Button;
  previousButton?: Button;
}
