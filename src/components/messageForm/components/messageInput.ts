import Block from "../../../core/block.ts";

class MessageInput extends Block {
  render() {
    return `<div class="messageForm__input">
            <label>
                <input  id="type-messages" name="message" type="text" placeholder="Message">
            </label>
        </div>`;
  }
}

export default MessageInput;
