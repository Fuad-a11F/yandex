import { InputSearch } from "../../components";
import ProfileButton from "../../components/chatSearch/components/profileButton/profileButton.ts";

export interface ChatSearchPropsInterface {}

export interface ChatSearchChildrenInterface {
  inputSearch: InputSearch;
  profileButton: ProfileButton;
}

export interface ProfileButtonPropsInterface {
  handleProfileNavigate: () => void;
  events?: { click: Function };
}
