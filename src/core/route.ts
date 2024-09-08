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

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      this.renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }

  private renderDom(query: string, block: Block<object>) {
    const root = document.querySelector(query);
    root?.append(block.getContent()!);
  }
}

export default Route;
