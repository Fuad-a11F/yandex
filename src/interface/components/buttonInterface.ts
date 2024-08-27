export interface ButtonInterface {
  onClick?: () => void;
  isLink?: boolean;
  isDanger?: boolean;
  type?: string;
  text: string;
}
