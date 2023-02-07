/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import { v4 } from 'uuid';
import EventBus from './EventBus';

export interface TProps {
    [index: string]: any,
    children?: Record<string, Block>
}
// export type TProps = Record<string, unknown>;
// export const defaultProps:TProps = {

// }

export default class Block {
    static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    props: TProps;

    // eslint-disable-next-line class-methods-use-this
    templator: Function | undefined;

    events: {} | Record<string, Function>;

    _prevProps: TProps;

    children: TProps;

    _id: string | null = null;

    _reRender: boolean;

    eventBus: () => EventBus;

    // eslint-disable-next-line no-undef
    _element: HTMLElement;

    _meta: { tagName: string, props?: TProps } | null = null;

    constructor(tagName: string = 'div', props: TProps = {}, templator?: Function | undefined) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        const { children, propsSimple } = this._getChildren(props);

        this.children = children;

        this.events = {};

        this.templator = templator;

        this._id = v4();

        this._reRender = false;

        this.props = this._makePropsProxy({ ...propsSimple, _id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources(): void {
        const tagName = this._meta?.tagName;
        if (tagName) this._element = this._createDocumentElement(tagName);
        // if (typeof this.props.className === 'string') this._element.className = this.props.className;
    }

    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child: Block): void => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(): void { }

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) return;
        this._render();
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        return true;
    }

    setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }
        this._prevProps = { ...this.props };
        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement | Node {
        return this._element;
    }

    _render(): void {
        const block = this.render();
        this._element.innerHTML = '';

        if (typeof block === 'string') {
            this._element.insertAdjacentHTML('afterbegin', block);
        } else {
            this._element.append(block);
        }
        this._removeEvents();
        this._addEvents();
        this._addAttribute();
    }

    render(): DocumentFragment | string {
        return '';
    }

    getContent(): HTMLElement | Node {
        return this.element;
    }

    _makePropsProxy(props: TProps) {
        const self = this;
        return new Proxy(props, {
            get(target: TProps, prop: string) {
                const value: unknown = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: TProps, prop: string, value: unknown): boolean {
                // eslint-disable-next-line no-param-reassign
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self._prevProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }


    // eslint-disable-next-line class-methods-use-this
    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    _addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this.events[eventName] = events[eventName].bind('', this);
            this._element.addEventListener(eventName, this.events[eventName]);
        });
    }

    _removeEvents(): void {
        if (!this.events) return;
        Object.keys(this.events).forEach((eventName) => {
            this._element.removeEventListener(eventName, this.events[eventName]);
        });
    }
    // _removeEvents(): void {

    //     console.log(this.events);

    //     this._element.removeEventListener('input', this.events['input']);
    //     this._element.removeEventListener('focusin', this.events['input']);
    //     this._element.removeEventListener('focusout', this.events['input']);
    //     // super._removeEvents();
    // }

    // _addEvents(): void {
    //     const { events = {} } = this.props;
    //     if (!events) return;
    //     Object.keys(events).forEach((eventName) => {
    //         this._element.addEventListener(eventName, events[eventName]);
    //     });
    // }


    _addAttribute(): void {
        const { attr = {} } = this.props;
        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    }

    compile(props: TProps): DocumentFragment {
        const propsAndStubs = { ...props };
        Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
            propsAndStubs[key] = `<div data-id="${child?._id}"></div>`;
        });

        const fragment = document.createElement('template');
        fragment.innerHTML = '';
        if (this.templator) fragment.innerHTML = this.templator(propsAndStubs);
        Object.values(this.children).forEach((child: Block) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

            stub?.replaceWith(child.getContent());
        });

        return fragment.content;
    }

    // eslint-disable-next-line class-methods-use-this
    _getChildren(propsAndChildren: TProps) {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};
        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, propsSimple: props };
    }

    show(): void {
        const content = this.getContent();
        if (content) content.style.display = '';
    }

    hide(): void {
        const content = this.getContent();
        if (content) content.style.display = 'none';
    }
}
