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

  put<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.PUT,
    });
  }

  delete<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    return this.request(`${this.apiBaseUrl}/${url}`, {
      ...options,
      method: METHODS.DELETE,
    });
  }

  async request<TResponse>(
    url: string,
    options: ApiOptionInterface = {},
  ): Promise<TResponse> {
    const { method, data, headers } = options;

    if (METHODS.GET === method) {
      url += `?offset=${data?.offset || 0}&limit=${data?.limit || 10}&title=${data?.title || ""}`;
    }

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
      data instanceof FormData ||
      response.headers.get("content-type")?.includes("image")
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
