import injectExtension from "./components/extension";
import { registerWindow, exposeRequest } from "./lib/inpage/window";

export const keyManager = () => {
  registerWindow();
  injectExtension();
  exposeRequest(true);
};
