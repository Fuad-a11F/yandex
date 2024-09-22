import { expect } from "chai";
import Router from "./router";
import Block from "./block";
import sinon from "sinon";

class BlockMock extends Block<object, object> {
  render() {
    return "<div>Mocked Content</div>";
  }
}

describe("Router", () => {
  let router: Router;
  const rootQuery = "#app";

  beforeEach(() => {
    router = new Router(rootQuery);
  });

  afterEach(() => {
    router.clear();
    sinon.restore();
  });

  it("должен возвращать тот же экземпляр (singleton)", () => {
    const secondRouterInstance = new Router(rootQuery);
    expect(secondRouterInstance).to.equal(router);
  });

  it("должен добавлять маршрут", () => {
    router.use("/test", BlockMock).use("/other", BlockMock);

    expect(router.routes).to.have.lengthOf(2);
  });

  it("должен удалять маршруты", () => {
    router.use("/test", BlockMock).use("/other", BlockMock).clear();

    expect(router.routes).to.have.lengthOf(0);
  });

  it("должен вызывать history.back при вызове router.back()", () => {
    const backStub = sinon.stub(router.history, "back");

    router.back();
    expect(backStub.calledOnce).to.equal(true);
  });

  it("должен вызывать history.forward при вызове router.forward()", () => {
    const forwardStub = sinon.stub(router.history, "forward");

    router.forward();
    expect(forwardStub.calledOnce).to.equal(true);
  });
});
