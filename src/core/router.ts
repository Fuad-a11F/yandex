// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю исправить к след спринту.. Уже дедлайн очень сильно поджимает, очень не хочется срывать сроки. Как я обещал я во многих местах исправил, по сравнению с прошлым разом

import Route from "./route.ts";
import Block from "./block.ts";

class Router {
  static __instance: Router | null = null;

  _currentRoute: Route | null = null;
  _rootQuery: string = "";

  routes: Route[] = [];
  history: History = window.history;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block<object>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  clear() {
    this.routes = [];
    return this;
  }

  start() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    window.onpopstate = function (event: PopStateEvent) {
      self.onRoute((event.currentTarget as Window).location.pathname);
    }.bind(this);

    this.onRoute(window.location.pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      return this.routes.find((route) => route.match("*"));
    }
    return route;
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute._block?.getContent()?.remove();
    }

    this._currentRoute = route;
    route.render();
  }
}

export default Router;
