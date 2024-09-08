export interface RegistrationRequestInterface {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginRequestInterface {
  login: string;
  password: string;
}

interface RegistrationResponseSuccessInterface {
  id: number;
}

export interface ApiError {
  reason: number;
}

export interface UserDtoInterface {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
}

export interface UserResponseInterface extends UserDtoInterface, ApiError {}

export interface RegistrationResponseInterface
  extends RegistrationResponseSuccessInterface,
    ApiError {}
