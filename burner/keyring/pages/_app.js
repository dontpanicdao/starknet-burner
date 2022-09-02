import "styles/globals.css";
import { StateProvider } from "lib/ui/context.js";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
