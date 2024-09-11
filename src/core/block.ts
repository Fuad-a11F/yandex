import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import EventBus from "./eventBus.ts";
import { ChildrenComponent } from "../interface/core/blockInterface.ts";
import isEqual from "../shared/isEqual.ts";

class Block<Props = object, Children extends ChildrenComponent = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:components-did-mount",
    FLOW_CDU: "flow:components-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  _element: HTMLElement | null = null;
  _id = nanoid(6);
  eventBus;
  props: Props;
  children: Children;

  constructor(propsWithChildren: Partial<Props & Children>) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildrenAndProps(propsWithChildren);
    this.props = this.makePropsProxy({ ...props });
    this.children = children;

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private addEvents() {
    const { events = {} } = this.props as Props & {
      events: { [key: string]: () => void };
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private registerEvents(eventBus: EventBus<string>) {
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

  private makePropsProxy(props: Props): Props {
    return new Proxy(props as object, {
      get: (target: { [key: string]: unknown }, prop: string) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: { [key: string]: unknown }, prop: string, value) => {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    }) as Props;
  }

  private createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private componentDidUpdatePrivate(oldProps: Props, newProps: Props) {
    // console.log("CDU");
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
    const { events = {} } = this.props as Props & {
      events: { [key: string]: () => void };
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private getChildrenAndProps(propsAndChildren: Partial<Props & Children>) {
    const children: { [key: string]: Block } = {};
    const props: { [key: string]: unknown } = {};

    if (propsAndChildren) {
      Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (value instanceof Block) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });
    }

    return { children, props } as {
      props: Props;
      children: Children;
    };
  }

  private renderPrivate() {
    const propsAndStubs: Props | Children = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        // @ts-ignore
        propsAndStubs[key] = child.map(
          (item) => `<div data-id="${item._id}"></div>`,
        );
      } else {
        // @ts-ignore
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this.createDocumentElement(
      "template",
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((obj) => {
          const stub = fragment.content.querySelector(`[data-id="${obj._id}"]`);

          stub?.replaceWith(obj.getContent()!);
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent()!);
      }
    });

    if (this._element && newElement) {
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

  deepEqual(obj1, obj2) {
    // Проверка на равенство ссылок (если оба объекта одинаковы)
    if (obj1 === obj2) return true;

    // Если один из них не объект или они разные типы, объекты не равны
    if (
      typeof obj1 !== "object" ||
      typeof obj2 !== "object" ||
      obj1 === null ||
      obj2 === null
    ) {
      return false;
    }

    // Получаем массивы ключей обоих объектов
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    // Сравниваем длину ключей, если разная — объекты точно не равны
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Сравниваем каждое поле и его значение
    for (let key of keys1) {
      // Если во втором объекте нет такого же ключа, объекты не равны
      if (!keys2.includes(key)) {
        return false;
      }

      // Если значения по этому ключу не равны (сравниваем рекурсивно)
      if (!this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !this.deepEqual(oldProps, newProps);
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props as object, nextProps);
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
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
