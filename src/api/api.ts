import { ApiOptionInterface } from "../interface/api/apiInterface.ts";
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

  get<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    const { data } = options;

    if (data) {
      url += this.objectToQueryString(data);
    }

    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.GET,
    });
  }

  post<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.POST,
    });
  }

  put<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.PUT,
    });
  }

  delete<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${apiBaseUrl}${this.url}/${url}`, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  objectToQueryString(data: { [key: string]: unknown }) {
    if (!data || Object.keys(data).length === 0) {
      return "";
    }

    const queryString = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");

    return `?${queryString}`;
  }

  async request<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
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
      const resultData = response.blob();

      return resultData as unknown as TResponse;
    } else {
      const resultData = (await isJson) ? response.json() : undefined;

      return resultData as unknown as TResponse;
    }
  }
}

export default HTTPTransport;
