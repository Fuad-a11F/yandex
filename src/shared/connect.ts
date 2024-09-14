import { StoreEvents } from "../core/store";
import Block from "../core/block.ts";
import isEqual from "./isEqual";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function connect<T>(mapStateToProps: any) {
  return function (Component: typeof Block<object>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;

      constructor(props: T) {
        const store = window.store;
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        };

        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }

      // componentWillUnmount() {
      //   super.componentWillUnmount();
      //   window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      // }
    };
  };
}
