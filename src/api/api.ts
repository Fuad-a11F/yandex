import { ApiOptionInterface } from "../interface/api/apiInterface.ts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const queryStringify = (data: string): string => {
  if (!data || typeof data !== "object") {
    return "";
  }

  const params = Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) {
      value = value.join(",");
    } else if (typeof value === "object" && value !== null) {
      value = "[object Object]";
    }
    return `${key}=${value}`;
  });

  return `?${params.join("&")}`;
};

class HTTPTransport {
  get = (url: string, options: { timeout?: number } = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post = (url: string, options: { timeout?: number } = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put = (url: string, options: { timeout?: number } = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete = (url: string, options: { timeout?: number } = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = (
    url: string,
    options: ApiOptionInterface | {} = {},
    timeout: number = 5000,
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
