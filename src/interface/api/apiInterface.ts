export interface ApiOptionInterface<T = unknown> {
  headers?: { [key: string]: string };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: T;
  timeout?: number;
}

export type HTTPMethod = <R, T>(
  url: string,
  options?: ApiOptionInterface<T>,
) => Promise<R>;
