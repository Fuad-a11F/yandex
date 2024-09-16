import { Form } from "../../components/authForm";
import { LoginInterface } from "../auth/loginInterface.ts";
import { RegistrationInterface } from "../auth/registrationInterface.ts";
import { FormLogin, FormRegistration } from "../../components";

export interface AuthFormPropsInterface {
  formSubmit: (data: RegistrationInterface & LoginInterface) => void;
}

export interface AuthFormChildrenInterface {
  form?: Form;
  formBody: FormLogin | FormRegistration;
}

export interface FormPropsInterface {
  formSubmit: (data: RegistrationInterface & LoginInterface) => void;
  events?: { submit: (e: SubmitEvent) => void };
}

export interface FormChildrenInterface {
  formBody: FormLogin | FormRegistration;
}
