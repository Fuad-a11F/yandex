import Block from "../../utils/Block";
import {IChatMessage} from "../../models/IChatMessage.ts";

interface IMessageProps {
    message:IChatMessage;
    myMessage:boolean
}

export class Message extends Block {
    constructor(props: IMessageProps) {
        super(props);
    }
    public renderForList=this.render;

    protected render(): string {
        const { message,myMessage } = this.props;
        return (`
            <li class="message  ${myMessage?' message-my':''}">
               ${message.file?`
                    <article class="message__file">
                        <img src=${message.file.path} alt="included_file"/>
                        <div class="message__time">
                            {{{ Badge text="01.20" type="primary" }}}
                        </div>
                    </article>`:`<article class="message__text">
                        <p>{{content}}</p>
                        <div class="message__time">
                            {{{Badge text="01.20" }}}
                        </div>
                    </article>`
                }
            </li>
        `)
    }
}
