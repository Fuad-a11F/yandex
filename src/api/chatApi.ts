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

const chatApi = new HTTPTransport("chats");

export default class ChatApi {
  getAllChats(
    data: ChatsRequestInterface,
  ): Promise<ChatsResponseInterface[]> | void {
    try {
      return chatApi.get<ChatsResponseInterface[]>("", { data });
    } catch (e) {
      console.error(e);
    }
  }

  addNewChat(
    data: AddNewChatRequestInterface,
  ): Promise<AddNewChatResponseInterface | ApiError> | void {
    try {
      return chatApi.post<AddNewChatResponseInterface | ApiError>("", { data });
    } catch (e) {
      console.error(e);
    }
  }

  getChatToken(id: number): Promise<{ token: string } | ApiError> | void {
    try {
      return chatApi.post<{ token: string } | ApiError>(`token/${id}`, {});
    } catch (e) {
      console.error(e);
    }
  }

  addUserToChat(
    data: AddUserToChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.put<ApiError>("users", { data });
    } catch (e) {
      console.error(e);
    }
  }

  deleteUserFromChat(
    data: DeleteUserToChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.delete<ApiError>("users", { data });
    } catch (e) {
      console.error(e);
    }
  }

  deleteChat(
    data: DeleteChatRequestInterface,
  ): Promise<void | ApiError> | void {
    try {
      return chatApi.delete<ApiError>("", { data });
    } catch (e) {
      console.error(e);
    }
  }
}
