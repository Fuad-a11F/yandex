export const passwordValidation = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  return passwordRegex.test(password);
};

export const emailValidation = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const namesValidation = (name: string) => {
  const namesRegex = /^[^\d]*$/;

  return namesRegex.test(name);
};

export const phoneValidation = (phone: string) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  return phoneRegex.test(phone);
};
