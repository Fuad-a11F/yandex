import EventBus from "./eventBus";
import { a } from "vite/dist/node/types.d-aGj9QkWt";

export enum StoreEvents {
  Updated = "Updated",
}

export class Store<State extends Record<string, any>> extends EventBus {
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

  public set(nextState: Record<string, any>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
