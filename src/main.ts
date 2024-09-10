import Handlebars, { Template } from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";
import { Store } from "./core/store.ts";
import { StoreDefaultValueInterface } from "./interface/storeInterface.ts";
import { getUser } from "./services/auth.ts";
import { getAllChats } from "./services/chat.ts";

declare global {
  interface Window {
    store: Store<StoreDefaultValueInterface>;
    router: Router;
  }
}

const router = new Router("#app");
window.router = router;

window.store = new Store<StoreDefaultValueInterface>({
  user: null,
  errorAuth: null,
  isLoadingAuth: false,

  chats: [],
  selectedChat: null,
});

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as unknown as Template);
});

Handlebars.registerHelper(
  "ifLogicOr",
  function (this: unknown, v1: string, v2: string, options) {
    if (v1 || v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
);

document.addEventListener("DOMContentLoaded", async () => {
  let user = null;
  try {
    user = await getUser();
  } catch (error) {
    window.router.go("/sign-in");
    return;
  }
  window.store.set({ user });
});

router
  .use("/", Pages.Main)
  .use("/sign-in", Pages.Login)
  .use("/sign-up", Pages.Registration)
  .use("/messenger", Pages.Chat)
  .use("/server-error", Pages.Page500)
  .use("/settings", Pages.Profile)
  .use("*", Pages.Page404)
  .start();
