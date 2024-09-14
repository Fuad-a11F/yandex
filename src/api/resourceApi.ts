import HTTPTransport from "./api.ts";

const resourceApi = new HTTPTransport("resources");

export default class ResourceApi {
  async getResources(path: string) {
    try {
      return await resourceApi.get(`/${path}`);
    } catch (e) {
      console.error(e);
    }
  }
}
