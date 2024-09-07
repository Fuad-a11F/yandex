import HTTPTransport from "./api.ts";
import {
  ApiError,
  LoginRequestInterface,
  RegistrationRequestInterface,
  RegistrationResponseInterface,
  UserResponseInterface,
} from "../interface/api/authApiInterface.ts";

const authApi = new HTTPTransport("auth");

export default class AuthApi {
  async signUp(
    data: RegistrationRequestInterface,
  ): Promise<RegistrationResponseInterface> {
    return authApi.post<RegistrationResponseInterface>("signup", {
      data,
    });
  }

  async signIn(data: LoginRequestInterface): Promise<void | ApiError> {
    return authApi.post<ApiError>("signin", {
      data,
    });
  }

  async me(): Promise<UserResponseInterface> {
    return authApi.get<UserResponseInterface>("user");
  }

  async logout(): Promise<void | ApiError> {
    return authApi.post<ApiError>("logout");
  }
}
