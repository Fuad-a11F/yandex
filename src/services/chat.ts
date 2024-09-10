import ChatApi from "../api/chatApi.ts";
import {
  AddNewChatRequestInterface,
  AddUserToChatRequestInterface,
  DeleteUserToChatRequestInterface,
  ChatsRequestInterface,
} from "../interface/api/chatInterface.ts";

const chatApi = new ChatApi();

export const getAllChats = async (data: ChatsRequestInterface) => {
  try {
    const response = await chatApi.getAllChats(data);

    if (!("reason" in response)) {
      window.store.set({ chats: response });
    }
  } catch (e) {
    console.error(e);
  }
};

export const addNewChat = async (data: AddNewChatRequestInterface) => {
  await chatApi.addNewChat(data);
};

export const addUserToChat = async (data: AddUserToChatRequestInterface) => {
  const response = await chatApi.addUserToChat(data);
  console.log(response);
};

export const deleteUserFromChat = async (
  data: DeleteUserToChatRequestInterface,
) => {
  await chatApi.deleteUserFromChat(data);
};
