import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "./validation.ts";
import { RegistrationInterface } from "../../interface/auth/registrationInterface.ts";

export const getRegistrationValidateFields = (data: RegistrationInterface) => {
  return [
    {
      validateFunction: loginValidation,
      value: data.login,
      errorMessage: "Login is wrong",
      input: "inputLogin",
    },
    {
      validateFunction: namesValidation,
      value: data.first_name,
      errorMessage: "First name is wrong",
      input: "inputFirstName",
    },
    {
      validateFunction: namesValidation,
      value: data.second_name,
      errorMessage: "Second name is wrong",
      input: "inputSecondName",
    },
    {
      validateFunction: passwordValidation,
      value: data.password,
      errorMessage: "Password is wrong",
      input: "inputPassword",
    },
    {
      validateFunction: passwordValidation,
      value: data.repassword,
      errorMessage: "Password is wrong",
      input: "inputPasswordRepeat",
    },
    {
      validateFunction: emailValidation,
      value: data.email,
      errorMessage: "Email is wrong",
      input: "inputEmail",
    },
    {
      validateFunction: phoneValidation,
      value: data.phone,
      errorMessage: "Phone is wrong",
      input: "inputPhone",
    },
  ];
};

export const getLoginValidateFields = (data) => {
  return [
    {
      validateFunction: loginValidation,
      value: data.login,
      errorMessage: "Login is wrong",
      input: "inputLogin",
    },
    {
      validateFunction: passwordValidation,
      value: data.password,
      errorMessage: "Password is wrong",
      input: "inputPassword",
    },
  ];
};

export const getUserInfoDataValidateFields = (data) => {
  return [
    {
      validateFunction: emailValidation,
      value: data.email,
      errorMessage: "Email is wrong",
      input: "profileRowEmail",
    },
    {
      validateFunction: loginValidation,
      value: data.login,
      errorMessage: "Login is wrong",
      input: "profileRowLogin",
    },
    {
      validateFunction: namesValidation,
      value: data.first_name,
      errorMessage: "First name is wrong",
      input: "profileRowName",
    },
    {
      validateFunction: namesValidation,
      value: data.second_name,
      errorMessage: "Second name is wrong",
      input: "profileRowLastName",
    },
    {
      validateFunction: loginValidation,
      value: data.display_name,
      errorMessage: "Display name is wrong",
      input: "profileRowDisplayName",
    },
    {
      validateFunction: phoneValidation,
      value: data.phone,
      errorMessage: "Phone is wrong",
      input: "profileRowPhone",
    },
  ];
};

export const getUserInfoPasswordValidateFields = (data) => {
  return [
    {
      validateFunction: passwordValidation,
      value: data.oldPassword,
      errorMessage: "Password is wrong",
      input: "profileRowOldPassword",
    },
    {
      validateFunction: passwordValidation,
      value: data.newPassword,
      errorMessage: "Password is wrong",
      input: "profileRowNewPassword",
    },
  ];
};
