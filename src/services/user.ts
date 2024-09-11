import UserApi from "../api/userApi.ts";
import {
  ChangeAvatarRequestInterface,
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
} from "../interface/api/userInterface.ts";

const userApi = new UserApi();

export const changeProfile = async (data: ChangeProfileRequestInterface) => {
  const response = await userApi.changeProfile(data);

  if (!("reason" in response)) {
    window.store.set({ user: response });
  }
};

export const changeAvatar = async (data: FormData) => {
  await userApi.changeAvatar(data);
};

export const changePassword = async (data: ChangePasswordRequestInterface) => {
  await userApi.changePassword(data);
};

export const searchUser = async (data: SearchUserRequestInterface) => {
  await userApi.searchUser(data);
};
