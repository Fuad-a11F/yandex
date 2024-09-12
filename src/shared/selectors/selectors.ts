import { UserDtoInterface } from "../../interface/api/authApiInterface.ts";
import { ChatPropsInterface } from "../../interface/modules/chat/chatInterface.ts";

export const getUser = ({ user }: { user: UserDtoInterface }) => ({
  user,
});

export const getAuthData = ({
  isLoadingAuth,
  errorAuth,
}: {
  isLoadingAuth: boolean;
  errorAuth: string;
  user: string;
}) => ({
  isLoadingAuth,
  errorAuth,
});

export const getChatsData = ({
  chats,
  selectedChat,
  user,
  messages,
}: {
  chats: ChatPropsInterface[];
  selectedChat: ChatPropsInterface;
  user: UserDtoInterface;
  messages: any;
}) => ({
  chats,
  selectedChat,
  user,
  messages,
});
