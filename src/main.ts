import Handlebars, { Template } from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import Router from "./core/router.ts";

declare global {
  interface Window {
    // store: Store<AppState>;
    router: Router;
  }
}

const router = new Router("#app");
window.router = router;

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

router
  .use("/", Pages.Main)
  .use("/sign-in", Pages.Login)
  .use("/sign-up", Pages.Registration)
  .use("/messenger", Pages.Chat)
  .use("/server-error", Pages.Page500)
  .use("/settings", Pages.Profile)
  .use("*", Pages.Page404)
  .start();
