import HTTPTransport from "./api.ts";
import {
  AddNewChatRequestInterface,
  AddNewChatResponseInterface,
  AddUserToChatRequestInterface,
  ApiError,
  DeleteUserToChatRequestInterface,
  ChatsRequestInterface,
  ChatsResponseInterface,
  DeleteChatRequestInterface,
} from "../interface/api/chatInterface.ts";
import { UserDtoInterface } from "../interface/api/authApiInterface.ts";

const chatApi = new HTTPTransport("chats");

export default class ChatApi {
  getAllChats(
    data: ChatsRequestInterface,
  ): Promise<ChatsResponseInterface[]> | void {
    try {
      return chatApi.get<ChatsResponseInterface[], ChatsRequestInterface>("", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  addNewChat(
    data: AddNewChatRequestInterface,
  ): Promise<AddNewChatResponseInterface | ApiError> | void {
    try {
      return chatApi.post<
        AddNewChatResponseInterface | ApiError,
        AddNewChatRequestInterface
      >("", { data });
    } catch (e) {
      console.error(e);
    }
  }

  getChatToken(id: number): Promise<{ token: string } | ApiError> | void {
    try {
      return chatApi.post<{ token: string } | ApiError, number>(
        `token/${id}`,
        {},
      );
    } catch (e) {
      console.error(e);
    }
  }
  getAllUsersInChat(chatId: number): Promise<UserDtoInterface[]> | void {
    try {
      return chatApi.get<UserDtoInterface[], number>(`${chatId}/users`, {});
    } catch (e) {
      console.error(e);
    }
  }

  addUserToChat(
    data: AddUserToChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.put<ApiError, AddUserToChatRequestInterface>("users", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  deleteUserFromChat(
    data: DeleteUserToChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.delete<ApiError, DeleteUserToChatRequestInterface>(
        "users",
        { data },
      );
    } catch (e) {
      console.error(e);
    }
  }

  deleteChat(
    data: DeleteChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.delete<ApiError, DeleteChatRequestInterface>("", { data });
    } catch (e) {
      console.error(e);
    }
  }

  changeChatAvatar(data: FormData): Promise<void | ApiError> | void {
    try {
      return chatApi.put<ApiError, FormData>("avatar", { data, headers: {} });
    } catch (e) {
      console.error(e);
    }
  }
}
