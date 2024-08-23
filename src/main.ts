import Handlebars from "handlebars";
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
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper("ifLogicOr", function (v1, v2, options) {
  if (v1 || v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function navigate(page: string) {
  const [source, context] = pages[page];
  const container = document.getElementById("app")!;

  if (source instanceof Object) {
    const page = new source(context);
    container.innerHTML = "";
    container.append(page.getContent());
    page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("profile"));

document.addEventListener("click", (e) => {
  const page = e.target.getAttribute("page");

  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
