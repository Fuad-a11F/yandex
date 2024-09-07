import { ApiOptionInterface } from "../interface/api/apiInterface.ts";

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class HTTPTransport {
  private apiBaseUrl: string = "";

  constructor(apiPath: string) {
    this.apiBaseUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  get<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.GET,
    });
  }

  post<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.POST,
    });
  }

  put = (url: string, options: ApiOptionInterface = {}) => {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.PUT,
    });
  };

  delete = (url: string, options: ApiOptionInterface = {}) => {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.DELETE,
    });
  };

  async request<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    const { method, data } = options;

    const response = await fetch(url, {
      method: method || METHODS.GET,
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const resultData = (await isJson) ? response.json() : null;

    return resultData as unknown as TResponse;
  }
}

export default HTTPTransport;
