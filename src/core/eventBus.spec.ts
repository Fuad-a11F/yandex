import sinon from "sinon";
import { expect } from "chai";
import EventBus from "./eventBus.ts";

describe("EventBus", () => {
  let eventBus: EventBus<string>;

  beforeEach(() => {
    eventBus = new EventBus<string>();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("должен добавлять слушателя на событие", () => {
    const callback = sinon.spy();
    eventBus.on("event1", callback);
    expect(eventBus["listeners"]["event1"]).to.include(callback);
  });

  it("должен удалять слушателя с события", () => {
    const callback = sinon.spy();
    eventBus.on("event1", callback);
    eventBus.off("event1", callback);
    expect(eventBus["listeners"]["event1"]).to.not.include(callback);
  });

  it("должен вызывать слушателей с корректными аргументами", () => {
    const callback = sinon.spy();

    eventBus.on("event1", callback);
    eventBus.emit("event1", "42", "test");

    expect(callback.calledOnce).to.equal(true);
    expect(callback.calledWith("42", "test")).to.equal(true);
  });

  it("должен вызывать слушателей с другим набором аргументов", () => {
    const callback = sinon.spy();

    eventBus.on("event2", callback);
    eventBus.emit("event2", true);

    expect(callback.calledOnce).to.equal(true);
    expect(callback.calledWith(true)).to.equal(true);
  });

  it("должен выбрасывать ошибку при попытке удалить несуществующее событие", () => {
    const callback = sinon.spy();
    expect(() => eventBus.off("event1", callback)).to.throw(
      Error,
      "Нет события: event1",
    );
  });

  it("должен корректно работать при emit без слушателей", () => {
    expect(() => eventBus.emit("event2", false)).to.not.throw();
  });

  it("должен очищать все слушатели после destroy", () => {
    const callback = sinon.spy();

    eventBus.on("event1", callback);
    eventBus.destroy();

    expect(eventBus["listeners"]).to.deep.equal({});
  });
});
