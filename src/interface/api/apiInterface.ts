export interface ApiOptionInterface {
  headers?: { [key: string]: string };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: { [key: string]: any };
  timeout?: number;
}
