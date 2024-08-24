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
                <h1>500</h1>
        
                <p>We've already fixed it</p>
            </div>
        
            <a href="#" page="chat">{{{ backButton }}}</a>
        </main>
    `;
  }
}

export default Page404;
