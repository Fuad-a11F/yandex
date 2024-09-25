import UserApi from "../api/userApi.ts";
import {
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
  SearchUserResponseInterface,
} from "../interface/api/userInterface.ts";

const userApi = new UserApi();

export const changeProfile = async (data: ChangeProfileRequestInterface) => {
  try {
    const response = await userApi.changeProfile(data);

    if (!response) return;

    if (!("reason" in response)) {
      window.store.set({ user: response });
    }
  } catch (e) {
    console.error(e);
  }
};

export const changeAvatar = async (data: FormData) => {
  try {
    const response = await userApi.changeAvatar(data);

    if (!response) return;

    if (!("reason" in response)) {
      window.store.set({ user: response });
    }
  } catch (e) {
    console.error(e);
  }
};

export const changePassword = async (data: ChangePasswordRequestInterface) => {
  try {
    await userApi.changePassword(data);
  } catch (e) {
    console.error(e);
  }
};

export const searchUser = async (
  data: SearchUserRequestInterface,
): Promise<SearchUserResponseInterface[] | undefined> => {
  try {
    const response = await userApi.searchUser(data);

    if (!response) return;

    if (!("reason" in response)) {
      return response;
    }
  } catch (e) {
    console.error(e);
  }
};
