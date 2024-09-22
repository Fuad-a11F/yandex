import ChatApi from "../api/chatApi.ts";
import {
  AddNewChatRequestInterface,
  AddUserToChatRequestInterface,
  ChatsRequestInterface,
  DeleteChatRequestInterface,
  DeleteUserToChatRequestInterface,
} from "../interface/api/chatInterface.ts";

const chatApi = new ChatApi();

export const getAllChats = async (data: ChatsRequestInterface) => {
  try {
    const response = await chatApi.getAllChats(data);

    if (!response) return;

    if (!("reason" in response)) {
      window.store.set({
        chats: [...response],
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const getChatToken = async (id: number) => {
  try {
    return await chatApi.getChatToken(id);
  } catch (e) {
    console.error(e);
  }
};

export const addNewChat = async (data: AddNewChatRequestInterface) => {
  try {
    await chatApi.addNewChat(data);
  } catch (e) {
    console.error(e);
  }
};

export const addUserToChat = async (data: AddUserToChatRequestInterface) => {
  try {
    await chatApi.addUserToChat(data);
  } catch (e) {
    console.error(e);
  }
};

export const deleteUserFromChat = async (
  data: DeleteUserToChatRequestInterface,
) => {
  try {
    await chatApi.deleteUserFromChat(data);
  } catch (e) {
    console.error(e);
  }
};

export const deleteChat = async (data: DeleteChatRequestInterface) => {
  try {
    return await chatApi.deleteChat(data);
  } catch (e) {
    console.error(e);
  }
};

export const changeChatAvatar = async (data: FormData) => {
  try {
    return await chatApi.changeChatAvatar(data);
  } catch (e) {
    console.error(e);
  }
};
