import Block from "../../core/block.ts";
import { Button } from "../../components";

class Page404 extends Block {
  init() {
    const backButton = new Button({ text: "Back to the chats", isLink: true });

    this.children = {
      ...this.children,
      backButton,
    };
  }

  render() {
    return `
        <main class="error">
            <div class="error__info">
                <h1>404</h1>
        
                <p>Not found</p>
            </div>
        
            {{{ backButton }}}
        </main>
    `;
  }
}

export default Page404;
