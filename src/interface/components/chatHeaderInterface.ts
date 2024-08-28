import { Button, Dropdown, Input, Modal } from "../../components";
import { AddUser, MoreAction, RemoveUser } from "../../components/chatHeader";
import FormAction from "../../components/chatHeader/components/formAction.ts";

export interface ChatHeaderInterface {
  moreAction: MoreAction;
  dropdown: Dropdown;
  modalAddUser: Modal;
  modalRemoveUser: Modal;
}

export interface AddUserInterface {
  onAddUser: () => void;
}

export interface RemoveUserInterface {
  onRemoveUser: () => void;
}

export interface DropdownHeaderInterface {
  addUser: AddUser;
  removeUser: RemoveUser;
}

export interface ModalUserModalInterface {
  formAction: FormAction;
}

export interface FormActionInterface {
  input: Input;
  button: Button;
  formSubmit: Function;
  formId: string;
}

export interface FormDataInterface {
  login: string;
}

export interface MoreActionInterface {
  onClose: Function;
}
