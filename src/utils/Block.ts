import EventBus from "./EventBus";
import { v4 as uuidv4 } from 'uuid';
import Handlebars from "handlebars";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = uuidv4();
    protected props: any;
    private _element: HTMLElement | null = null;
    protected _meta: { props: any; }|null=null;
    private _eventBus: () => EventBus;
    private children: Record<string, Block>;
    protected refs: any;

    constructor( propsWithChildren:any = {}) {
        const eventBus = new EventBus();
        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);
        console.log('init props',props,this.props)

        this._eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: any) {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {props, children};
    }
    _registerEvents(eventBus:EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    protected init() {
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps:any, newProps:any) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if(response) {

            this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps:any, newProps:any) {
        if(oldProps!==newProps) this.setProps(newProps);
        return true;
    }

    setProps = (nextProps:any) => {
        if (!nextProps) {
            return;
        }

        //Object.assign(this.props, nextProps);

    };

    get element() {
        return this._element;
    }

   private _render() {
        const fragment = this.compile(this.render(), this.props);

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    _addEvents() {
        const {events = {}} = this.props as { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }
    private compile(template: string, context: any) {
        const contextAndStubs = {...context, __refs: this.refs};

        const html = Handlebars.compile(template)(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        contextAndStubs.__children?.forEach(({embed}: any) => {
            embed(temp.content);
        });

        return temp.content;
    }

    protected render(): string {
        return '';
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props:any) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target}

                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    /*_createDocumentElement() {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        //return document.createElement();
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }*/
}
export default Block;
