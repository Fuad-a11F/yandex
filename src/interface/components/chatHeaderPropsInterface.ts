import { Button, Dropdown, Input, Modal } from "../../components";
import { AddUser, MoreAction, RemoveUser } from "../../components/chatHeader";
import FormAction from "../../components/chatHeader/components/formAction.ts";
import { ChatSearchChildrenInterface } from "./chatSearchPropsInterface.ts";
import { ChatsInterface } from "../modules/chat/chatInterface.ts";
import DeleteChat from "../../components/chatHeader/components/deleteChat/deleteChat.ts";
import ChangeAvatar from "../../components/chatHeader/components/changeAvatar/changeAvatar.ts";

export interface ChatHeaderChildrenInterface {
  moreAction: MoreAction;
  dropdown: Dropdown;
  modalAddUser: Modal;
  modalRemoveUser: Modal;
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
  closeModal: (field: "modalRemoveUser" | "modalAddUser") => void;
}

export interface ModalUserModalChildrenInterface {
  formAction: FormAction;
  selectedChat?: ChatSearchChildrenInterface;
}

export interface FormActionPropsInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSubmit?: (data: any) => void;
  formId?: string;
  events?: {
    submit?: (e: SubmitEvent) => void;
    keyboard?: (e: KeyboardEvent) => void;
  };
  errorMessage?: string;
}
export interface FormActionChildrenInterface {
  input: Input;
  button: Button;
  formSubmit: () => void;
  formId: string;
}

export interface FormDataInterface {
  login: string;
}

export interface MoreActionInterface {
  onClose: () => void;
  events?: { click: (e: MouseEvent) => void };
}
