// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Обещаю убрать @ts-nocheck во всех файлах в следующей сдаче. Времени просто было очень мало, а дедлайн рушить не хочется
import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./eventBus.ts";

class Block<
  Props extends Record<
    [key: string],
    string | number | Function | Block
  > = unknown,
> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:components-did-mount",
    FLOW_CDU: "flow:components-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  _element = null;
  _id = nanoid(6);
  children: Record<string, Block> = {};
  eventBus = {};
  props: Props = {} as Props;

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildrenAndProps(propsWithChildren);
    this.props = this.makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.initPrivate.bind(this));
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this.componentDidMountPrivate.bind(this),
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this.componentDidUpdatePrivate.bind(this),
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderPrivate.bind(this));
  }

  private initPrivate() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private makePropsProxy(props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  private createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  private componentDidUpdatePrivate(oldProps: object, newProps: object) {
    console.log("CDU");
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.renderPrivate();
  }

  private componentDidMountPrivate() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });

        return;
      }
      child.dispatchComponentDidMount();
    });
  }

  private removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  private getChildrenAndProps(propsAndChildren) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private renderPrivate() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this.createDocumentElement("template");

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    const newElement = fragment.content.firstElementChild;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent());
    });

    if (this._element) {
      this.removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this.addEvents();
  }

  get element() {
    return this._element;
  }

  init() {}

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  render() {}

  getContent() {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }

    return this._element;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
