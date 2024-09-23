import { Button, Dropdown, Input, Modal } from "../../components";
import { AddUser, MoreAction, RemoveUser } from "../../components/chatHeader";
import { ChatSearchChildrenInterface } from "./chatSearchPropsInterface.ts";
import { ChatsInterface } from "../modules/chat/chatInterface.ts";
import DeleteChat from "../../components/chatHeader/components/deleteChat/deleteChat.ts";
import ChangeAvatar from "../../components/chatHeader/components/changeAvatar/changeAvatar.ts";
import FormAction from "../../components/chatHeader/components/formAction.ts";
import User from "../../components/chatHeader/components/removeUser/user.ts";
import { UserDtoInterface } from "../api/authApiInterface.ts";

export interface ChatHeaderPropsInterface {
  selectedChat: ChatsInterface;
}

export interface ChatHeaderChildrenInterface {
  moreAction: MoreAction;
  dropdown: Dropdown;
  modalAddUser: Modal;
  changeAvatarModal: Modal;
  modalRemoveUser: Modal;
}

export interface UserPropsInterface {
  user: UserDtoInterface;
  selectedChat: ChatsInterface;
}

export interface UserChildrenInterface {
  button: Button;
}

export interface AddUserPropsInterface {
  onAddUser: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface ChangeAvatarPropsInterface {
  onChangeAvatar: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface AddUserPropsInterface {
  onAddUser: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface DeleteChatPropsInterface {
  onDeleteChat: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface RemoveUserPropsInterface {
  onRemoveUser: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface DropdownHeaderInterface {
  addUser: AddUser;
  removeUser: RemoveUser;
  deleteChat: DeleteChat;
  changeAvatar: ChangeAvatar;
}

export interface ModalUserModalPropsInterface {
  selectedChat?: ChatsInterface;
  closeModal?: (field: "modalRemoveUser" | "modalAddUser") => void;
  isLoading: boolean;
}

export interface ModalUserModalChildrenInterface {
  selectedChat?: ChatSearchChildrenInterface;
  formAction?: FormAction;
  button?: Button;
  users?: User[];
}

export interface FormActionPropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSubmit?: (data: any) => void;
  formId?: string;
  events?: {
    submit?: (e: SubmitEvent) => void;
  };
  errorMessage?: string;
  input?: Input;
  button?: Button;
}
export interface FormActionChildrenInterface {
  input: Input;
  button: Button;
  formSubmit: (data: unknown) => void;
  formId: string;
}

export interface FormDataInterface {
  login: string;
}

export interface MoreActionInterface {
  onClose: () => void;
  events?: { click: (e: MouseEvent) => void };
}
