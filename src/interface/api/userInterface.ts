export interface ApiError {
  reason: string;
}

export interface ChangeProfileRequestInterface {
  first_name: "string";
  second_name: "string";
  display_name: "string";
  login: "string";
  email: "string";
  phone: "string";
}

export interface ChangeAvatarRequestInterface {
  avatar: File;
}

export interface ChangePasswordRequestInterface {
  newPassword: string;
  oldPassword: string;
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
