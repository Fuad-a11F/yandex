import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export class Store<State extends Record<string, any>> extends EventBus<string> {
  static __instance: Store<object> | null = null;
  // @ts-ignore
  private state: State;

  constructor(defaultState: State) {
    if (Store.__instance) {
      // @ts-ignore
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

  public set(nextState: Record<string, any>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
