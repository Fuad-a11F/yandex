import HTTPTransport from "./api.ts";
import {
  ApiError,
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
  SearchUserResponseInterface,
} from "../interface/api/userInterface.ts";

const userApi = new HTTPTransport("user");

export default class UserApi {
  async changeProfile(
    data: ChangeProfileRequestInterface,
  ): Promise<SearchUserResponseInterface | ApiError | void> {
    try {
      return userApi.put<SearchUserResponseInterface | ApiError>("profile", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async changeAvatar(
    data: FormData,
  ): Promise<SearchUserResponseInterface | ApiError | void> {
    try {
      return userApi.put<SearchUserResponseInterface | ApiError>(
        "profile/avatar",
        {
          data,
          headers: {},
        },
      );
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(
    data: ChangePasswordRequestInterface,
  ): Promise<void | ApiError> {
    try {
      return userApi.put<void | ApiError>("password", { data });
    } catch (e) {
      console.error(e);
    }
  }

  async searchUser(
    data: SearchUserRequestInterface,
  ): Promise<SearchUserResponseInterface[] | ApiError | void> {
    try {
      return userApi.post<SearchUserResponseInterface[] | ApiError>("search", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }
}
