import { AddFiles, MessageInput } from "../../components/messageForm";

export interface MessageFormInterface {
  addFiles: AddFiles;
  messageInput: MessageInput;
  dropdown: any;
}

export interface MessageInterface {
  message: string;
}
