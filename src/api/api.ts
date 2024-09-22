import {
  ApiOptionInterface,
  HTTPMethod,
} from "../interface/api/apiInterface.ts";
import { apiBaseUrl } from "../shared/constants.ts";

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class HTTPTransport {
  readonly url: string = "";

  constructor(apiPath: string) {
    this.url = `${apiPath}`;
  }

  get: HTTPMethod = (url, options) => {
    if (!options || !("data" in options))
      return Promise.reject(new Error("Options or data not provided"));

    const { data } = options;

    if (data) {
      url += this.objectToQueryString(data);
    }

    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.GET,
    });
  };

  post: HTTPMethod = (url, options) => {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.POST,
    });
  };

  put: HTTPMethod = (url: string, options: ApiOptionInterface = {}) => {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.PUT,
    });
  };

  delete: HTTPMethod = (url: string, options: ApiOptionInterface = {}) => {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.DELETE,
    });
  };

  objectToQueryString(data: { [key: string]: unknown }) {
    if (!data || Object.keys(data).length === 0) {
      return "";
    }

    const queryString = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");

    return `?${queryString}`;
  }

  async request(url: string, options: ApiOptionInterface = {}) {
    const { method, data, headers } = options;

    const response = await fetch(url, {
      method: method || METHODS.GET,
      credentials: "include",
      mode: "cors",
      headers: headers || { "Content-Type": "application/json" },
      body:
        method !== METHODS.GET
          ? data instanceof FormData
            ? data
            : data
              ? JSON.stringify(data)
              : undefined
          : undefined,
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    if (
      (data instanceof FormData ||
        response.headers.get("content-type")?.includes("image")) &&
      !isJson
    ) {
      return response.blob();
    } else {
      return (await isJson) ? response.json() : undefined;
    }
  }
}

export default HTTPTransport;
