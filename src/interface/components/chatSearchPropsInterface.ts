import { InputSearch, Modal } from "../../components";
import ProfileButton from "../../components/chatSearch/components/profileButton/profileButton.ts";
import AddChatButton from "../../components/chatSearch/components/addChatButton/addChatButton.ts";
import FormAction from "../../components/chatHeader/components/formAction.ts";

export interface AddChatButtonPropsInterface {
  addChatButton?: () => void;
  events?: {
    click?: () => void;
  };
}

export interface ChatSearchChildrenInterface {
  inputSearch: InputSearch;
  profileButton: ProfileButton;
  addChatButton: AddChatButton;
  addChatModal: Modal;
}

export interface ProfileButtonPropsInterface {
  handleProfileNavigate: () => void;
  events?: { click: () => void };
}

export interface AddChatModalPropsInterface {
  addChatCloseButton: () => void;
}

export interface AddChatModalChildrenInterface {
  formAction: FormAction;
}

export interface InputPropsInterface {
  searchChats: (value: string) => void;
  events?: { blur?: (e: FocusEvent) => void };
}
