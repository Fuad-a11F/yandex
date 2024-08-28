import { AddFiles, MessageInput } from "../../components/messageForm";
import { Dropdown } from "../../components";

export interface MessageFormInterface {
  addFiles: AddFiles;
  messageInput: MessageInput;
  dropdown: Dropdown;
}

export interface MessageInterface {
  message: string;
}
