export interface ApiOptionInterface {
  headers?: { [key: string]: string };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  timeout?: number;
}

export type HTTPMethod = <R>(
  url: string,
  options?: ApiOptionInterface,
) => Promise<R>;
