import { LoginInterface } from "../interface/auth/loginInterface.ts";
import AuthApi from "../api/authApi.ts";
import { RegistrationInterface } from "../interface/auth/registrationInterface.ts";
import { c } from "vite/dist/node/types.d-aGj9QkWt";

const authApi = new AuthApi();

export const signIn = async (data: LoginInterface) => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.signIn(data);
    if (response && !("reason" in response)) {
      window.store.set({ errorAuth: response.reason.toString() });
    } else {
      localStorage.setItem("auth", "true");
      window.router.go("/messenger");
    }
  } catch (e) {
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};

export const signUn = async (data: RegistrationInterface) => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.signUp(data);
    if (response && !("reason" in response)) {
      window.store.set({ errorAuth: response.reason.toString() });
    } else {
      localStorage.setItem("auth", "true");
      window.router.go("/messenger");
    }
  } catch (e) {
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};

export const getMe = async () => {
  await authApi.me();
};

export const logout = async () => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.logout();

    if (response && !("reason" in response)) {
      window.store.set({ errorAuth: response.reason.toString() });
    } else {
      localStorage.removeItem("auth");
      window.router.go("/sign-in");
    }
  } catch (e) {
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};
