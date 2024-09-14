import UserApi from "../api/userApi.ts";
import {
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
  SearchUserResponseInterface,
} from "../interface/api/userInterface.ts";

const userApi = new UserApi();

export const changeProfile = async (data: ChangeProfileRequestInterface) => {
  const response = await userApi.changeProfile(data);

  if (!("reason" in response)) {
    window.store.set({ user: response });
  }
};

export const changeAvatar = async (data: FormData) => {
  const response = await userApi.changeAvatar(data);

  if (!("reason" in response)) {
    window.store.set({ user: response });
  }
};

export const changePassword = async (data: ChangePasswordRequestInterface) => {
  await userApi.changePassword(data);
};

export const searchUser = async (
  data: SearchUserRequestInterface,
): Promise<SearchUserResponseInterface[] | undefined> => {
  const response = await userApi.searchUser(data);

  if (!("reason" in response)) {
    return response;
  }
};
