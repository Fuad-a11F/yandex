import HTTPTransport from "./api.ts";
import {
  AddNewChatRequestInterface,
  AddNewChatResponseInterface,
  AddUserToChatRequestInterface,
  ApiError,
  DeleteUserToChatRequestInterface,
  ChatsRequestInterface,
  ChatsResponseInterface,
} from "../interface/api/chatInterface.ts";

const chatApi = new HTTPTransport("chats");

export default class ChatApi {
  getAllChats(data: ChatsRequestInterface): Promise<ChatsResponseInterface[]> {
    return chatApi.get<ChatsResponseInterface[]>("");
  }

  addNewChat(
    data: AddNewChatRequestInterface,
  ): Promise<AddNewChatResponseInterface | ApiError> {
    return chatApi.post<AddNewChatResponseInterface | ApiError>("", { data });
  }

  addUserToChat(data: AddUserToChatRequestInterface): Promise<void | ApiError> {
    return chatApi.put("users", { data });
  }

  deleteUserFromChat(
    data: DeleteUserToChatRequestInterface,
  ): Promise<void | ApiError> {
    return chatApi.delete("users", { data });
  }
}
