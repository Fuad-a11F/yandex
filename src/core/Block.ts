import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './EventBus'

type Children = Record<string, Block>

export type Props = {
  events?: { [eventName: string]: (e: Event) => void }
  withId?: boolean
  [prop: string]: unknown
}

export type PropsAndChildren = {
  children?: Children
  props?: Props
  [prop: string]: unknown
}

export default abstract class Block {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _element: DocumentFragment | null = null
  protected id: string = ''
  protected eventBus: () => EventBus
  props: Props
  children: Children

  protected constructor(propsAndChildren: PropsAndChildren = {}) {
    const eventBus = new EventBus()
    const { children, props } = this._getChildrenAndProps(propsAndChildren)

    if (props.withId) {
      this.id = nanoid(6)
      this.props = this._makePropsProxy({ ...props, id: this.id })
    } else {
      this.props = this._makePropsProxy(props)
    }

    this.children = children
    this.eventBus = () => eventBus
    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName)
    if (this.id) {
      element.dataset.id = this.id
    }

    return element
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  private _componentDidMount() {
    this.componentDidMount(this.props)

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  componentDidMount(oldProps: Props) {
    return oldProps
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    this.componentDidUpdate(oldProps, newProps)
  }

  componentDidUpdate(oldProps?: Props, newProps?: Props) {
    console.log(oldProps, newProps)
    return true
  }

  get element(): DocumentFragment {
    if (!this._element) {
      throw new Error('Нет элемента')
    }
    return this._element
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return
    }

    Object.assign(this.props, nextProps)
  }

  private _render() {
    this._removeEvents()
    this._element = this.render()
    this._addEvents()
  }

  abstract render(): DocumentFragment

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs)

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
      stub!.replaceWith(child.element)
    })

    return fragment.content
  }

  private _getChildrenAndProps(propsAndChildren: PropsAndChildren): {
    props: Props
    children: Children
  } {
    const children: Children = {}
    const props: Props = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { props, children }
  }

  private _makePropsProxy(props: Props) {
    const { eventBus } = this

    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа')
        }
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set(target, prop: string, value) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа')
        }
        const oldProps = {
          ...target,
        }
        target[prop] = value
        eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target)

        return true
      },
    })
  }

  private _removeEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName])
      })
    }
  }

  private _addEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName])
      })
    }
  }
}
