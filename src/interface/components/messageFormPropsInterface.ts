import { AddFiles, MessageInput } from "../../components/messageForm";
import { Dropdown } from "../../components";

export interface MessageFormPropsInterface {
  events?: { submit: (e: SubmitEvent) => void };
}

export interface MessageFormChildrenInterface {
  addFiles: AddFiles;
  messageInput: MessageInput;
  dropdown: Dropdown;
}

export interface MessageInterface {
  message: string;
}

export interface AddFilesPropsInterface {
  onAddFiles: () => void;
  events?: { click: (e: SubmitEvent) => void };
}
