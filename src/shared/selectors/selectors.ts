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
}) => ({
  isLoadingAuth,
  errorAuth,
});

export const getChatsData = ({
  chats,
  selectedChat,
}: {
  chats: ChatPropsInterface[];
  selectedChat: ChatPropsInterface;
}) => ({
  chats,
  selectedChat,
});
