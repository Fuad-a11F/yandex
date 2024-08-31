import { Avatar } from "../../components/uploadAvatar";
import { Button, Modal } from "../../components";
import AvatarForm from "../../components/uploadAvatar/components/avatarForm.ts";
import UploadFileInput from "../../components/uploadAvatar/components/uploadFileInput.ts";

export interface UploadAvatarPropsInterface {}

export interface UploadAvatarChildrenInterface {
  avatar: Avatar;
  modal: Modal;
}

export interface AvatarPropsInterface {
  handleClick: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface UploadFileInputPropsInterface {
  setFile: (e: KeyboardEvent) => void;
  events?: { change: (e: KeyboardEvent) => void };
}

export interface AvatarModalPropsInterface {
  fileName?: null | string;
  isError?: boolean;
}

export interface AvatarModalChildrenInterface {
  avatarForm: AvatarForm;
}

export interface AvatarFormPropsInterface {
  formSubmit?: Function;
  events?: { submit: (e: SubmitEvent) => void };
  fileName?: string;
}

export interface AvatarFormChildrenInterface {
  avatarForm?: AvatarForm;
  uploadFileInput: UploadFileInput;
  changeButton: Button;
}
