import { UserDtoInterface } from "./api/authApiInterface.ts";
import { ChatsResponseInterface } from "./api/chatInterface.ts";

export interface StoreDefaultValueInterface {
  user: UserDtoInterface | null;
  isLoadingAuth: boolean;
  errorAuth: string | null;

  chats: ChatsResponseInterface[];
  messages: any[];
  selectedChat: ChatsResponseInterface | null;
}
