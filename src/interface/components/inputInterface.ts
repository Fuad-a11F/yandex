import InputElement from "../../components/input/components/inputElement.ts";

export interface InputInterface {
  inputElement: InputElement;
  name: string;
  isError?: boolean;
  isProfileRow?: boolean;
  errorMessage?: string;
  onBlur: Function;
  type: string;
  value: string;
  placeholder: string;
}

export interface InputElementInterface {
  onBlur: Function;
  type: string;
  value: string;
  placeholder: string;
}
