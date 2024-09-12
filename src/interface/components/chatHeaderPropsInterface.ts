import { Button, Dropdown, Input, Modal } from "../../components";
import { AddUser, MoreAction, RemoveUser } from "../../components/chatHeader";
import FormAction from "../../components/chatHeader/components/formAction.ts";

export interface ChatHeaderPropsInterface {}

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

export interface RemoveUserPropsInterface {
  onRemoveUser: () => void;
  events?: { click: (e: MouseEvent) => void };
}

export interface DropdownHeaderInterface {
  addUser: AddUser;
  removeUser: RemoveUser;
}

export interface ModalUserModalPropsInterface {
  selectedChat?: any;
  closeModal: (field: "modalRemoveUser" | "modalAddUser") => void;
}

export interface ModalUserModalChildrenInterface {
  formAction: FormAction;
  selectedChat?: any;
}

export interface FormActionPropsInterface {
  formSubmit?: Function;
  formId?: string;
  events?: { submit: (e: SubmitEvent) => void };
  errorMessage?: string;
}
export interface FormActionChildrenInterface {
  input: Input;
  button: Button;
  formSubmit: Function;
  formId: string;
}

export interface FormDataInterface {
  login: string;
}

export interface MoreActionInterface {
  onClose: () => void;
  events?: { click: (e: MouseEvent) => void };
}
