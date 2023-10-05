import { ChatPage, SigninPage, SignupPage } from "@/pages";
import { Router } from "@/shared/model";

enum Routes {
  Home = "/",
  SignUp = "/sign-up",
  Messenger = "/messenger",
}

const rootQuery = "#app";
const router = new Router(rootQuery);
router
  .use(Routes.Home, SigninPage)
  .use(Routes.SignUp, SignupPage)
  .use(Routes.Messenger, ChatPage);

function withRouting() {
  window.router = router;
  router.start();
}

export { withRouting, Routes, router };
