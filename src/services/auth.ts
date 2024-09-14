import { LoginInterface } from "../interface/auth/loginInterface.ts";
import AuthApi from "../api/authApi.ts";
import { RegistrationInterface } from "../interface/auth/registrationInterface.ts";
import * as Pages from "../pages";

const authApi = new AuthApi();

export const getUser = async () => {
  return await authApi.me();
};

export const signIn = async (data: LoginInterface) => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.signIn(data);

    if (response) {
      window.store.set({ errorAuth: response?.reason?.toString() });
    } else {
      localStorage.setItem("auth", "true");
      const user = await getUser();

      window.router
        .clear()
        .use("/", Pages.Main)
        .use("/messenger", Pages.Chat)
        .use("/server-error", Pages.Page500)
        .use("/settings", Pages.Profile)
        .use("*", Pages.Page404)
        .start();

      window.store.set({ user });
      window.router.go("/messenger");
    }
  } catch (e) {
    console.log(e);
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};

export const signUp = async (data: RegistrationInterface) => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.signUp(data);

    if ("reason" in response) {
      window.store.set({ errorAuth: response.reason.toString() });
    } else {
      localStorage.setItem("auth", "true");
      const user = await getUser();

      window.router
        .clear()
        .use("/", Pages.Main)
        .use("/messenger", Pages.Chat)
        .use("/server-error", Pages.Page500)
        .use("/settings", Pages.Profile)
        .use("*", Pages.Page404)
        .start();

      window.store.set({ user });
      window.router.go("/messenger");
    }
  } catch (e) {
    console.log(e);
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};

export const logout = async () => {
  window.store.set({ isLoadingAuth: true });

  try {
    const response = await authApi.logout();

    if (response) {
      window.store.set({ errorAuth: response.reason.toString() });
    } else {
      localStorage.removeItem("auth");
      window.router.go("/sign-in");
    }
  } catch (e) {
    console.log(e);
    window.store.set({ errorAuth: "Server error" });
  } finally {
    window.store.set({ isLoadingAuth: false });
  }
};
