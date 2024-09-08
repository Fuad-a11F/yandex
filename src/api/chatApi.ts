import HTTPTransport from "./api.ts";
import {
  AddNewChatRequestInterface,
  AddNewChatResponseInterface,
  AddUserToChatRequestInterface,
  ApiError,
  DeleteUserToChatRequestInterface,
  GetAllChatsRequestInterface,
  GetAllChatsResponseInterface,
} from "../interface/api/chatInterface.ts";

const chatApi = new HTTPTransport("chats");

export default class ChatApi {
  getAllChats(
    data: GetAllChatsRequestInterface,
  ): Promise<GetAllChatsResponseInterface[]> {
    return chatApi.get<GetAllChatsResponseInterface[]>("", { data });
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
