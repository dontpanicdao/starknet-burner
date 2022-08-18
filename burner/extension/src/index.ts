import { injectExtension } from "./components/extension";
import { injectButton } from "./components/button";
import { injectModal } from "./components/modal";
import { injectIFrame } from "./components/iframe";
import { registerWindow, exposeRequest } from "./lib/inpage/window";

export const keyManager = () => {
  registerWindow();
  injectExtension();
  injectIFrame();
  injectButton();
  injectModal();
  exposeRequest(true);
};
