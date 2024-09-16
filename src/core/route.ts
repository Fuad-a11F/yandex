import Block from "./block.ts";

class Route {
  _pathname: string;
  _blockClass: typeof Block<object>;
  _block: Block | null;
  _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: typeof Block<object>,
    props: { rootQuery: string },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass({});
    this.renderDom(this._props.rootQuery, this._block);
  }

  private renderDom(query: string, block: Block<object>) {
    const root = document.querySelector(query);
    root?.append(block.getContent()!);
  }
}

export default Route;
