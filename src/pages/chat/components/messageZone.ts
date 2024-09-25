import Block from "../../../core/block.ts";

class MessageZone extends Block {
  render() {
    return `
        <div id="message_chat" class="chat__messages_zone">
            {{#each messages as |message|}}
                {{#ifDateIsUnique ../messages message}}
                  <div class="chat__date">{{correctFormatDate message.time}}</div>
                {{/ifDateIsUnique}}

                <div class="chat__messages_wrapper">
                    <div class="chat__message_{{#ifCheckMessageAuthor message}}own{{else}}guest{{/ifCheckMessageAuthor}}">{{message.content}}</div>
                </div>
            {{/each}}
        </div>
    `;
  }
}

export default MessageZone;
