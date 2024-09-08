import { Button, ProfileRow, UploadAvatar } from "../../../components";
import { UserInfo } from "../../../pages/profile";
import {
  ProfileChangePasswordInterface,
  ProfileMainInterface,
} from "../../profile/profileInterface.ts";
import Aside from "../../../pages/profile/components/aside.ts";
import BackButton from "../../../pages/profile/components/backButton.ts";

export interface ProfilePropsInterface {
  isChangePassword?: boolean;
  isChangeData?: boolean;
}

export interface ProfileChildrenInterface {
  uploadAvatar: UploadAvatar;
  userInfo: UserInfo;
  buttonChangeData: Button;
  buttonChangePassword: Button;
  buttonLogout: Button;
  aside: Aside;
}

export interface UserInfoPropsInterface {
  formSubmit?: (
    data: ProfileChangePasswordInterface | ProfileMainInterface,
  ) => void;
  password?: string;
  isChangeData?: boolean;
  isChangePassword?: boolean;
  events?: { submit: (e: SubmitEvent) => void };
}

export interface UserInfoChildrenInterface {
  buttonSave: Button;
  profileRowDisplayName: ProfileRow;
  profileRowPhone: ProfileRow;
  profileRowOldPassword: ProfileRow;
  profileRowNewPassword: ProfileRow;
  profileRowNewRePassword: ProfileRow;
  profileRowEmail: ProfileRow;
  profileRowLogin: ProfileRow;
  profileRowName: ProfileRow;
  profileRowLastName: ProfileRow;
}

export interface AsidePropsInterface {
  navigateBack: () => void;
}

export interface BackButtonPropsInterface {
  navigateBack: () => void;
  events?: { click: Function };
}

export interface AsideChildrenInterface {
  backButton: BackButton;
}

export type UserInfoPasswordField =
  | "profileRowOldPassword"
  | "profileRowNewPassword"
  | "profileRowNewRePassword";

export type UserInfoMainField =
  | "profileRowEmail"
  | "profileRowLogin"
  | "profileRowName"
  | "profileRowLastName"
  | "profileRowDisplayName"
  | "profileRowPhone";

export type UserInfoAllFields =
  | "profileRowEmail"
  | "profileRowLogin"
  | "profileRowName"
  | "profileRowLastName"
  | "profileRowDisplayName"
  | "profileRowPhone"
  | "profileRowOldPassword"
  | "profileRowNewPassword"
  | "profileRowNewRePassword";
