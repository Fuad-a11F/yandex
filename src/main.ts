import Handlebars, { Template } from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";
import { Store } from "./core/store.ts";
import { StoreDefaultValueInterface } from "./interface/storeInterface.ts";
import { getUser } from "./services/auth.ts";
import { UserDtoInterface } from "./interface/api/authApiInterface.ts";

declare global {
  interface Window {
    store: Store<StoreDefaultValueInterface>;
    router: Router;
    socket: WebSocket;
  }
}

const router = new Router("#app");
window.router = router;

window.store = new Store<StoreDefaultValueInterface>({
  user: null,
  errorAuth: null,
  isLoadingAuth: false,

  chats: [],
  messages: [],
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

Handlebars.registerHelper(
  "ifNot",
  function (this: unknown, v1: unknown, options) {
    if (!v1) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
);

Handlebars.registerHelper("correctFormatDate", function (date: string) {
  if (!date) return;

  return date.split("T")[0];
});

Handlebars.registerHelper(
  "ifCheckMessageAuthor",
  function (this: unknown, messageItem: any, options) {
    const user = window.store.getState().user;

    if (messageItem.user_id === user?.id) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
);

Handlebars.registerHelper(
  "ifCheckMessageAuthorByLogin",
  function (this: unknown, userForCheck: UserDtoInterface, options) {
    const userCurrent = window.store.getState().user;

    if (userForCheck.login === userCurrent?.login) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
);

Handlebars.registerHelper(
  "ifDateIsUnique",
  function (this: unknown, v1: any, v2: any, options) {
    for (let i = 0; i < v1.length; i++) {
      if (v1[i].id === v2.id) {
        if (!i) return options.fn(this);

        if (v1[i - 1].time.split("T")[0] !== v2.time.split("T")[0])
          return options.fn(this);

        return options.inverse(this);
      }
    }
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
