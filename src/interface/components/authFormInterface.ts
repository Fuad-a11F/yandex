import { Form } from "../../components/authForm";
import { FormLogin, FormRegistration } from "../../components";
import { LoginInterface } from "../auth/loginInterface.ts";
import { RegistrationInterface } from "../auth/registrationInterface.ts";

export interface AuthFormPropsInterface {
  formSubmit: (data: RegistrationInterface & LoginInterface) => void;
}

export interface AuthFormChildrenInterface {
  form?: Form;
  formBody: FormLogin | FormRegistration;
}

export interface FormPropsInterface {
  formSubmit: Function;
  events?: { submit: (e: SubmitEvent) => void };
}

export interface FormChildrenInterface {
  formBody: FormLogin | FormRegistration;
}
