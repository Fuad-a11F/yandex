import { Button, Input } from "../../components";

export interface FormRegistrationPropsInterface {
  password?: string;
}

export interface FormRegistrationChildrenInterface {
  inputFirstName: Input;
  inputSecondName: Input;
  inputLogin: Input;
  inputEmail: Input;
  inputPhone: Input;
  inputPassword: Input;
  inputPasswordRepeat: Input;
  loginButton: Button;
  registerButton: Button;
}
