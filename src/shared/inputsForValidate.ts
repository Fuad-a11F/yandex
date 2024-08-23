import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "./validation.ts";

export const getRegistrationValidateFields = (data) => {
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
