export const passwordValidation = (password: string) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  return passwordRegex.test(password);
};

export const emailValidation = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/;

  return emailRegex.test(email);
};

export const loginValidation = (login: string) => {
  const loginRegex = /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/;

  return loginRegex.test(login);
};

export const namesValidation = (name: string) => {
  const namesRegex = /^[A-ZА-ЯЁ][a-zа-яё-]*$/;

  return namesRegex.test(name);
};

export const phoneValidation = (phone: string) => {
  const phoneRegex = /^\+?\d{10,15}$/;

  return phoneRegex.test(phone);
};
