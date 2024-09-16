import { Input } from "../../components";

export interface ProfileRowPropsInterface {
  label?: string;
  isEditting?: boolean;
  value?: string;
}

export interface ProfileRowChildrenInterface {
  input: Input;
}
