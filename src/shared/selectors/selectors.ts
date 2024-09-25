import { UserDtoInterface } from "../../interface/api/authApiInterface.ts";
import { ChatPropsInterface } from "../../interface/modules/chat/chatInterface.ts";
import { MessagesInterface } from "../../interface/api/messagesInterface.ts";

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
  messages: MessagesInterface[];
}) => ({
  chats,
  selectedChat,
  user,
  messages,
});

export const getSelectedChatData = ({
  selectedChat,
}: {
  selectedChat: ChatPropsInterface;
}) => ({
  selectedChat,
});
