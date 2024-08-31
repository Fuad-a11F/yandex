import { Button, ProfileRow, UploadAvatar } from "../../../components";
import { UserInfo } from "../../../pages/profile";
import {
  ProfileChangePasswordInterface,
  ProfileMainInterface,
} from "../../profile/profileInterface.ts";

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

export interface UserInfoPasswordField
  extends Array<
    | "profileRowOldPassword"
    | "profileRowNewPassword"
    | "profileRowNewRePassword"
  > {}

export interface UserInfoMainField
  extends Array<
    | "profileRowEmail"
    | "profileRowLogin"
    | "profileRowName"
    | "profileRowLastName"
    | "profileRowDisplayName"
    | "profileRowPhone"
  > {}

export interface UserInfoAllFields
  extends Array<
    | "profileRowEmail"
    | "profileRowLogin"
    | "profileRowName"
    | "profileRowLastName"
    | "profileRowDisplayName"
    | "profileRowPhone"
    | "profileRowOldPassword"
    | "profileRowNewPassword"
    | "profileRowNewRePassword"
  > {}
