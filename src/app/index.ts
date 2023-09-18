import Handlebars from "handlebars";
import {
  registerPartials,
  registerHelpers,
  registerComponents,
  getPageByPath,
} from "./providers";
import { InputField, NavList } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui/input/input.component";
import { SigninForm } from "@/widgets/auth";

function app() {
  registerHelpers();
  registerPartials();
  registerComponents();

  // const path = window.location.pathname;
  // const page = getPageByPath(path);

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("#app");
    if (root !== null) {
      const button = new Button({
        label: "123",
        onClick: () => console.log(123),
      });
      button.setProps({ label: "444" });

      const inputField = new InputField({
        label: "asdf",
      });

      root.append(button.getContent());
      root.append(inputField.getContent());
      root.append(new SigninForm().getContent());
      return;
      root.innerHTML = page();

      function toggleModal() {
        document.querySelector(".modal-overlay")?.classList.toggle("hide");
      }

      document
        .querySelector(".user-image span")
        ?.addEventListener("click", toggleModal);
      document
        .querySelector(".modal-overlay")
        ?.addEventListener("click", toggleModal);

      const navContainer = document.createElement("nav");
      navContainer.classList.add("nav-list");
      navContainer.innerHTML = NavList();
      document.querySelector("#app main")?.append(navContainer);
    }
  });
}

export default app;
