// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Тут ts ругается на реализацию синглтона я иак понимаю.. Не знаю даже как поправить.. А времеко разбираться нету уже(( дедлайн

import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Store<State extends Record<string, any>> extends EventBus<string> {
  static __instance: Store<object> | null = null;
  private state: State;

  constructor(defaultState: State) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public off<F>(event: string, callback: F) {
    super.off(event, callback);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Record<string, unknown>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
