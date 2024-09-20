import sinon from "sinon";
import { expect } from "chai";
import HTTPTransport, { METHODS } from "./api.ts";
import { apiBaseUrl } from "../shared/constants.ts";

describe("Api", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("GET", async () => {
    const http = new HTTPTransport("/test");
    const requestStub = sinon.stub(http, "request").resolves();

    await http.get("", { data: { a: "1", b: "22" } });

    const expectedUrl = `${apiBaseUrl}/test?a=1&b=22`;

    expect(
      requestStub.calledWithMatch(expectedUrl, { method: METHODS.GET }),
    ).to.equal(true);
  });
});
