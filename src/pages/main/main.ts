import Block from "../../core/block.ts";
import { Button } from "../../components";

class Main extends Block {
  init() {
    const handleNavigate = this.handleNavigate.bind(this);

    const signInButton = new Button({
      text: "Sign in",
      isLink: true,
      onClick: () => handleNavigate("/login"),
    });
    const signUpButton = new Button({
      text: "Sign Up",
      isLink: true,
      onClick: () => handleNavigate("/registration"),
    });
    const chatButton = new Button({
      text: "Chat",
      isLink: true,
      onClick: () => handleNavigate("/chat"),
    });
    const profileButton = new Button({
      text: "Profile",
      isLink: true,
      onClick: () => handleNavigate("/profile"),
    });
    const page404Button = new Button({
      text: "404 page",
      isLink: true,
      onClick: () => handleNavigate("/test"),
    });
    const page500Button = new Button({
      text: "500 page",
      isLink: true,
      onClick: () => handleNavigate("/server-error"),
    });

    this.children = {
      ...this.children,
      signInButton,
      signUpButton,
      chatButton,
      profileButton,
      page404Button,
      page500Button,
    };
  }

  handleNavigate(link: string) {
    window.router.go(link);
  }

  render() {
    return `
    <nav class="links">
        <ul>
            <li>
                {{{ signInButton }}}
            </li>
            
            <li>
                {{{ signUpButton }}}
            </li>
            
            <li>
                {{{ chatButton }}}
            </li>
            
            <li>
                {{{ profileButton }}}
            </li>
            
              <li>
                {{{ page404Button }}}
            </li>
            
            <li>
                {{{ page500Button }}}
            </li>
        </ul>
    </nav>
`;
  }
}

export default Main;
