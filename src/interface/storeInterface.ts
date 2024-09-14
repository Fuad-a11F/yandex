import { UserDtoInterface } from "./api/authApiInterface.ts";
import { ChatsResponseInterface } from "./api/chatInterface.ts";
import { MessagesInterface } from "./api/messagesInterface.ts";

export interface StoreDefaultValueInterface {
  user: UserDtoInterface | null;
  isLoadingAuth: boolean;
  errorAuth: string | null;

  chats: ChatsResponseInterface[];
  messages: MessagesInterface[];
  selectedChat: ChatsResponseInterface | null;
}
