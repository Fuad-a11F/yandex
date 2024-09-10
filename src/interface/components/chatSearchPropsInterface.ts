import { InputSearch, Modal } from "../../components";
import ProfileButton from "../../components/chatSearch/components/profileButton/profileButton.ts";
import AddChatButton from "../../components/chatSearch/components/addChatButton/addChatButton.ts";

export interface ChatSearchPropsInterface {}

export interface ChatSearchChildrenInterface {
  inputSearch: InputSearch;
  profileButton: ProfileButton;
  addChatButton: AddChatButton;
  addChatModal: Modal;
}

export interface ProfileButtonPropsInterface {
  handleProfileNavigate: () => void;
  events?: { click: Function };
}
