import InputElement from "../../components/input/components/inputElement.ts";

export interface InputPropsInterface {
  name?: string;
  isError?: boolean;
  isProfileRow?: boolean;
  errorMessage?: string | null;
  onBlur?: (e: string) => void;
  type?: string;
  value?: string;
  placeholder?: string;
  id?: string;
}
export interface InputChildrenInterface {
  inputElement?: InputElement;
}

export interface InputElementInterface {
  type?: string;
  value?: string;
  placeholder?: string;
  events?: { blur: (e: FocusEvent) => void };

  name?: string;
  isError?: boolean;
  isProfileRow?: boolean;
  errorMessage?: string | null;
  onBlur?: (e: string) => void;
  id?: string;
}
