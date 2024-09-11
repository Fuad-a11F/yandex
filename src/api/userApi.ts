import HTTPTransport from "./api.ts";
import {
  ApiError,
  ChangeAvatarRequestInterface,
  ChangePasswordRequestInterface,
  ChangeProfileRequestInterface,
  SearchUserRequestInterface,
  SearchUserResponseInterface,
} from "../interface/api/userInterface.ts";

const userApi = new HTTPTransport("user");

export default class UserApi {
  async changeProfile(
    data: ChangeProfileRequestInterface,
  ): Promise<SearchUserResponseInterface | ApiError> {
    return userApi.put<SearchUserResponseInterface | ApiError>("profile", {
      data,
    });
  }

  async changeAvatar(
    data: FormData,
  ): Promise<SearchUserResponseInterface | ApiError> {
    return userApi.put<SearchUserResponseInterface | ApiError>(
      "profile/avatar",
      {
        data,
        headers: {},
      },
    );
  }

  async changePassword(
    data: ChangePasswordRequestInterface,
  ): Promise<void | ApiError> {
    return userApi.put<void | ApiError>("password", { data });
  }

  async searchUser(
    data: SearchUserRequestInterface,
  ): Promise<SearchUserResponseInterface[] | ApiError> {
    return userApi.post<SearchUserResponseInterface[] | ApiError>("search", {
      data,
    });
  }
}
