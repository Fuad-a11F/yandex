export interface ModalPropsInterface {
  isVisible: boolean;
  events?: { click: (e: MouseEvent) => void };
}

export interface ModalChildrenInterface {
  ModalBody: unknown;
}
