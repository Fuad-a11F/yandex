export interface ApiOptionInterface {
  headers?: { [key: string]: string };
  method?: string;
  data?: { [key: string]: string };
  timeout?: number;
}
