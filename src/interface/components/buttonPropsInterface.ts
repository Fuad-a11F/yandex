export interface ButtonPropsInterface {
  onClick?: Function;
  isLink?: boolean;
  isDanger?: boolean;
  type?: string;
  text: string;
  events?: { click: (e: MouseEvent) => void };
}
