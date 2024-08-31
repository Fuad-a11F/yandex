import Block from "../../core/block.ts";

class Main extends Block {
  render() {
    return `
    <nav class="links">
        <ul>
            <li>
                <a href="#" page="login">Sign in</a>
            </li>
        </ul>
    
        <ul>
            <li>
                <a href="#" page="registration">Sign Up</a>
            </li>
        </ul>
    
        <ul>
            <li>
                <a href="#" page="chat">Chat</a>
            </li>
        </ul>
    
        <ul>
            <li>
                <a href="#" page="profile">Profile</a>
            </li>
        </ul>
    
        <ul>
            <li>
                <a href="#" page="404page">404 page</a>
            </li>
        </ul>
    
        <ul>
            <li>
                <a href="#" page="500page">500 page</a>
            </li>
        </ul>
    </nav>
`;
  }
}

export default Main;
