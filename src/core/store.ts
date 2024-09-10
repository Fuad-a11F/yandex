import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export class Store<State extends Record<string, unknown>> extends EventBus {
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

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
