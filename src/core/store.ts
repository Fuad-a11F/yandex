import EventBus from "./eventBus";

export enum StoreEvents {
  Updated = "Updated",
}
export class Store<State> extends EventBus<string> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static __instance: Store<any> | null = null;
  private state: State | null = null;

  constructor(defaultState: State) {
    if (Store.__instance) {
      return Store.__instance;
    }

    super();
    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  off<F>(event: string, callback: F) {
    super.off(event, callback);
  }

  getState(): State {
    return this.state as State;
  }

  set(nextState: State | object) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState } as State;

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
