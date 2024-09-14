import {
  ChatPropsInterface,
  ChatsInterface,
} from "../modules/chat/chatInterface.ts";

export interface ChatItemInterface {
  setActiveChat?: (data: ChatPropsInterface) => void;
  selectedChat?: ChatsInterface;
  id?: number;
  isActive?: boolean;
  events?: { click?: () => void };
}
