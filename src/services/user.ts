import UserApi from "../api/userApi.ts";
import {
  ChangeAvatarRequestInterface,
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
} from "../interface/api/userInterface.ts";

const userApi = new UserApi();

export const changeProfile = async (data: ChangeProfileRequestInterface) => {
  await userApi.changeProfile(data);
};

export const changeAvatar = async (data: ChangeAvatarRequestInterface) => {
  await userApi.changeAvatar(data);
};

export const changePassword = async (data: ChangePasswordRequestInterface) => {
  await userApi.changePassword(data);
};

export const searchUser = async (data: SearchUserRequestInterface) => {
  await userApi.searchUser(data);
};
