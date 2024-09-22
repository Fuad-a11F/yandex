import { Avatar } from "../../components/uploadAvatar";
import { Button, Modal } from "../../components";
import AvatarForm from "../../components/uploadAvatar/components/avatarForm.ts";
import UploadFileInput from "../../components/uploadAvatar/components/uploadFileInput.ts";
import { UserDtoInterface } from "../api/authApiInterface.ts";

export interface UploadAvatarPropsInterface {
  user?: UserDtoInterface;
}

export interface UploadAvatarChildrenInterface {
  avatar?: Avatar;
  modal?: Modal;
}

export interface AvatarPropsInterface {
  handleClick?: () => void;
  events?: { click?: (e: MouseEvent) => void };
  url?: string;
  user?: UserDtoInterface;
}

export interface UploadFileInputPropsInterface {
  setFile: (e: KeyboardEvent) => void;
  events?: { change: (e: KeyboardEvent) => void };
}

export interface AvatarModalPropsInterface {
  fileName?: null | string;
  isError?: boolean;
  handleCloseModal?: () => void;
  formSubmitChangeAvatar?: (data: { avatar: File }) => void;
}

export interface AvatarModalChildrenInterface {
  avatarForm: AvatarForm;
}

export interface AvatarFormPropsInterface {
  formSubmit?: (avatar: { avatar: File }) => void;
  events?: { submit: (e: SubmitEvent) => void };
  fileName?: string;
}

export interface AvatarFormChildrenInterface {
  avatarForm?: AvatarForm;
  uploadFileInput: UploadFileInput;
  changeButton: Button;
}
