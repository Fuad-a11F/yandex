import HTTPTransport from "./api.ts";

const resourceApi = new HTTPTransport("resources");

export default class ResourceApi {
  async getResources(path: string) {
    return await resourceApi.get(`/${path}`);
  }
}
