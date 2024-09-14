export interface ButtonPropsInterface {
  onClick?: (e: MouseEvent) => void;
  isLink?: boolean;
  isDanger?: boolean;
  type?: string;
  text: string;
  events?: { click: (e: MouseEvent) => void };
}
