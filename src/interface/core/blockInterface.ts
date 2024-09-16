import Block from "../../core/block.ts";

export type ChildrenComponent =
  | { [key: string]: Block<object> & ((data: unknown) => void) }
  | object;
