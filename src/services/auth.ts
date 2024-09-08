import { LoginInterface } from "../interface/auth/loginInterface.ts";
import AuthApi from "../api/authApi.ts";
import { RegistrationInterface } from "../interface/auth/registrationInterface.ts";

const authApi = new AuthApi();

export const signIn = async (data: LoginInterface) => {
  await authApi.signIn(data);
};

export const signUIn = async (data: RegistrationInterface) => {
  await authApi.signUp(data);
};

export const getMe = async () => {
  await authApi.me();
};

export const logout = async () => {
  await authApi.logout();
};
