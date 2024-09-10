import ChatApi from "../api/chatApi.ts";
import {
  AddNewChatRequestInterface,
  AddUserToChatRequestInterface,
  DeleteUserToChatRequestInterface,
  ChatsRequestInterface,
} from "../interface/api/chatInterface.ts";

const chatApi = new ChatApi();

export const getAllChats = async (data: ChatsRequestInterface) => {
  const response = await chatApi.getAllChats(data);
  console.log(response);
};

export const addNewChar = async (data: AddNewChatRequestInterface) => {
  await chatApi.addNewChat(data);
};

export const addUserToChat = async (data: AddUserToChatRequestInterface) => {
  await chatApi.addUserToChat(data);
};

export const deleteUserFromChat = async (
  data: DeleteUserToChatRequestInterface,
) => {
  await chatApi.deleteUserFromChat(data);
};
