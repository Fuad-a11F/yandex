import { expect } from "chai";
import sinon from "sinon";
import { Store, StoreEvents } from "./store.ts";

describe("Store", () => {
  let store: Store<object>;
  let defaultState: { name: string };

  beforeEach(() => {
    defaultState = { name: "Test" };
    store = new Store(defaultState);
  });

  it("должен быть синглтоном", () => {
    const anotherStore = new Store({ anotherKey: "anotherValue" });
    expect(store).to.equal(anotherStore);
  });

  it("должен возвращать текущее состояние", () => {
    expect(store.getState()).to.deep.equal(defaultState);
  });

  it("должен обновлять состояние", () => {
    const newState = { name: "newValue" };
    store.set(newState);
    expect(store.getState()).to.deep.equal(newState);
  });

  it("должен вызывать событие обновления при изменении состояния", () => {
    const callback = sinon.spy();
    store.on(StoreEvents.Updated, callback);
  });
});
