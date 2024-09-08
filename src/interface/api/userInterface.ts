export interface ApiError {
  reason: number;
}

export interface ChangeProfileRequestInterface {
  first_name: "string";
  second_name: "string";
  display_name: "string";
  login: "string";
  email: "string";
  phone: "string";
}

export interface ChangeProfileResponseInterface {}

export interface ChangeAvatarRequestInterface {
  avatar: File;
}

export interface ChangeAvatarResponseInterface {}

export interface ChangePasswordRequestInterface {}

export interface ChangePasswordResponseInterface {
  oldPassword: "string";
  newPassword: "string";
}

export interface SearchUserRequestInterface {
  login: string;
}

export interface SearchUserResponseInterface {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}
