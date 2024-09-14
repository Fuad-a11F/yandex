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
  ): Promise<RegistrationResponseInterface | void> {
    try {
      return authApi.post<RegistrationResponseInterface>("signup", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async signIn(data: LoginRequestInterface): Promise<void | ApiError> {
    try {
      return authApi.post<ApiError>("signin", {
        data,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async me(): Promise<UserResponseInterface | void> {
    try {
      return authApi.get<UserResponseInterface>("user");
    } catch (e) {
      console.error(e);
    }
  }

  async logout(): Promise<void | ApiError> {
    try {
      return authApi.post<ApiError>("logout");
    } catch (e) {
      console.error(e);
    }
  }
}
