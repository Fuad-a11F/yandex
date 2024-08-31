import Handlebars, { Template } from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

const pages = {
  login: [Pages.Login],
  registration: [Pages.Registration],
  main: [Pages.Main],
  chat: [Pages.Chat],
  profile: [Pages.Profile],
  "404page": [Pages.Page404],
  "500page": [Pages.Page500],
};

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

function navigate(
  page:
    | "login"
    | "registration"
    | "main"
    | "chat"
    | "profile"
    | "404page"
    | "500page",
) {
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(context as any);
    container.innerHTML = "";
    container.append(page.getContent()!);
    page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("main"));

document.addEventListener("click", (e: MouseEvent) => {
  const page = (e.target as HTMLElement).getAttribute("page");

  if (page) {
    navigate(
      page as
        | "login"
        | "registration"
        | "main"
        | "chat"
        | "profile"
        | "404page"
        | "500page",
    );
    e.preventDefault();
    e.stopImmediatePropagation();
  } else {
    const page = (e.target as HTMLElement)
      .closest("a[page]")
      ?.getAttribute("page");

    if (page) {
      navigate(
        page as
          | "login"
          | "registration"
          | "main"
          | "chat"
          | "profile"
          | "404page"
          | "500page",
      );
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }
});
