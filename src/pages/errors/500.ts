import Block from "../../core/block.ts";
import { Button } from "../../components";

class Page404 extends Block {
  init() {
    const handleChatNavigate = this.handleChatNavigate.bind(this);

    const backButton = new Button({
      text: localStorage.getItem("auth")
        ? "Back to the chats"
        : "Back to login",
      isLink: true,
      onClick: handleChatNavigate,
    });

    this.children = {
      ...this.children,
      backButton,
    };
  }

  handleChatNavigate() {
    if (localStorage.getItem("auth")) {
      window.router.go("/messenger");
    } else {
      window.router.go("/sign-in");
    }
  }

  render() {
    return `
        <main class="error">
            <div class="error__info">
                <h1>500</h1>
        
                <p>We've already fixed it</p>
            </div>
        
            {{{ backButton }}}
        </main>
    `;
  }
}

export default Page404;
