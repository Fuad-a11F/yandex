import InputElement from "../../components/input/components/inputElement.ts";

export interface InputPropsInterface {
  name?: string;
  isError?: boolean;
  isProfileRow?: boolean;
  errorMessage?: string | null;
  onBlur?: Function;
  type?: string;
  value?: string;
  placeholder?: string;
  id?: string;
}
export interface InputChildrenInterface {
  inputElement?: InputElement;
}

export interface InputElementInterface {
  onBlur?: Function;
  type?: string;
  value?: string;
  placeholder?: string;
  events?: { blur: (e: FocusEvent) => void };
}
