export interface ApiOptionInterface {
  headers?: Headers | {};
  method?: string;
  data?: { [key: string]: string };
  timeout?: number;
}
