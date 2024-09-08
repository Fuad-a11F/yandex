import Block from "../../core/block.ts";
import { Button } from "../../components";

class Page404 extends Block {
  init() {
    const handleChatNavigate = this.handleChatNavigate.bind(this);

    const backButton = new Button({
      text: "Back to the chats",
      isLink: true,
      onClick: handleChatNavigate,
    });

    this.children = {
      ...this.children,
      backButton,
    };
  }

  handleChatNavigate() {
    window.router.go("/chat");
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
