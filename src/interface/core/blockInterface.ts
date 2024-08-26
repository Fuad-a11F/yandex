import Block from "../../core/block.ts";

export type BlockPropsInterface = Record<
  [key: string],
  string | number | Function | Block
>;
